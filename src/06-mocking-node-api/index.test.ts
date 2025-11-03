// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

const pathTo = './index.ts';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 100);
    jest.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    readFileAsynchronously(pathTo);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathTo);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously(pathTo)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue('content');
    expect(await readFileAsynchronously(pathTo)).toBe('content');
  });
});
