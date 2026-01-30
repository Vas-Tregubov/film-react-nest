import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private escapeValue(value: any): string {
    return String(value).replace(/\t/g, '\\t').replace(/\n/g, '\\n');
  }

  private formatMessage(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): string {
    const timestamp = new Date().toISOString();
    const escapedMessage = this.escapeValue(message);
    const params = optionalParams
      .map((param) => this.escapeValue(param))
      .join('\t');
    return `timestamp=${timestamp}\tlevel=${level}\tmessage=${escapedMessage}${params ? `\tparams=${params}` : ''}\n`;
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(
      this.formatMessage('error', message, ...optionalParams),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('warn', message, ...optionalParams),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('debug', message, ...optionalParams),
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(
      this.formatMessage('verbose', message, ...optionalParams),
    );
  }
}
