require('dotenv').config();
import { App } from "./app";
import { Logger } from './logger';

const start: boolean = true;
const logger: Logger = new Logger();

if (start) {
  logger.info('Preparing for application starting');
  App();
} else {
  logger.info('Application is in "no start" mode. Start is impossible');
}