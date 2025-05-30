"use strict";
/*
    Specify device/browser combinations for generating screenshot pdfs
    Testcafe supported browsers: https://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/browsers/browser-support.html
    command: npm run generate:pdf ./path/to/testFile [./path/to/pdfToMerge1 ... ./path/to/pdfToMergeN]
    generates a timestamped folder of artifacts under /screenshots
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.devices = {
    // '01_xs-mobile': [
    //     {
    //         name: 'chrome',
    //         command: 'chrome:headless:emulation:width=375;height=812;mobile=true;orientation=vertical;touch=true',
    //     },
    // ],
    // '02_sm-tablet': [
    //     {
    //         name: 'chrome',
    //         command: 'chrome:headless:emulation:width=768;height=1024;mobile=true;orientation=vertical;touch=true',
    //     },
    // ],
    // '03_md-tablet': [
    //     {
    //         name: 'chrome',
    //         command: 'chrome:headless:emulation:width=1024;height=1366;mobile=true;orientation=vertical;touch=true',
    //     },
    // ],
    // '04_lg-desktop': [
    //     {
    //         name: 'chrome',
    //         command: 'chrome:headless --window-size=1366,768',
    //     },
    // ],
    '05_xl-desktop': [
        {
            name: 'chrome',
            command: 'chrome:headless --window-size=1920,1080',
        },
    ],
};
//# sourceMappingURL=screenshotBrowsers.js.map