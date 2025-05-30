# Purpose

Legal screenshot tests are written to generate pdf screenshots for legal review by the client.

## Setup

There are two parts to setting up screenshots:

1. **Customizing the package.json** script to append the correct pdf files (if any) to the end of the screenshots. To do this, look in
   `~/package.json` and find the script titled `generate:pdf`. At the end of the rightside value you will see a pdf filepath. This is the
   value you should modify to ensure the correct file is being used. You can also add additional pdf files by adding more file paths
   separated by a space.

2. **Structuring screenshot tests**

Each flow of the UI should be split into a separate test file, and use numeric naming so that they run in the correct order.

Within each test you will have to create a new instance of the screenshot taker class. Each screenshot taker instance requires a screenshot
location string to be passed as an argument. The first part of the file path should always be 'pdf'. The second should be the name of the
test so that screenshots save in the same order as the tests are being run. Ex for homepage:

```html
const taker = new IncrementalScreenshotTaker(t, '/pdf/01_patient-search')
```

## Command Line

Once the tests are written, use the command `npm run generate:pdf` to generate a pdf of the tests. By default the script will capture
screenshots using your local dev server. However, you can easily specify a different environment by adjusting your terminal command to use
one of the following environments: qa, uat, or prod (case insensitive). Here is an example of how to capture screenshots in uat:
`npm run generate:pdf uat`

## Folder Structure

The screenshots and pdfs will then be saved under ~/screenshots. Inside you will see a folder for each environment you have run screenshots
for, followed by timestamp folders which represent all the times you've run the script for that environment. Inside each timestamp folder
you will see a folder named images, which contains the individual screenshot images, followed by a pdfs folder containing the final pdf
output.
