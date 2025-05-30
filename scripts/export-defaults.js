"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// import exportDefaults from '@stargate/settings/export-defaults';
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = require("path");
var lodash_1 = require("lodash");
var settings_1 = require("@stargate/settings");
var outputDirectory = process.env.TF_BUILD
    ? path_1.join(process.env.BUILD_ARTIFACTSTAGINGDIRECTORY, 'scripts')
    : path_1.join(__dirname, '..', 'artifacts/scripts');
function run() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var settingsPath, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return tslib_1.__generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    settingsPath = path_1.join(__dirname, '..', 'settings');
                    if (!fs_1.default.existsSync(outputDirectory)) {
                        fs_1.default.mkdirSync(outputDirectory);
                    }
                    _b = (_a = fs_1.default).writeFileSync;
                    _c = [path_1.join(outputDirectory, 'default-environment.ps1')];
                    return [4 /*yield*/, exportDefaults({ type: 'ps1', settingsPath: settingsPath })];
                case 1:
                    _b.apply(_a, _c.concat([_o.sent()]));
                    _e = (_d = fs_1.default).writeFileSync;
                    _f = [path_1.join(outputDirectory, 'ensure-environment.ps1')];
                    return [4 /*yield*/, exportEnsureDefaults({ type: 'ps1', settingsPath: settingsPath })];
                case 2:
                    _e.apply(_d, _f.concat([_o.sent()]));
                    _h = (_g = fs_1.default).writeFileSync;
                    _j = [path_1.join(outputDirectory, 'default-environment.env')];
                    return [4 /*yield*/, exportDefaults({ type: 'env', settingsPath: settingsPath })];
                case 3:
                    _h.apply(_g, _j.concat([_o.sent()]));
                    _l = (_k = fs_1.default).writeFileSync;
                    _m = [path_1.join(outputDirectory, 'default-environment.json')];
                    return [4 /*yield*/, exportDefaults({ type: 'json', settingsPath: settingsPath })];
                case 4:
                    _l.apply(_k, _m.concat([_o.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
run();
function exportDefaults(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var content, reference, reference_1, reference_1_1, item, _a, _b, _c, key, value, content, reference, reference_2, reference_2_1, item, _d, _e, _f, key, value, reference, data, reference_3, reference_3_1, item, _g, _h, _j, key, value;
        var e_1, _k, e_2, _l, e_3, _m, e_4, _o, e_5, _p, e_6, _q;
        return tslib_1.__generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    if (!(options.type === 'ps1')) return [3 /*break*/, 2];
                    content = [];
                    return [4 /*yield*/, settings_1.loadSettings(options.settingsPath, {})];
                case 1:
                    reference = (_r.sent()).reference;
                    try {
                        for (reference_1 = tslib_1.__values(reference), reference_1_1 = reference_1.next(); !reference_1_1.done; reference_1_1 = reference_1.next()) {
                            item = reference_1_1.value;
                            if (item.type !== 'env')
                                continue;
                            try {
                                for (_a = (e_2 = void 0, tslib_1.__values(Object.entries(item.default))), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    _c = tslib_1.__read(_b.value, 2), key = _c[0], value = _c[1];
                                    // eslint-disable-next-line no-console
                                    content.push("if (-not (Test-Path env:" + key + ")) {\n    Write-Host '##vso[task.setvariable variable=" + key + "]" + lodash_1.trim(JSON.stringify(value), '"') + "';\n    Write-Host \"##vso[task.logissue type=warning]No value has been defined for '" + key + "' using default value " + lodash_1.trim(JSON.stringify(value), '"') + "\"\n}");
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_l = _a.return)) _l.call(_a);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (reference_1_1 && !reference_1_1.done && (_k = reference_1.return)) _k.call(reference_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [2 /*return*/, content.join('\n')];
                case 2:
                    if (!(options.type === 'env')) return [3 /*break*/, 4];
                    content = [];
                    return [4 /*yield*/, settings_1.loadSettings(options.settingsPath, {})];
                case 3:
                    reference = (_r.sent()).reference;
                    try {
                        for (reference_2 = tslib_1.__values(reference), reference_2_1 = reference_2.next(); !reference_2_1.done; reference_2_1 = reference_2.next()) {
                            item = reference_2_1.value;
                            if (item.type !== 'env')
                                continue;
                            try {
                                for (_d = (e_4 = void 0, tslib_1.__values(Object.entries(item.default))), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    _f = tslib_1.__read(_e.value, 2), key = _f[0], value = _f[1];
                                    // eslint-disable-next-line no-console
                                    content.push(key + "=" + lodash_1.trim(JSON.stringify(value), '"'));
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_o = _d.return)) _o.call(_d);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (reference_2_1 && !reference_2_1.done && (_m = reference_2.return)) _m.call(reference_2);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    return [2 /*return*/, content.join('\n')];
                case 4:
                    if (!(options.type === 'json')) return [3 /*break*/, 6];
                    return [4 /*yield*/, settings_1.loadSettings(options.settingsPath, {})];
                case 5:
                    reference = (_r.sent()).reference;
                    data = {};
                    try {
                        for (reference_3 = tslib_1.__values(reference), reference_3_1 = reference_3.next(); !reference_3_1.done; reference_3_1 = reference_3.next()) {
                            item = reference_3_1.value;
                            if (item.type !== 'env')
                                continue;
                            try {
                                for (_g = (e_6 = void 0, tslib_1.__values(Object.entries(item.default))), _h = _g.next(); !_h.done; _h = _g.next()) {
                                    _j = tslib_1.__read(_h.value, 2), key = _j[0], value = _j[1];
                                    data[key] = lodash_1.trim(JSON.stringify(value), '"');
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (_h && !_h.done && (_q = _g.return)) _q.call(_g);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (reference_3_1 && !reference_3_1.done && (_p = reference_3.return)) _p.call(reference_3);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    return [2 /*return*/, JSON.stringify(data)];
                case 6: throw new Error("Give type " + options.type + " is not supported");
            }
        });
    });
}
function exportEnsureDefaults(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var content, reference, reference_4, reference_4_1, item, _a, _b, _c, key, value;
        var e_7, _d, e_8, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!(options.type === 'ps1')) return [3 /*break*/, 2];
                    content = ["$hasError = $false;"];
                    return [4 /*yield*/, settings_1.loadSettings(options.settingsPath, {})];
                case 1:
                    reference = (_f.sent()).reference;
                    try {
                        for (reference_4 = tslib_1.__values(reference), reference_4_1 = reference_4.next(); !reference_4_1.done; reference_4_1 = reference_4.next()) {
                            item = reference_4_1.value;
                            if (item.type !== 'env')
                                continue;
                            try {
                                for (_a = (e_8 = void 0, tslib_1.__values(Object.entries(item.default))), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    _c = tslib_1.__read(_b.value, 2), key = _c[0], value = _c[1];
                                    // eslint-disable-next-line no-console
                                    content.push("if (-not (Test-Path env:" + key + ")) {\n    Write-Host '##vso[task.setvariable variable=" + key + "]" + lodash_1.trim(JSON.stringify(value), '"') + "';\n    Write-Host \"##vso[task.logissue type=error]No value has been defined for '" + key + "'\"\n    $hasError = $true;\n}");
                                }
                            }
                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                                }
                                finally { if (e_8) throw e_8.error; }
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (reference_4_1 && !reference_4_1.done && (_d = reference_4.return)) _d.call(reference_4);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    content.push("if ($hasError) { exit 1 }");
                    return [2 /*return*/, content.join('\n')];
                case 2: throw new Error("Give type " + options.type + " is not supported");
            }
        });
    });
}
//# sourceMappingURL=export-defaults.js.map