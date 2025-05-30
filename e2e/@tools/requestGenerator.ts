import { writeFileSync } from 'fs';
import { resolve as r } from 'path';
import * as mkdirp from 'mkdirp';
import { RequestHook } from 'testcafe';
import { fromSaveScript, getResultsPath, scriptResultsPath, selectedDeviceBrowsers } from '../../scripts/save-testResults';
import { IDevices } from './screenshotBrowsers';
export class RequestGenerator extends RequestHook {
    constructor(
        t: TestController,
        endpoint: string | RegExp,
        logger: RequestLogger,
        requestFilterRules?: any[],
        responseEventConfigureOpts?: object
    ) {
        super(requestFilterRules, responseEventConfigureOpts);
        this.t = t;
        this.endpoint = endpoint;
        this.logger = logger;
        this.scriptArgs = process.argv;
        this.deviceIndex = 0;
    }
    t: TestController;
    endpoint: string | RegExp;
    logger: RequestLogger;
    scriptArgs: string[];
    deviceIndex: number;
    async onRequest(requestEvent: object) {}
    async onResponse(responseEvent: object) {
        // wait for results
        const results = this.logger.requests[0];
        if (!results) {
            return;
        }

        /*
            network data saved based on how testcafe is run:
            from saveTestResults script vs normal testcafe command
        */
        const saveFolder = this.getSaveFolder(fromSaveScript, selectedDeviceBrowsers);
        const filePath = (() => {
            const endpointName = (() => {
                const endpoint = results.request.url.split(/\/|\\/).filter(value => !!value);
                const isNumber = (input: any) => !isNaN(input);
                let fromEnd: number;
                isNumber(endpoint[endpoint.length - 1]) ? (fromEnd = -2) : (fromEnd = -1);
                return endpoint.slice(fromEnd).join('-');
            })();
            return r(saveFolder, `${endpointName}.json`);
        })();

        // log output to json file
        const responseStatusCode = results.response.statusCode;
        const requestHeaders = results.request.headers;
        const requestBody = results.request.body;
        const responseHeaders = results.response.headers;
        const responseBody = results.response.body;
        const output = `[
            {
                "responseStatusCode": ${responseStatusCode},
                "requestHeaders": ${JSON.stringify({ requestHeaders })},
                "requestBody": ${requestBody},
                "responseHeaders": ${JSON.stringify({ responseHeaders })},
                "responseBody": ${responseBody}
            }
        ]`;
        writeFileSync(filePath, output);
    }
    getSaveFolder(fromSaveScript: boolean, devices: IDevices) {
        const resultsPath = fromSaveScript ? scriptResultsPath : getResultsPath(this.scriptArgs[3]);

        // the test name - from external test fixture
        const testName: string = (this.t as any).testRun.test.name;

        const saveFolder = r(resultsPath, 'network_data', testName);

        // prepare for next device
        if (Object.keys(devices).length - 1 > this.deviceIndex) {
            this.deviceIndex++;
        }

        mkdirp.sync(saveFolder);

        return r(saveFolder);
    }
}
