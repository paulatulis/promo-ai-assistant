

import { ProductDetail } from '@/app/types/product';
import { callSageApi } from './callSageApi';
import { SAGE_SERVICE_IDS } from './sageConfig';

export async function queryProductDetail(prodEId: number): Promise<ProductDetail> {
    const data = await callSageApi(SAGE_SERVICE_IDS.PRODUCT_DETAIL, {
        prodEId,
        includeSuppInfo: 1,
    });

    return data.product as ProductDetail
}
