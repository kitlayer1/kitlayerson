export const getLogoIndices = (index: number, brandName: string) => {
  let seed = 0;
  for (let i = 0; i < brandName.length; i++) {
    seed += brandName.charCodeAt(i);
  }
  
  const hash1 = Math.floor(Math.abs(Math.sin(index + 1 + seed) * 10000));
  const hash2 = Math.floor(Math.abs(Math.cos(index + 2 + seed) * 10000));
  const hash3 = Math.floor(Math.abs(Math.sin(index + 3 + seed) * 10000));
  const hash4 = Math.floor(Math.abs(Math.cos(index + 4 + seed) * 10000));

  return {
    fIndexHash: hash1,
    fontIndexHash: hash2,
    cIndexHash: hash3,
    pIndexHash: hash4,
  };
};

export const adjustSvgLayout = (svg: string): string => {
  if (!svg) return "";
  let adjusted = svg.trim();

  // Check if it has the old width/height of 200 and y of 75
  const hasOldIcon = adjusted.includes('width="200"') && (adjusted.includes('y="75"') || adjusted.includes("y='75'"));
  if (hasOldIcon) {
    adjusted = adjusted
      .replace(/x=(["'])100\1/gi, 'x=$1112$1')
      .replace(/y=(["'])75\1/gi, 'y=$182$1')
      .replace(/width=(["'])200\1/gi, 'width=$1176$1')
      .replace(/height=(["'])200\1/gi, 'height=$1176$1');

    // Adjust text elements: y="305" to y="290" and font-size="48" to font-size="52"
    adjusted = adjusted
      .replace(/y=(["'])305\1/g, 'y=$1290$1')
      .replace(/font-size=(["'])48\1/g, 'font-size=$152$1');

    // Adjust path translations: translate(x y) -> translate(new_x new_y) scale(1.08)
    adjusted = adjusted.replace(/transform=(["'])translate\(([\d.-]+)\s+([\d.-]+)\)\1/g, (match, quote, xStr, yStr) => {
      const xVal = parseFloat(xStr);
      const yVal = parseFloat(yStr);
      const newX = 1.08 * xVal - 16;
      const newY = 1.08 * yVal - 45.2;
      return `transform=${quote}translate(${newX.toFixed(2)} ${newY.toFixed(2)}) scale(1.08)${quote}`;
    });
  }

  return adjusted;
};

