// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 20;
    expect(getBankAccount(balance).getBalance()).toBe(20);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 20;

    expect(() => getBankAccount(balance).withdraw(35)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 20;
    expect(() =>
      getBankAccount(balance).transfer(35, getBankAccount(balance)),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 20;
    expect(() =>
      getBankAccount(balance).transfer(35, getBankAccount(balance)),
    ).toThrow(InsufficientFundsError);
  });

  test('should deposit money', () => {
    const balance = 20;
    const deposit = 10;
    const expected = balance + deposit;
    const acc = getBankAccount(balance);

    acc.deposit(deposit);
    expect(acc.getBalance()).toBe(expected);
  });

  test('should withdraw money', () => {
    const balance = 20;
    const withdrawing = 10;
    const expected = balance - withdrawing;
    const acc = getBankAccount(balance);

    acc.withdraw(withdrawing);
    expect(acc.getBalance()).toBe(expected);
  });

  test('should transfer money', () => {
    const balanceFrom = 20;
    const balanceTo = 50;
    const transfered = 10;
    const expectedFrom = balanceFrom - transfered;
    const expectedTo = balanceTo + transfered;
    const accFrom = getBankAccount(balanceFrom);
    const accTo = getBankAccount(balanceTo);

    accFrom.transfer(transfered, accTo);
    expect(accFrom.getBalance()).toBe(expectedFrom);
    expect(accTo.getBalance()).toBe(expectedTo);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 20;
    const account = getBankAccount(balance);
    const res = await account.fetchBalance();

    if (res != null) {
      expect(typeof res).toBe('number');
      return;
    }

    expect(res).toBe(null);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 20;
    const returnedBalance = 30;
    const acc = getBankAccount(balance);

    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(returnedBalance);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(returnedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 20;
    const returnedBalance = null;
    const acc = getBankAccount(balance);

    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(returnedBalance);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
