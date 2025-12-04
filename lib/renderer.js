"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const react_1 = __importDefault(require("react"));
const local_components_1 = require("@getflywheel/local-components");
function default_1(context) {
    const { hooks } = context;
    hooks.addContent('SiteInfo_Top_TopRight', (site) => (react_1.default.createElement(local_components_1.TextButton, { onClick: () => {
            const { spawn } = require('child_process');
            const url = site.path + '/app/public';
            let antigravityPath = '/Users/fictioneyes/.antigravity/antigravity/bin/antigravity';
            if (process.platform === 'win32') {
                antigravityPath = 'C:\Program Files\Antigravity\antigravity.exe';
            }
            try {
                const child = spawn(antigravityPath, [url], {
                    detached: true,
                    stdio: 'ignore'
                });
                child.unref();
            }
            catch (error) {
                console.error('Open failed:', error);
            }
        } }, "Open in Antigravity")));
}
//# sourceMappingURL=renderer.js.map