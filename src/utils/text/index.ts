export function extractCommand(line: string): string {
  const separatorIndex = line.indexOf(" ");
  if (separatorIndex === -1) return line;

  return line.substring(0, separatorIndex);
}

export function extractArguments(line: string): string {
  const separatorIndex = line.indexOf(" ");
  if (separatorIndex === -1) return "";

  return line.substring(separatorIndex + 1);
}

export function wordWrap(text: string): string {
  //process.stdout.columns
  return text;
}
