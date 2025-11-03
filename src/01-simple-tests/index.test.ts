// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 8,
      b: 4,
      action: Action.Add,
    };
    expect(simpleCalculator(input)).toBe(12);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 8,
      b: 4,
      action: Action.Subtract,
    };
    expect(simpleCalculator(input)).toBe(4);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 8,
      b: 4,
      action: Action.Multiply,
    };
    expect(simpleCalculator(input)).toBe(32);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 8,
      b: 4,
      action: Action.Divide,
    };
    expect(simpleCalculator(input)).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 8,
      b: 4,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(input)).toBe(4096);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 8,
      b: 4,
      action: 'hbhbhbk',
    };
    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 8,
      b: null,
      action: Action.Divide,
    };
    expect(simpleCalculator(input)).toBeNull();
  });
});
