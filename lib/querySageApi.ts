import { ProductDetail } from '@/app/types/product';
import { callSageApi } from './callSageApi';
import { SAGE_SERVICE_IDS } from './sageConfig';

export async function querySageApi(filters: {
  color?: string;
  category?: string;
  maxPrice: number;
  minQuantity: number;
  ecoFriendly?: boolean;
  sortBy: string;
  sortOrder?: string;
  limit?: number;
  itemNum?: string;
  itemNumExact?: boolean;
  itemName?: string;
  priceLow?: number;
  verified?: boolean;
  recyclable?: boolean;
  newProduct: boolean;
  unionShop?: boolean;
  esg?: string;
  popular?: boolean;
  fresh?: boolean;
  timely?: boolean;
  prodTime?: number;
  includeRush?: boolean;
  madeIn?: string;
  prefGroups?: string;
  suppId?: string;
  lineName?: string;
  siteCountry?: string;
  updatedSince?: Date;
  maxTotalItems?: number;
  spc?: string
  keywords?: string;
  themes?: string;

}) {
  const data = await callSageApi(SAGE_SERVICE_IDS.PRODUCT_SEARCH, {
    search: {
      categories: filters.category || '',
      keywords: filters.keywords || undefined,
      themes: filters.themes || undefined,
      spc: filters.spc|| undefined,
      itemNum: filters.itemNum || undefined,
      itemNumExact: filters.itemNumExact || undefined,
      itemName: filters.itemName || undefined,
      priceLow: filters.priceLow || undefined,
      verified: filters.verified || undefined,
      recyclable: filters.recyclable|| undefined,
      newProduct: filters.newProduct|| undefined,
      unionShop: filters.unionShop|| undefined,
      esg: filters.esg|| undefined,
      popular: filters.popular|| undefined,
      fresh: filters.fresh|| undefined,
      timely: filters.timely|| undefined,
      prodTime: filters.prodTime|| undefined,
      includeRush: filters.includeRush|| undefined,
      madeIn: filters.madeIn|| undefined,
      prefGroups: filters.prefGroups|| undefined,
      suppId: filters.suppId|| undefined,
      lineName: filters.lineName|| undefined,
      siteCountry: filters.siteCountry|| undefined,
      updatedSince: filters.updatedSince|| undefined,
      maxTotalItems: filters.maxTotalItems|| undefined,
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
  console.log('data')
  return data.products?.map((p: ProductDetail) => ({
    name: p.prName || 'Unnamed Product',
    description: p.description || 'No description provided',
    price: p.prc || 'N/A',
    image: p.pics?.[0] || null,
    sageCode: p.spc || null,
    prodEId: p.prodEId,
  })) || [];
}
