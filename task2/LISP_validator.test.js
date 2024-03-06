const { validateParentheses, validateLispParentheses } = require('./LISP_validator.js');
describe('validateParentheses', () => {

    // The function returns true when given an empty string.
    it('should return true when given an empty string', () => {
      expect(validateParentheses({})('')).toBe(true);
    });

    it('should return true when given a string containing only valid pairs of parentheses', () => {
      expect(validateParentheses({})('')).toBe(true);
      expect(validateParentheses({'(' : ')' })('()')).toBe(true);
      expect(validateParentheses({'[' : ']' })('[]')).toBe(true);
      expect(validateParentheses({'{' : '}' })('{}')).toBe(true);
      expect(validateParentheses({'(' : ')', '[' : ']', '{' : '}' })('()[]{}')).toBe(true);
    });

    it('should return true when given a string containing nested valid pairs of parentheses', () => {
      expect(validateParentheses({'(' : ')' })('()')).toBe(true);
      expect(validateParentheses({'(' : ')' })('(())')).toBe(true);
      expect(validateParentheses({'(' : ')' })('((()))')).toBe(true);
      expect(validateParentheses({'(' : ')' })('()()')).toBe(true);
      expect(validateParentheses({'(' : ')' })('(()())')).toBe(true);
    });

    it('should return true when given a string containing valid pairs of parentheses with other characters in between', () => {
      expect(validateParentheses({'(' : ')' })('abc(def)ghi')).toBe(true);
    });

    it('should return true when given a string containing valid pairs of parentheses with other characters before and after', () => {
      expect(validateParentheses({})('abc(def)ghi')).toBe(true);
    });

    it('should return true when given a string containing valid pairs of parentheses with other characters before and after, and nested valid pairs of parentheses', () => {
      expect(validateParentheses({})('abc(def)ghi')).toBe(true);
    });

    it('should return true when given a string containing valid pairs of parentheses with other characters in between and nested valid pairs of parentheses', () => {
      expect(validateParentheses({'(' : ')' })('()')).toBe(true);
      expect(validateParentheses({'(' : ')' })('(())')).toBe(true);
      expect(validateParentheses({'(' : ')' })('()()')).toBe(true);
      expect(validateParentheses({'(' : ')' })('(())()')).toBe(true);
      expect(validateParentheses({'(' : ')' })('()()()')).toBe(true);
      expect(validateParentheses({'(' : ')' })('(())(())')).toBe(true);
      expect(validateParentheses({'(' : ')' })('()()()()')).toBe(true);
      expect(validateParentheses({'(' : ')' })('(())(())(())')).toBe(true);
      expect(validateParentheses({'(' : ')' })('()()()()()')).toBe(true);
      expect(validateParentheses({'(' : ')' })('(())(())(())(())')).toBe(true);
    });

    it('should return false when given a string containing only a closing parenthesis', () => {
      expect(validateParentheses({'(' : ')' })(')')).toBe(false);
    });

    it('should return false when given a string containing an odd number of parentheses', () => {
      expect(validateParentheses({'(' : ')' })('()')).toBe(true);
      expect(validateParentheses({'(' : ')' })(')(')).toBe(false);
      expect(validateParentheses({'(' : ')' })('((())')).toBe(false);
      expect(validateParentheses({'(' : ')' })('(()))')).toBe(false);
    });

    it('should return false when given a string containing invalid pairs of parentheses', () => {
      expect(validateParentheses({'(' : ')' })('()(')).toBe(false);
      expect(validateParentheses({'[' : ']' })('[[]')).toBe(false);
      expect(validateParentheses({'{' : '}' })('{{}')).toBe(false);
      expect(validateParentheses({'(' : ')' })(')(')).toBe(false);
      expect(validateParentheses({'[' : ']' })(']')).toBe(false);
      expect(validateParentheses({'{' : '}' })('}')).toBe(false);
    });

    it('should return true when given an empty string', () => {
      expect(validateParentheses({})('')).toBe(true);
    });

    it('should return false when given a large string with invalid pairs of parentheses', () => {
      const parentheses = {
        '(' : ')',
        '[' : ']',
        '{' : '}',
      };

      const str = '((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((';

      expect(validateParentheses(parentheses)(str)).toBe(false);
    });
});

describe('validateLispParentheses', () => {

    it('should return true when given a string with balanced parentheses', () => {
      const result = validateLispParentheses("((()))");
      expect(result).toBe(true);
    });

    it('should return false when given a string with unbalanced parentheses', () => {
      const result = validateLispParentheses("((())");
      expect(result).toBe(false);
    });

    it('should return true when given an empty string', () => {
      const result = validateLispParentheses("");
      expect(result).toBe(true);
    });

    it('should return false when given a string with a closing parenthesis before an opening parenthesis', () => {
      const result = validateLispParentheses("())(");
      expect(result).toBe(false);
    });

    it('should return false when given a string with a closing parenthesis but no opening parenthesis', () => {
      const result = validateLispParentheses("())");
      expect(result).toBe(false);
    });
});
