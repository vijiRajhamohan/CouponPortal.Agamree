import { RequestLogger } from 'testcafe';

export function requestLogger(
    endpoint: string | RegExp,
    logRequestHeaders = true,
    logRequestBody = true,
    logResponseHeaders = true,
    logResponseBody = true,
    stringifyRequestBody = true,
    stringifyResponseBody = true
) {
    return RequestLogger(
        { url: endpoint, method: 'post' },
        {
            logRequestHeaders,
            logRequestBody,
            logResponseHeaders,
            logResponseBody,
            stringifyRequestBody,
            stringifyResponseBody,
        }
    );
}
