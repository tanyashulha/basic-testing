// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 22, b: 11, action: Action.Subtract, expected: 11 },
  { a: 78, b: 100, action: Action.Subtract, expected: -22 },
  { a: 5, b: 1, action: Action.Subtract, expected: 4 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  { a: 1, b: 5, action: Action.Divide, expected: 0.2 },
  { a: 44, b: 11, action: Action.Divide, expected: 4 },
  { a: 100, b: 10, action: Action.Divide, expected: 10 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 7, b: 3, action: Action.Multiply, expected: 21 },
  { a: 1000000, b: 0, action: Action.Multiply, expected: 0 },
  { a: 4, b: 4, action: Action.Multiply, expected: 16 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 1, b: 60, action: Action.Exponentiate, expected: 1 },
  { a: 9, b: 2, action: Action.Exponentiate, expected: 81 },
  { a: 1, b: 1, action: undefined, expected: null },
  { a: 1, b: 1, action: 'aaddfff', expected: null },
  { a: null, b: 'fhfhf', action: Action.Exponentiate, expected: null },
  { a: 34, b: undefined, action: Action.Divide, expected: null },
  { a: '2', b: undefined, action: Action.Subtract, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return result: $expected on $action action (values: $a && $b)',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
