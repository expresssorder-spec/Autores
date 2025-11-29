import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Using process.cwd() is standard node behavior
  // We cast process to any to avoid TS errors if types for Node are missing in this context
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // This string replacement allows usage of process.env.API_KEY in client code
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    }
  };
});