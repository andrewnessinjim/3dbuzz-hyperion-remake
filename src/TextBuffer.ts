import * as TextUtils from "./TextUtils/index.js";

let outputBuffer: string = "";

function add(text: string): void {
  outputBuffer += text + "\n";
}

function show(): void {
  console.clear();
  process.stdout.write(
    TextUtils.wordWrap(outputBuffer, process.stdout.columns),
  );

  outputBuffer = "";
}

export default {
  add,
  show,
};
