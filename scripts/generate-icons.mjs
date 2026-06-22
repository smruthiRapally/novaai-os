/**
 * Generates PWA icons as PNG files using pure Node.js (no canvas dependency).
 * Creates minimal valid PNG files with the NOVA AI brand colors.
 * For production, replace with actual high-quality icon files.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../public/icons');
mkdirSync(iconsDir, { recursive: true });

// Minimal 1x1 purple PNG (placeholder — replace with real assets before launch)
// A real 1-pixel PNG with color #8B5CF6
function minimalPng(r, g, b) {
  const buf = Buffer.from([
    0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a, // PNG signature
    0x00,0x00,0x00,0x0d, // IHDR chunk length
    0x49,0x48,0x44,0x52, // "IHDR"
    0x00,0x00,0x00,0x01, // width: 1
    0x00,0x00,0x00,0x01, // height: 1
    0x08,0x02,           // bit depth: 8, color type: 2 (RGB)
    0x00,0x00,0x00,      // compression, filter, interlace
    0x90,0x77,0x53,0xde, // CRC (pre-computed for this IHDR)
    0x00,0x00,0x00,0x0c, // IDAT chunk length
    0x49,0x44,0x41,0x54, // "IDAT"
    0x08,0xd7,0x63,r,g,b,0x00,0x00,0x00,0x04,0x00,0x01, // compressed pixel
    0xe2,0x21,0xbc,0x33, // CRC
    0x00,0x00,0x00,0x00, // IEND chunk length
    0x49,0x45,0x4e,0x44, // "IEND"
    0xae,0x42,0x60,0x82  // CRC
  ]);
  return buf;
}

// Note: These are placeholder 1x1 PNGs so the build succeeds.
// Replace public/icons/*.png with real 192x192, 512x512, 180x180 icon files
// before deploying to production. Use a tool like https://realfavicongenerator.net
// with the SVG from public/icons/icon.svg

const purple = minimalPng(0x8B, 0x5C, 0xF6);
writeFileSync(join(iconsDir, 'icon-192.png'), purple);
writeFileSync(join(iconsDir, 'icon-512.png'), purple);
writeFileSync(join(iconsDir, 'apple-touch-icon.png'), purple);
writeFileSync(join(iconsDir, 'favicon.ico'), purple);

console.log('✓ Placeholder icons written to public/icons/');
console.log('  Replace with real assets using public/icons/icon.svg as the source.');
