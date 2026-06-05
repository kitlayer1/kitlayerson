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
