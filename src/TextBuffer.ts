import * as TextUtils from "./utils/text/index.js";

let outputBuffer: string = "";

function add(text: string): void {
  outputBuffer += text + "\n";
}

function show(): void {
  console.clear();
  process.stdout.write(
    TextUtils.wordWrap(outputBuffer),
  );

  outputBuffer = "";
}

export default {
  add,
  show,
};
