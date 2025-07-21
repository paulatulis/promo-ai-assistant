import {
    SAGE_API_URL,
    SAGE_AUTH,
    SAGE_API_VERSION,
} from './sageConfig';

export async function callSageApi(serviceId: number, data: Record<string, unknown>) {
    const payload = {
        serviceId,
        apiVer: SAGE_API_VERSION,
        auth: SAGE_AUTH,
        ...data,
    };

    const res = await fetch(SAGE_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });


    if (!res.ok) {
        const text = await res.text();
        throw new Error(`SAGE API HTTP error: ${res.status} - ${text}`);
    }

    const json = await res.json();

    // Only treat it as an error if it includes `ok: false`
    if ('ok' in json && !json.ok) {
        throw new Error(`SAGE API response error: ${json.errMsg || 'Unknown error'}`);
    }

    return json;
}
