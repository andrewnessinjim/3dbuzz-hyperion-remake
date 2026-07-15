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
  const lines = text.split("\n");
  const width = process.stdout.columns;
  const wrappedLines = [];

  for (let line of lines) {
    if (line.length <= width) {
      wrappedLines.push(line);
    } else {
      let currentLine = "";
      let words = line.split(/\s+/);
      for (let word of words) {
        if (currentLine.length === 0) {
          currentLine = word;
        } else if (currentLine.length + word.length + 1 > width) {
          wrappedLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine += " " + word;
        }
      }
      if (currentLine.length > 0) {
        wrappedLines.push(currentLine);
      }
    }
  }

  return wrappedLines.join("\n");
  /*
    all_words = text.split(/\s+/)
    width = 80
    wrapped_lines = []
    current_line = ""

    for each word in all_words
      if(current_line.length + word.length < width)
        current_line = current_line + " " + word
      else
        wrapped_lines.push(current_line)
        current_line = word
      
    if(current_line.length > 0)
      wrapped_lines.push(current_line)


    return wrapped_lines.join("\n")
  */
  return text;
}
