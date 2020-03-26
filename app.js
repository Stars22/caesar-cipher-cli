const { program } = require("commander");
const stream = require("stream");
const util = require("util");
const fs = require("fs");
const Cipher = require("./CipherTransform");

program
  .requiredOption("-s, --shift <number>", "a shift")
  .requiredOption("-a, --actions <actionName>", "an action encode/decode")
  .option("-i, --input <filename>", "an input file")
  .option("-o, --output <filename>", "an output file");

program.parse(process.argv);

const { shift, input, output, actions } = program;
const outputExist = fs.existsSync(output);
const inputExist = fs.existsSync(input);
const inputStream = inputExist
  ? fs.createReadStream(input)
  : stream.Readable.from(input);
const outputStream = outputExist
  ? fs.createWriteStream(output)
  : process.stdout;
const pipeline = util.promisify(stream.pipeline);

async function run() {
  await pipeline(inputStream, new Cipher(shift, actions), outputStream);
  console.log("Pipeline succeeded.");
}

run().catch(console.error);
