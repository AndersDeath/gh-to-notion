import { Logger } from './logger';

require('dotenv').config();

const logger = new Logger();

logger.info('Application has been started');
