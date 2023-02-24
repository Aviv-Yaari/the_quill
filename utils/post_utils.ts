/**
 * Returns reading time of a text (in minutes)
 */
function calcReadTime(text: string): number {
  const wordsPerMinute = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}

export { calcReadTime };