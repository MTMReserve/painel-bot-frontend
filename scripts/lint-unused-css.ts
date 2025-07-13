// ===============================
// File: scripts/lint-unused-css.ts
// ===============================

import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const cssFiles = fg.sync(['src/**/*.css'], { cwd: PROJECT_ROOT, absolute: true });
const tsFiles = fg.sync(['src/**/*.{ts,tsx}'], { cwd: PROJECT_ROOT, absolute: true });

const usedCssFiles = new Set<string>();

for (const filePath of tsFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  for (const cssFile of cssFiles) {
    const relativeCss = path.relative(path.dirname(filePath), cssFile).replace(/\\/g, '/');
    if (content.includes(relativeCss) || content.includes(path.basename(cssFile))) {
      usedCssFiles.add(cssFile);
    }
  }
}

const unusedCssFiles = cssFiles.filter(file => !usedCssFiles.has(file));

console.log('\n🎯 Arquivos .css não utilizados encontrados:\n');
if (unusedCssFiles.length === 0) {
  console.log('✅ Nenhum arquivo CSS órfão detectado!\n');
} else {
  for (const file of unusedCssFiles) {
    console.log('❌ ' + path.relative(PROJECT_ROOT, file));
  }
  console.log(`\n💡 Total: ${unusedCssFiles.length} arquivos não utilizados.`);
  console.log('⚠️ Revise e exclua se for seguro.\n');
}
