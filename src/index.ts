import { Logger } from './logger';
import { Client } from '@notionhq/client';

require('dotenv').config();

const logger = new Logger();

logger.info('Application has been started');

// const notion = new Client({ auth: process.env.NOTION_KEY })
// const databaseId = process.env.NOTION_DATABASE_ID

