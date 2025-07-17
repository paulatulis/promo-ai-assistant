import { callSageApi } from './callSageApi';
import { SAGE_SERVICE_IDS } from './sageConfig';

export async function querySageApi(filters: {
  color?: string;
  category?: string;
  maxPrice: number;
  minQuantity: number;
  ecoFriendly?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sortBy: any;
  sortOrder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  limit?: any;
}) {
  const data = await callSageApi(SAGE_SERVICE_IDS.PRODUCT_SEARCH, {
    search: {
      categories: filters.category || '',
      colors: filters.color || '',
      priceHigh: filters.maxPrice || 100,
      qty: filters.minQuantity || 1,
      envFriendly: filters.ecoFriendly ?? false,
      extraReturnFields: 'DESCRIPTION,CATEGORY,ITEMNUM,PRC,THUMBPIC,PRODEID',
      maxRecs: filters.limit ?? 10,
      sort: filters.sortBy === 'price' ? 'PRC' : undefined,
      sortOrder: filters.sortOrder === 'asc' ? 'A' : filters.sortOrder === 'desc' ? 'D' : undefined

    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.products?.map((p: any) => ({
    name: p.name || 'Unnamed Product',
    description: p.description || 'No description provided',
    price: p.prc || 'N/A',
    image: p.thumbPic || null,
    sageCode: p.spc || null,
    prodEId: p.prodEId,
  })) || [];
}
