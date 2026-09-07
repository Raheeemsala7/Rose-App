import { getCartProductsApi } from '@/src/features/cart/apis/cart.apis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (!ids) {
    return NextResponse.json([]);
  }

  const productIds = ids.split(',');
  const products = await getCartProductsApi(productIds);

  return NextResponse.json(products);
}
