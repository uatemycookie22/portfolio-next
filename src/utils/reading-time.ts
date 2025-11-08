/**
 * Calculate estimated reading time for content
 * @param content - The text content (markdown or plain text)
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  // Remove markdown syntax for more accurate word count
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Replace links with just the text
    .replace(/[#*_~`]/g, '') // Remove markdown symbols
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  // Count words
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate reading time and round up
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  // Minimum 1 minute
  return Math.max(1, minutes);
}