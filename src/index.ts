import { Logger } from './logger';
import { Client } from '@notionhq/client';
import axios from 'axios';


require('dotenv').config();

const logger = new Logger();

logger.info('Application has been started');

const getGithubData = async () => {
    const res =  await axios.get('https://api.github.com/search/repositories?q=user:' + process.env.GH_USERNAME, {
        headers: {
            'Authorization': `token ${process.env.GH_TOKEN}`,
            'Accept-Encoding': 'application/json',
        }
    },);
    return res;
}


getGithubData().then((e) => {
    console.log(e.data);
});
