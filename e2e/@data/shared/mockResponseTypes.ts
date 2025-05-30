import { RequestMock } from 'testcafe';

interface IResponse {
    body: object;
    statusCode?: number;
}

const MockResponse = (endpoint: string | object, response: IResponse) => {
    if (typeof endpoint === 'object' && !(endpoint instanceof RegExp)) {
        throw new TypeError('endpoint must be a string or Regex');
    }
    return RequestMock()
        .onRequestTo(endpoint)
        .respond(response.body, response.statusCode, { 'Access-Control-Allow-Origin': '*' });
};

export function SuccessResponse(endpoint: string | object, responseBody: object) {
    const response = { body: responseBody, statusCode: 200 };
    return MockResponse(endpoint, response);
}

export function ErrorResponse(endpoint: string | object, responseBody: object) {
    const response = { body: responseBody, statusCode: 400 };
    return MockResponse(endpoint, response);
}
