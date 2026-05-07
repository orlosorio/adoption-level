import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const here = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(here, '..', 'public', 'email-hero.svg');
const pngPath = path.join(here, '..', 'public', 'email-hero.png');

const svg = readFileSync(svgPath, 'utf8');
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1120 },
  background: 'transparent',
});
writeFileSync(pngPath, resvg.render().asPng());
console.log(`Wrote ${pngPath}`);
