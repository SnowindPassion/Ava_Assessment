const validateParentheses = (parentheses) => (str) => {
    const stack = [];
    const parentheseSet = new Set([...Object.keys(parentheses), ...Object.values(parentheses)]);
    for(const char of str) {
      if(!parentheseSet.has(char)) {
        continue;
      }
      if(parentheses[char]) {
        stack.push(char);
      }
      else if(!stack.length || parentheses[stack.pop()] !== char) { 
        return false;
      }
    }

    return stack.length === 0;
}

const validateLispParentheses = (code) => validateParentheses({'(' : ')' })(code);

module.exports = {
    validateParentheses,
    validateLispParentheses
};