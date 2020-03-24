function caesarCipher(data, shift) {
  const CHARS_CODES_START_AT = 97;
  const TOTAL_CHAR_QUANTITY = 26;
  return data.toLowerCase().replace(/[a-z]/g, char => {
    const currentCharCode = char.charCodeAt();
    const substitutePositionFromZero =
      currentCharCode - CHARS_CODES_START_AT + Number.parseInt(shift);
    const substituteCharCode =
      (substitutePositionFromZero % TOTAL_CHAR_QUANTITY) + CHARS_CODES_START_AT;
    return String.fromCharCode(substituteCharCode);
  });
}

module.exports = caesarCipher;
