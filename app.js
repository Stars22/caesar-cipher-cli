const { program } = require("commander");
const stream = require("stream");
const util = require("util");
const fs = require("fs");
const caesarCipher = require("./caesarCipher");

program
  .requiredOption("-s, --shift <number>", "a shift")
  .requiredOption("-a, --actions <actionName>", "an action encode/decode")
  .option("-i, --input <filename>", "an input file")
  .option("-o, --output <filename>", "an output file");

program.parse(process.argv);

const { shift, input, output, actions } = program;

const pipeline = util.promisify(stream.pipeline);

class Cipher extends stream.Transform {
  constructor(shift, action) {
    super();
    this.shift = shift;
    this.action = action;
  }
  _transform(chunk, enc, finishCb) {
    const data = chunk.toString();
    const encodedChunk = caesarCipher(data, this.shift, this.action);
    this.push(encodedChunk);
    finishCb();
  }
}

async function run() {
  await pipeline(
    fs.createReadStream(input),
    new Cipher(shift, actions),
    fs.createWriteStream(output)
  );
  console.log("Pipeline succeeded.");
}

run().catch(console.error);
