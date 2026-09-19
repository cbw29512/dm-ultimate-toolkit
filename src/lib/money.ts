export const BMC_URL = "https://buymeacoffee.com/divclass016";
export const GITHUB_SPONSORS_URL = "https://github.com/sponsors/cbw29512";
export const IRON_PIT_REPO = "https://github.com/cbw29512/D20-ironpit";
export const IRON_PIT_LIVE = "https://ironpit.netlify.app";
export const CROSSING_LIVE = "https://concealedcarrycrossing.netlify.app";
export const PETS_LIVE = "https://yourpetshealthlog.netlify.app";
export const WELCOME_LIVE = "https://welcomehomepet.netlify.app";
export const WILSON_WORKS_REPO = "https://github.com/cbw29512/wilson-works";

export function amazonSearch(query: string, tag: string) {
  const params = new URLSearchParams({ k: query });
  if (tag.trim()) params.set("tag", tag.trim());
  return `https://www.amazon.com/s?${params.toString()}`;
}

export function koFiFightPdf() {
  return `${BMC_URL}?utm_source=wilson-works&utm_content=iron-pit-pdf`;
}

export function koFiTripReport() {
  return `${BMC_URL}?utm_source=wilson-works&utm_content=crossing-trip`;
}

export function koFiBinder() {
  return `${BMC_URL}?utm_source=wilson-works&utm_content=pet-binder`;
}
