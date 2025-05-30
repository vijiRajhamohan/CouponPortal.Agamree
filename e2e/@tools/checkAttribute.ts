/* eslint-disable no-console */
import { t, ClientFunction } from 'testcafe';
import { ISelectors } from '../@types/selectors';
import { waitForPageToLoad } from './waitForPageToLoad';

export async function checkAttribute(selectors: ISelectors, attributeName: string, attributeValues: { [key: string]: string }) {
    await waitForPageToLoad(t);
    console.log(`\nCheck Attribute - ${attributeName}`);
    // get the URL
    const getUrl = ClientFunction(() => window.location.href);
    const url = new URL(await getUrl());
    for (const [selectorName, selectorObj] of Object.entries(selectors)) {
        const isLocalEnvironment = url.hostname.includes('localhost'); // check if you're in a local environment
        const usesInternalUrl = attributeValues[selectorName].substring(0, 1).includes('/'); // check if the attribute in question is an internal URL

        const attributes = await selectorObj.selector.attributes;

        if (!isLocalEnvironment && usesInternalUrl) {
            const portalName = url.pathname
                .split('/')
                .slice(0, 2)
                .join('/');
            const urlPath = portalName + attributeValues[selectorName]; // concat the portal name with the old URL
            await t.expect(attributes[attributeName]).eql(urlPath, `expected ${attributes[attributeName]} to equal ${urlPath}`);
        } else {
            await t
                .expect(attributes[attributeName])
                .eql(attributeValues[selectorName], `expected ${attributes[attributeName]} to equal ${attributeValues[selectorName]}`);
        }
        await t.expect(selectorObj.selector.visible).ok(`${selectorName}: not visible`);
        console.log(`${selectorName}: passed`);
    }
}
