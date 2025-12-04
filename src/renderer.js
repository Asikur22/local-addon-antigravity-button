import React from 'react';
import { TextButton } from '@getflywheel/local-components';

export default function (context) {
    const { hooks } = context;

    hooks.addContent('SiteInfo_Top_TopRight', (site) => (
        <TextButton onClick={() => {
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
        }}>
            Open in Antigravity
        </TextButton>
    ));
}