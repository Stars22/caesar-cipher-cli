const { program } = require("commander");
const { pipeline } = require("stream");
const fs = require("fs");
const caesarCipher = require("./caesarCipher");

program
  .requiredOption("-s, --shift <number>", "a shift")
  .option("-i, --input <filename>", "an input file")
  .option("-o, --output", "an output file")
  .requiredOption("-a, --action", "an action encode/decode");

program.parse(process.argv);
