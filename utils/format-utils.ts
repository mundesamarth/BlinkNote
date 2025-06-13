export function formatFileNameAsTitle(fileName: string): string {
  // Remove file extension (.pdf, .docx, etc.)
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");

  // Replace dashes/underscores with spaces and handle camelCase
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, " ")           // Replace - and _ with space
    .replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space before capital letters in camelCase

  // Capitalize each word
  return withSpaces
    .split(" ")
    .filter(Boolean) // Remove empty strings
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
}
