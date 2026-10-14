import { execSync } from 'child_process';
import { rmSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧹 Cleaning cache and dist...');
try {
  rmSync(path.join(__dirname, 'node_modules', '.vite'), { recursive: true, force: true });
  rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });
} catch (error) {
  console.log('Cache already clean');
}

console.log('🏗️  Building for production...');
process.env.NODE_OPTIONS = '--max_old_space_size=4096';
execSync('npm run build', { stdio: 'inherit', encoding: 'utf-8' });

console.log('✅ Build completed successfully!');
console.log('📦 Upload the entire "dist" folder to your Hostinger public_html');
