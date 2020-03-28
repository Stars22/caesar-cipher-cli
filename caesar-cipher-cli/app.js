const { program } = require("commander");
const stream = require("stream");
const util = require("util");
const fs = require("fs");
const path = require("path");

const Cipher = require("./CipherTransform");

function handleStreamError(error) {
  console.error(error.message);
  process.exit(1);
}
function makePath(filename) {
  return path.join(__dirname, filename);
}

program
  .requiredOption("-s, --shift <number>", "a shift")
  .requiredOption("-a, --actions <actionName>", "an action encode/decode")
  .option("-i, --input <filename>", "an input file")
  .option("-o, --output <filename>", "an output file");

program.parse(process.argv);

const { shift, input, output, actions } = program;
const inputStream = input
  ? fs.createReadStream(makePath(input)).on("error", handleStreamError)
  : process.stdin;
const outputStream = output
  ? fs
      .createWriteStream(makePath(output), { flags: "a" })
      .on("error", handleStreamError)
  : process.stdout;
const pipeline = util.promisify(stream.pipeline);

async function run() {
  await pipeline(inputStream, new Cipher(shift, actions), outputStream);
  console.log("The data was ciphered");
}

run().catch(console.error);
