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
                    description: 'Search for promotional products based on criteria',
                    parameters: {
                        type: 'object',
                        properties: {
                            color: { type: 'string' },
                            maxPrice: { type: 'number' },
                            minQuantity: { type: 'number' },
                            category: { type: 'string' },
                            ecoFriendly: { type: 'boolean' },
                            limit: {
                                type: 'number',
                                description: 'Maximum number of products to return (default 10)',
                            },
                            sortBy: {
                                type: 'string',
                                enum: ['price', 'relevance'],
                                description: 'How to sort results',
                            },
                            sortOrder: {
                                type: 'string',
                                enum: ['asc', 'desc'],
                                description: 'Sort direction (e.g., cheapest = asc)',
                            },
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

        // Now query SAGE using the extracted filters
        const products = await querySageApi(filters);

        return NextResponse.json({ filters, products });
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
