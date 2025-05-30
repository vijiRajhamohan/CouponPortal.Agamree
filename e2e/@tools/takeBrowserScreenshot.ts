/* eslint-disable no-console */
import { join } from 'path';
import { ClientFunction } from 'testcafe';
import { parse, Agent } from 'useragent';
import { trimStart, endsWith, padStart } from 'lodash';
import { waitForPageToLoad } from './waitForPageToLoad';

const getUA = ClientFunction(() => navigator.userAgent);

export class IncrementalScreenshotTaker {
    private _agent: Agent | null = null;
    private _count = 1;
    public constructor(private readonly t: TestController, private readonly root: string) {}

    public async takeScreenshot(name = 'auto') {
        if (!endsWith(name, '.png')) name += '.png';
        const p = join(await this.getRootPath(), `${padStart(this._count.toString(), 3, '0')}-${name}`);
        this._count += 1;
        await waitForPageToLoad(this.t);
        await this.t.takeScreenshot(p);
    }

    public async takeFullpageScreenshot(name = 'auto') {
        await waitForPageToLoad(this.t);

        const screenWidth = await this.t.eval(() => window.screen.availWidth);
        const screenHeight = await this.t.eval(() => window.screen.availHeight);

        // expand window height if needed
        const docHeight = await ClientFunction(() => {
            const body = window.document.body;
            const html = window.document.documentElement;
            return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        })();
        if (docHeight > screenHeight) {
            await this.t.resizeWindow(screenWidth, docHeight);
        }

        // take screenshot
        try {
            await this.takeScreenshot(name);
            console.log(`Screenshot: ${name}`)
        } catch(error) {
            console.log(error)
        }

        // restore window height to screen height if needed
        if (docHeight > screenHeight) {
            await this.t.resizeWindow(screenWidth, screenHeight);
        }
    }

    public async withScreenshot(...delegates: Array<(t: TestController) => Promise<any>>) {
        for (const delegate of delegates) {
            await delegate(this.t);
            await this.takeScreenshot();
        }
    }

    private async agent() {
        if (!this._agent) this._agent = parse(await getUA());
        return this._agent;
    }

    private async getRootPath() {
        const agent = await this.agent();
        return `/${agent.family} ${agent.device}/${trimStart(this.root, '/')}`;
    }
}
