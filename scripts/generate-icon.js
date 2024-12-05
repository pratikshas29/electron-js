const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 24, 32, 48, 64, 128, 256];

async function generateIcons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../assets/icon.svg'));
  
  // Generate PNG files for each size
  const pngBuffers = await Promise.all(
    sizes.map(async size => {
      const buffer = await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toBuffer();
      return buffer;
    })
  );

  // Write the ICO file
  const outputPath = path.join(__dirname, '../assets/logo.ico');
  
  // ICO header
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(sizes.length, 4); // Number of images

  // Calculate offsets and create directory entries
  let offset = 6 + (sizes.length * 16); // Header size + (number of images * directory entry size)
  const directoryEntries = [];
  const imageData = [];

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const png = pngBuffers[i];
    
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // Width
    entry.writeUInt8(size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(png.length, 8); // Image size
    entry.writeUInt32LE(offset, 12); // Image offset
    
    directoryEntries.push(entry);
    imageData.push(png);
    offset += png.length;
  }

  // Combine all buffers
  const ico = Buffer.concat([
    header,
    ...directoryEntries,
    ...imageData
  ]);

  fs.writeFileSync(outputPath, ico);
  console.log('Icon generated successfully!');
}

generateIcons().catch(console.error);
