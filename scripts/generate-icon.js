const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../assets/icon.svg'));
  
  // Generate a single 256x256 PNG
  const pngBuffer = await sharp(svgBuffer)
    .resize(256, 256)
    .png()
    .toBuffer();

  // Write the ICO file
  const outputPath = path.join(__dirname, '../assets/logo.ico');
  
  // ICO header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);  // Reserved
  header.writeUInt16LE(1, 2);  // ICO type
  header.writeUInt16LE(1, 4);  // Number of images

  // Directory entry (16 bytes)
  const entry = Buffer.alloc(16);
  entry.writeUInt8(0, 0);      // Width (0 means 256)
  entry.writeUInt8(0, 1);      // Height (0 means 256)
  entry.writeUInt8(0, 2);      // Color palette
  entry.writeUInt8(0, 3);      // Reserved
  entry.writeUInt16LE(1, 4);   // Color planes
  entry.writeUInt16LE(32, 6);  // Bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8);  // Image size
  entry.writeUInt32LE(22, 12); // Image offset (6 + 16 = 22)

  // Combine all buffers
  const ico = Buffer.concat([
    header,
    entry,
    pngBuffer
  ]);

  fs.writeFileSync(outputPath, ico);
  console.log('Icon generated successfully!');
}

generateIcons().catch(console.error);
