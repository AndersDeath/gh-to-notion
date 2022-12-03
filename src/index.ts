import { Logger } from './logger';
import { Client } from '@notionhq/client';
// import  from 'node-fetch';

const fetch = require('node-fetch');
require('dotenv').config();

const logger = new Logger();

logger.info('Application has been started');

// const notion = new Client({ auth: process.env.NOTION_KEY })
// const databaseId = process.env.NOTION_DATABASE_ID

const test = async () => {
    const response = await fetch('https://github.com/');
    const body = await response.text();
    console.log(body)
}


test();