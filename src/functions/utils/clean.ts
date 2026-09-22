export function cleanCodeBlock(text: string) {
  return text.replaceAll("`", "");
}

export function cleanLetter(text: string) {
  return text.replace(/[^\d,]/g, "");
}
