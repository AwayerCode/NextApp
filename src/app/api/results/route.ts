import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function GET() {
    try {
        return NextResponse.json({
            items: storage.getResults()
        });
    } catch (error) {
        return NextResponse.json(
            { error: '获取结果失败' },
            { status: 500 }
        );
    }
} 