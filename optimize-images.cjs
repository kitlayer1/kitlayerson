const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeImages() {
  console.log('🔄 Starting image optimization...\n');

  // ─── 1. homeSection.webp → responsive WebP sizes ───────────────────────────
  const bannerSrc = 'src/media/images/home/section/homeSection.webp';
  const bannerDir = path.dirname(bannerSrc);

  const bannerSizes = [
    { width: 1200, suffix: '1200w', quality: 78 },
    { width: 768,  suffix: '768w',  quality: 75 },
    { width: 480,  suffix: '480w',  quality: 72 },
  ];

  for (const { width, suffix, quality } of bannerSizes) {
    const outPath = path.join(bannerDir, `homeSection-${suffix}.webp`);
    await sharp(bannerSrc)
      .resize(width)
      .webp({ quality })
      .toFile(outPath);
    const { size } = fs.statSync(outPath);
    console.log(`✅ homeSection-${suffix}.webp → ${(size / 1024).toFixed(1)} KiB`);
  }

  // Also create a better-compressed single version to replace the original
  const optimizedSingle = path.join(bannerDir, 'homeSection-opt.webp');
  await sharp(bannerSrc)
    .resize(1693) // keep original size but re-compress
    .webp({ quality: 75, effort: 6 })
    .toFile(optimizedSingle);
  const origSize = fs.statSync(bannerSrc).size;
  const optSize  = fs.statSync(optimizedSingle).size;
  console.log(`✅ homeSection-opt.webp → ${(optSize / 1024).toFixed(1)} KiB (was ${(origSize / 1024).toFixed(1)} KiB)`);

  // ─── 2. PNG logos → WebP ────────────────────────────────────────────────────
  const logoDir = 'public/images/home/logoType';
  const pngFiles = fs.readdirSync(logoDir).filter(f => f.endsWith('.png'));

  for (const png of pngFiles) {
    const srcPath = path.join(logoDir, png);
    const outName = png.replace('.png', '.webp');
    const outPath = path.join(logoDir, outName);
    await sharp(srcPath)
      .webp({ quality: 85, lossless: false })
      .toFile(outPath);
    const { size: srcSz } = fs.statSync(srcPath);
    const { size: outSz } = fs.statSync(outPath);
    console.log(`✅ ${png} (${(srcSz / 1024).toFixed(1)} KiB) → ${outName} (${(outSz / 1024).toFixed(1)} KiB)`);
  }

  console.log('\n🎉 Image optimization complete!');
}

optimizeImages().catch(console.error);
