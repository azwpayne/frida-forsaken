'use strict';

export class Log {
  /**
   * level: trace/debug/info/warm/error/panic/fatal
   */

  /**
   * level:trace
   * @param tag
   * @param str
   */
  static t(tag: String, str: any): void {
    console.trace(`${formatDateWithMilliseconds()} [TRACE] [${tag}] ${str}`);
  }

  /**
   * level:debug
   * @param tag
   * @param str
   */
  static d(tag: String, str: any): void {
    console.debug(`${formatDateWithMilliseconds()} [DEBUG] [${tag}] ${str}`);
  }

  /**
   * level:info
   * @param tag
   * @param str
   */
  static i(tag: string, str: any): void {
    console.info(`${formatDateWithMilliseconds()} [INFO] [${tag}] ${str}`);
  }

  /**
   * level:warm
   * @param tag
   * @param str
   */
  static w(tag: String, str: any): void {
    console.warn(`${formatDateWithMilliseconds()} [WARM] [${tag}] ${str}`);
  }

  /**
   * level:error
   * @param tag
   * @param str
   */
  static e(tag: String, str: any): void {
    console.error(`${formatDateWithMilliseconds()} [ERROR] [${tag}] ${str}`);
  }
}

/**
 * formatDateWithMilliseconds
 * date formatting,Used to obtain the current time accurate to milliseconds and format it
 */
function formatDateWithMilliseconds(): string {
  const date = new Date();

  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}