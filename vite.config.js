import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/flip7/', // your repo name here
  plugins: [react()],
});
