import React from 'react';
import { TextButton } from '@getflywheel/local-components';

export default function (context) {
    const { hooks } = context;

    hooks.addContent('SiteInfo_Top_TopRight', (site) => (
        <TextButton onClick={() => {
            try {
                if (!site) {
                    alert('Antigravity Addon Error: site object is undefined.');
                    return;
                }
                if (!site.path) {
                    alert('Antigravity Addon Error: site.path is undefined. Site object keys: ' + Object.keys(site).join(', '));
                    return;
                }

                const fs = require('fs');
                const { spawn } = require('child_process');
                const url = site.path + '/app/public';

                if (process.platform === 'darwin') {
                    const os = require('os');
                    const homeDir = os && typeof os.homedir === 'function' ? os.homedir() : '';
                    const paths = [
                        '/Applications/Antigravity IDE.app',
                        '/Applications/Antigravity.app',
                        homeDir ? `${homeDir}/Applications/Antigravity IDE.app` : '',
                        homeDir ? `${homeDir}/Applications/Antigravity.app` : ''
                    ].filter(Boolean);

                    let bundleId = 'com.google.antigravity-ide'; // default fallback
                    if (paths.length > 0 && !fs.existsSync(paths[0])) {
                        if (paths[1] && fs.existsSync(paths[1])) {
                            bundleId = 'com.google.antigravity';
                        } else if (paths[2] && fs.existsSync(paths[2])) {
                            bundleId = 'com.google.antigravity-ide';
                        } else if (paths[3] && fs.existsSync(paths[3])) {
                            bundleId = 'com.google.antigravity';
                        }
                    }

                    const child = spawn('open', ['-b', bundleId, url], {
                        detached: true,
                        stdio: 'ignore'
                    });
                    child.on('error', (err) => {
                        console.error('Failed to spawn open command:', err);
                        alert('Antigravity Addon: failed to spawn open command: ' + err.message);
                    });
                    child.unref();
                } else if (process.platform === 'win32') {
                    const path = require('path');
                    const localAppData = process.env ? process.env.LOCALAPPDATA : '';
                    const paths = [
                        'C:\\Program Files\\Antigravity\\antigravity.exe',
                        'C:\\Program Files (x86)\\Antigravity\\antigravity.exe',
                        localAppData ? path.join(localAppData, 'Programs', 'Antigravity', 'antigravity.exe') : ''
                    ].filter(Boolean);

                    let antigravityPath = paths[0];
                    for (const p of paths) {
                        if (fs.existsSync(p)) {
                            antigravityPath = p;
                            break;
                        }
                    }
                    const child = spawn(antigravityPath, [url], {
                        detached: true,
                        stdio: 'ignore'
                    });
                    child.on('error', (err) => {
                        console.error('Failed to spawn Antigravity binary:', err);
                        alert('Antigravity Addon: failed to spawn binary: ' + err.message);
                    });
                    child.unref();
                } else {
                    // Linux / other fallback
                    const child = spawn('antigravity', [url], {
                        detached: true,
                        stdio: 'ignore'
                    });
                    child.on('error', (err) => {
                        console.error('Failed to spawn Antigravity binary on Linux:', err);
                    });
                    child.unref();
                }
            } catch (error) {
                console.error('Antigravity Addon Catch:', error);
                alert('Antigravity Addon Catch: ' + error.message + '\n\nStack:\n' + error.stack);
            }
        }}>
            Open in Antigravity
        </TextButton>
    ));
}