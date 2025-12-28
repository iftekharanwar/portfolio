#!/usr/bin/env node

/**
  Image Optimization Script
  Converts PNG images to WebP format with optimal quality
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

async function optimizeImages() {
  console.log(`${colors.cyan}🖼️  Starting image optimization...${colors.reset}\n`);

  const imagesDir = './public/images';

  // List of image paths to optimize
  const imagePaths = [
    'hero/profile-portrait.png',
    'about/profile-portrait.png',
    'about/workspace.png',
    'projects/project-01-main.png',
    'projects/project-01-gallery-1.png',
    'projects/project-01-gallery-2.png',
    'projects/project-01-gallery-3.png',
    'projects/project-01-gallery-5.png',
    'projects/project-02-main.png',
  ];

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let successCount = 0;
  let skipCount = 0;

  for (const imagePath of imagePaths) {
    const inputPath = path.join(imagesDir, imagePath);
    const outputPath = inputPath.replace('.png', '.webp');

    if (!fs.existsSync(inputPath)) {
      console.log(`${colors.yellow}⏭️  Skipped: ${imagePath} (file not found)${colors.reset}`);
      skipCount++;
      continue;
    }

    try {
      // Optimize and convert to WebP
      await sharp(inputPath)
        .webp({
          quality: 85,
          effort: 6,
          lossless: false
        })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

      totalOriginalSize += originalSize;
      totalOptimizedSize += optimizedSize;
      successCount++;

      console.log(
        `${colors.green}✓${colors.reset} ${imagePath}\n` +
        `  ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB ` +
        `${colors.green}(${savings}% smaller)${colors.reset}\n`
      );
    } catch (err) {
      console.log(`${colors.red}✗ Error processing ${imagePath}:${colors.reset}`, err.message);
    }
  }

  const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}✓ Optimization Complete!${colors.reset}\n`);
  console.log(`📊 Summary:`);
  console.log(`  • Optimized: ${colors.green}${successCount}${colors.reset} images`);
  if (skipCount > 0) {
    console.log(`  • Skipped: ${colors.yellow}${skipCount}${colors.reset} images`);
  }
  console.log(`  • Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`  • Optimized Size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`  • Total Savings: ${colors.green}${totalSavings}%${colors.reset} (${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)}MB)\n`);
  console.log(`${colors.yellow}📝 Next Steps:${colors.reset}`);
  console.log(`  1. Update image imports in your components from .png to .webp`);
  console.log(`  2. Test the website to ensure all images load correctly`);
  console.log(`  3. Delete the original .png files to save disk space\n`);
}

optimizeImages().catch(err => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, err);
  process.exit(1);
});
