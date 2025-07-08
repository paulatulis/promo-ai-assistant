

import { callSageApi } from './callSageApi';
import { SAGE_SERVICE_IDS } from './sageConfig';

export async function queryProductDetail(prodEId: number) {
    const data = await callSageApi(SAGE_SERVICE_IDS.PRODUCT_DETAIL, {
        prodEId,
        includeSuppInfo: 1,
    });

    const product = data.product;

    return {
        name: product.prName,
        description: product.description,
        imprint: product.imprintArea || product.imprintLoc,
        colors: product.colors,
        themes: product.themes,
        productionTime: product.prodTime,
        image: product.pics?.[0]?.url || null,
        supplier: product.supplier?.coName || null,
    };
}
