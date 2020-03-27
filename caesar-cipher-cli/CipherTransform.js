const caesarCipher = require("./caesarCipher");
const stream = require("stream");
class Cipher extends stream.Transform {
  constructor(shift, action) {
    super();
    this.shift = shift;
    this.action = action;
  }
  _transform(chunk, _, finishCb) {
    const data = chunk.toString();
    const encodedChunk = caesarCipher(data, this.shift, this.action);
    this.push(encodedChunk);
    finishCb();
  }
}

module.exports = Cipher;
