/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react()
    // PWA 일시적으로 비활성화 - Firebase 로딩 문제 해결 후 다시 활성화
  ],
  esbuild: {
    // TypeScript 타입 체크 비활성화 (빠른 빌드를 위해)
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  server: {
    host: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@core': resolve(__dirname, 'src/core'),
      '@domains': resolve(__dirname, 'src/domains'),
      '@shared': resolve(__dirname, 'src/shared'),
      '@app': resolve(__dirname, 'src/app'),
      '@ui': resolve(__dirname, 'src/shared/components/ui'),
      '@components': resolve(__dirname, 'src/components'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  build: {
    rollupOptions: {
      output: {
        // 더 안정적인 파일명 해싱 (타임스탬프 기반)
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        // 청크 크기 최적화
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    },
    // 청크 크기 경고 임계값 증가
    chunkSizeWarningLimit: 1000,
    // 소스맵 생성 (디버깅용)
    sourcemap: true
  },
  // 캐시 무효화를 위한 환경 변수 설정
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIMESTAMP__: JSON.stringify(Date.now())
  }
});