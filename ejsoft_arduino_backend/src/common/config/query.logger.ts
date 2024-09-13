import { Logger as Loggers } from '@nestjs/common';
import { Logger, QueryRunner, DataSource } from 'typeorm';

export class CustomQueryLogger implements Logger {
  private readonly logger = new Loggers();

  async logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (parameters && parameters.length > 0) {
      const paramsCopy = [...parameters]; // 배열 복사
      const formattedQuery = query.replace(/\?/g, () => {
        const param = paramsCopy.shift(); // 복사한 배열에서 요소 제거
        if (typeof param === 'string') {
          return `'${param.replace(/'/g, "''")}'`; // SQL 인젝션 방지
        }
        return param;
      });
      this.logger.debug(`[Query]: ${formattedQuery}`);
    } else {
      this.logger.debug(`[Query]: ${query}`);
    }
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.error('Query Failed:', query);
    if (parameters && parameters.length > 0) {
      this.logger.error('With Parameters:', parameters);
    }
    this.logger.error('Error:', error);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.warn(`Slow Query (${time}ms): ${query}`);
    if (parameters && parameters.length > 0) {
      this.logger.warn('With Parameters:', parameters);
    }
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.debug('Schema Build:', message);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.debug('Migration:', message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        this.logger.debug('Log:', message);
        break;
      case 'info':
        this.logger.debug('Info:', message);
        break;
      case 'warn':
        this.logger.warn('Warning:', message);
        break;
      default:
        this.logger.debug('Unknown level:', message);
        break;
    }
  }
}
