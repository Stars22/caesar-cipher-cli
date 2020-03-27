function caesarCipher(data, shift, action = "encode") {
  shift = Number.parseInt(shift);
  actionShift = action === "encode" ? shift : shift * -1;
  const CHARS_CODES_START_AT = {
    upperCase: 65,
    lowerCase: 97
  };
  const TOTAL_CHAR_QUANTITY = 26;
  return data.replace(/[A-Za-z]/g, char => {
    const currentCharCode = char.charCodeAt();
    const letterCase = currentCharCode >= 97 ? "lowerCase" : "upperCase";
    const substitutePositionFromZero =
      currentCharCode - CHARS_CODES_START_AT[letterCase] + actionShift;
    const substituteCharCode =
      (substitutePositionFromZero % TOTAL_CHAR_QUANTITY) +
      CHARS_CODES_START_AT[letterCase];
    return String.fromCharCode(substituteCharCode);
  });
}
module.exports = caesarCipher;
