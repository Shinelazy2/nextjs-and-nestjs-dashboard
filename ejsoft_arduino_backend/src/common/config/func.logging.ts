import { Logger as Loggers } from '@nestjs/common';
import { EXCLUDE_LOGGING_KEY } from './exlcude.logging';

export function LogClassMethods(constructor: any) {
  // 모든 메서드 이름을 가져옵니다.
  const logger = new Loggers();

  const methods = Object.getOwnPropertyNames(constructor.prototype).filter(
    (method) => method !== 'constructor' && typeof constructor.prototype[method] === 'function',
  );

  methods.forEach((method) => {
    const isExcluded = Reflect.getMetadata(EXCLUDE_LOGGING_KEY, constructor.prototype, method);
    if (isExcluded) {
      // Skip logging for this method
      return;
    }

    const originalMethod = constructor.prototype[method];
    constructor.prototype[method] = async function (...args: any[]) {
      logger.debug(`${method} with arguments: ${JSON.stringify(args)}`);
      const startTime = performance.now();

      try {
        const result = await originalMethod.apply(this, args);
        logger.debug(`[${method}][Result]:\n${JSON.stringify(result)}`);
        return result;
      } catch (error) {
        logger.error(`Error in ${method}: ${error}`);
        throw error;
      } finally {
        const endTime = performance.now();

        logger.debug(`${method} took ${(endTime - startTime).toFixed(2)} milliseconds.\n`);
      }
    };
  });
}
