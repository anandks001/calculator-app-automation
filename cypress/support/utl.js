/**
 * @param {string} input1
 * @param {string} operator
 * @param {string} input2
 * @returns {string} result
 */
 export const calc = (input1,operator,input2) => {
    // Convert string to int
    input1 = parseFloat(input1);
    input2 = parseFloat(input2);

    // Arithmetic operations
    switch (operator) {
      case "+":
        return input1 + input2;
      case "-":
        return input1 - input2;
      case "x":
        return input1 * input2;
      case "/":
        return input1 / input2;
    }
}