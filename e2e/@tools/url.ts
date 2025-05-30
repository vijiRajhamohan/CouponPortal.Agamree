import { trimStart } from 'lodash';
import { getLocalPort } from '../../../scripts/localhost/server-port';
import env from '../../envConfig';

export function testUrl(url: string) {
    return `${process.env.SERVER_URL || (env && env.SERVER_URL) || `http://localhost:${getLocalPort()}`}/${trimStart(url, '/')}`;
}
