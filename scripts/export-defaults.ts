// import exportDefaults from '@stargate/settings/export-defaults';
import fs from 'fs';
import { join } from 'path';

import { trim } from 'lodash';
import { loadSettings } from '@stargate/settings';

const outputDirectory = process.env.TF_BUILD
    ? join(process.env.BUILD_ARTIFACTSTAGINGDIRECTORY!, 'scripts')
    : join(__dirname, '..', 'artifacts/scripts');

async function run() {
    const settingsPath = join(__dirname, '..', 'settings');
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
    }
    fs.writeFileSync(join(outputDirectory, 'default-environment.ps1'), await exportDefaults({ type: 'ps1', settingsPath }));
    fs.writeFileSync(join(outputDirectory, 'ensure-environment.ps1'), await exportEnsureDefaults({ type: 'ps1', settingsPath }));
    fs.writeFileSync(join(outputDirectory, 'default-environment.env'), await exportDefaults({ type: 'env', settingsPath }));
    fs.writeFileSync(join(outputDirectory, 'default-environment.json'), await exportDefaults({ type: 'json', settingsPath }));
}
run();

async function exportDefaults(options: { type: 'ps1' | 'env' | 'json'; settingsPath: string }) {
    if (options.type === 'ps1') {
        const content = [];
        const { reference } = await loadSettings(options.settingsPath, {});
        for (const item of reference) {
            if (item.type !== 'env') continue;
            for (const [key, value] of Object.entries(item.default)) {
                // eslint-disable-next-line no-console
                content.push(
                    `if (-not (Test-Path env:${key})) {
    Write-Host '##vso[task.setvariable variable=${key}]${trim(JSON.stringify(value), '"')}';
    Write-Host "##vso[task.logissue type=warning]No value has been defined for '${key}' using default value ${trim(
                        JSON.stringify(value),
                        '"'
                    )}"
}`
                );
            }
        }
        return content.join('\n');
    }
    if (options.type === 'env') {
        const content = [];
        const { reference } = await loadSettings(options.settingsPath, {});
        for (const item of reference) {
            if (item.type !== 'env') continue;
            for (const [key, value] of Object.entries(item.default)) {
                // eslint-disable-next-line no-console
                content.push(`${key}=${trim(JSON.stringify(value), '"')}`);
            }
        }
        return content.join('\n');
    }
    if (options.type === 'json') {
        const { reference } = await loadSettings(options.settingsPath, {});
        const data: any = {};
        for (const item of reference) {
            if (item.type !== 'env') continue;
            for (const [key, value] of Object.entries(item.default)) {
                data[key] = trim(JSON.stringify(value), '"');
            }
        }
        return JSON.stringify(data);
    }
    throw new Error(`Give type ${options.type} is not supported`);
}

async function exportEnsureDefaults(options: { type: 'ps1'; settingsPath: string }) {
    if (options.type === 'ps1') {
        const content = [`$hasError = $false;`];
        const { reference } = await loadSettings(options.settingsPath, {});
        for (const item of reference) {
            if (item.type !== 'env') continue;
            for (const [key, value] of Object.entries(item.default)) {
                // eslint-disable-next-line no-console
                content.push(
                    `if (-not (Test-Path env:${key})) {
    Write-Host '##vso[task.setvariable variable=${key}]${trim(JSON.stringify(value), '"')}';
    Write-Host "##vso[task.logissue type=error]No value has been defined for '${key}'"
    $hasError = $true;
}`
                );
            }
        }
        content.push(`if ($hasError) { exit 1 }`);
        return content.join('\n');
    }
    throw new Error(`Give type ${options.type} is not supported`);
}
