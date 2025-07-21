import { ProductDetail } from '@/app/types/product';
import { queryProductDetail } from '@/lib/queryProductDetail';
import { querySageApi } from '@/lib/querySageApi';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { ChatCompletionTool } from 'openai/resources/chat/completions';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
    try {
        const { description } = await req.json();

        // Define the MCP function schema

        const tools: ChatCompletionTool[] = [
            {
                type: 'function',
                function: {
                    name: 'searchProducts',
                    description: 'Search for promotional products based on detailed criteria',
                    parameters: {
                        type: 'object',
                        properties: {
                            color: { type: 'string' },
                            category: { type: 'string' },
                            maxPrice: { type: 'number' },
                            minQuantity: { type: 'number' },
                            ecoFriendly: { type: 'boolean' },
                            sortBy: {
                                type: 'string',
                                enum: ['price', 'relevance'], // if SAGE accepts more, add here
                            },
                            sortOrder: {
                                type: 'string',
                                enum: ['asc', 'desc'],
                            },
                            limit: { type: 'number' },
                            itemNum: { type: 'string' },
                            itemNumExact: { type: 'boolean' },
                            itemName: { type: 'string' },
                            priceLow: { type: 'number' },
                            verified: { type: 'boolean' },
                            recyclable: { type: 'boolean' },
                            newProduct: { type: 'boolean' },
                            unionShop: { type: 'boolean' },
                            esg: { type: 'string' },
                            popular: { type: 'boolean' },
                            fresh: { type: 'boolean' },
                            timely: { type: 'boolean' },
                            prodTime: { type: 'number' },
                            includeRush: { type: 'boolean' },
                            madeIn: { type: 'string' },
                            prefGroups: { type: 'string' },
                            suppId: { type: 'string' },
                            lineName: { type: 'string' },
                            siteCountry: { type: 'string' },
                            updatedSince: { type: 'string', format: 'date-time' },
                            maxTotalItems: { type: 'number' },
                            spc: { type: 'string' },
                            keywords: { type: 'string' },
                            themes: { type: 'string' },
                        },
                        required: [],
                    },
                },
            },
        ];




        // Ask GPT to extract filters
        const chatRes = await openai.chat.completions.create({
            model: 'gpt-4o',
            tool_choice: { type: 'function', function: { name: 'searchProducts' } },
            tools,
            messages: [
                {
                    role: 'system',
                    content: 'You are an assistant helping a promotional product company interpret customer needs.',
                },
                {
                    role: 'user',
                    content: description,
                },
            ],
        });

        const toolCall = chatRes.choices[0].message.tool_calls?.[0];
        const filters = toolCall ? JSON.parse(toolCall.function.arguments) : {};

        const basicResults = await querySageApi(filters);
        const enrichedResults = await Promise.all(
            basicResults.map(async (product: ProductDetail) => {
                const detail = await queryProductDetail(product.prodEId);
                return detail || product; // fallback to 103 data if 105 fails
            })
        );

        return NextResponse.json({ filters, enrichedResults });
    } catch (error: unknown) {
        console.error('API error:', error);

        let message = 'Something went wrong';

        if (error instanceof Error) {
            message = error.message;
        } else if (typeof error === 'string') {
            message = error;
        }

        return NextResponse.json({ error: message }, { status: 500 });
    }

}
