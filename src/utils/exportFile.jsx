import { saveAs } from "file-saver";

export function exportFile({ text }) {
  var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "koompi-hash.txt");
}
