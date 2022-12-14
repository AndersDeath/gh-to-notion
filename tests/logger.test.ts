import { Logger } from './../src/logger';
import {describe, expect, test} from '@jest/globals';

describe('Logger', () => {
  test('info', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    const logger = new Logger();
    logger.info('test');
    expect(logSpy).toHaveBeenCalled();
    // expect(logSpy).toHaveBeenCalledWith('test');
})});