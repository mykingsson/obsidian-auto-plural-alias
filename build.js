const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['main.ts'],
    bundle: true,
    external: ['obsidian'],
    format: 'cjs',
    outfile: 'main.js',
    platform: 'node',
}).catch(() => process.exit(1));