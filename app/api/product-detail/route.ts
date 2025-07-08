import { NextRequest, NextResponse } from 'next/server';
import { queryProductDetail } from '@/lib/queryProductDetail';

export async function POST(req: NextRequest) {
    try {
        const { prodEId } = await req.json();

        if (!prodEId) {
            return NextResponse.json({ error: 'Missing Product Entity ID (prodEId)' }, { status: 400 });
        }

        const details = await queryProductDetail(prodEId);

        return NextResponse.json(details);
    } catch (error: any) {
        console.error('Product Detail Error:', error);
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
