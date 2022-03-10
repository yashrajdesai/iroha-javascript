import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { PORT_VITE, PORT_PEER_TELEMETRY, PORT_PEER_SERVER, PORT_PEER_API } from './etc/meta';

const resolveInPkgSrc = (unscopedName: string, ...paths: string[]) =>
    path.resolve(__dirname, '../../../../', unscopedName, ...paths);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        target: 'ESNEXT',
    },
    server: {
        port: PORT_VITE,
        strictPort: true,
        proxy: {
            '/torii/api': {
                ws: true,
                target: `http://127.0.0.1:${PORT_PEER_API}`,
                rewrite: (path) => path.replace(/^\/torii\/api/, ''),
            },
            '/torii/telemetry': {
                ws: true,
                target: `http://127.0.0.1:${PORT_PEER_TELEMETRY}`,
                rewrite: (path) => path.replace(/^\/torii\/telemetry/, ''),
            },
            '/peer-server': {
                ws: true,
                target: `http://127.0.0.1:${PORT_PEER_SERVER}`,
                rewrite: (path) => path.replace(/^\/peer-server/, ''),
            },
        },
    },
    preview: {
        port: PORT_VITE,
        strictPort: true,
    },
    resolve: {
        alias: {
            '@iroha2/client-isomorphic-ws': resolveInPkgSrc('client-isomorphic-ws', 'dist/native.js'),
            '@iroha2/client-isomorphic-fetch': resolveInPkgSrc('client-isomorphic-fetch', 'dist/native.js'),
            // tmp to fix pnpm link
            '@scale-codec/util': path.resolve('/Users/0x/dev/scale-codec-js-library/packages/util/src/lib.ts'),
            '@scale-codec/definition-runtime': path.resolve(
                '/Users/0x/dev/scale-codec-js-library/packages/definition-runtime/src/lib.ts',
            ),
        },
    },
});
