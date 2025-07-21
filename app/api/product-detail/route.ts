import { NextRequest, NextResponse } from 'next/server';
import { queryProductDetail } from '@/lib/queryProductDetail';

export async function POST(req: NextRequest) {
    try {
        const { prodEId } = await req.json();

        if (!prodEId) {
            return NextResponse.json({ error: 'Missing Product Entity ID (prodEId)' }, { status: 400 });
        }

        const details = await queryProductDetail(prodEId);
        console.log('details', details)

        return NextResponse.json(details);
    } catch (error: unknown) {
        console.error('Product Detail Error:', error);
        let message = 'something went wrong'
        if (error instanceof Error) {
            message = error.message;
        } else if (typeof error === 'string') {
            message = error;
        }

        return NextResponse.json({ error: message }, { status: 500 });

    }
}
