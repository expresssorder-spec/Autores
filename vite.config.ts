import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Explicitly replace process.env.API_KEY with the value
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Safe fallback for other process.env usages to prevent "process is not defined"
      'process.env': {} 
    }
  };
});