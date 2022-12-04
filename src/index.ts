import { Logger } from './logger';
import { Client } from '@notionhq/client';
import axios from 'axios';


require('dotenv').config();

const logger = new Logger();

logger.info('Application has been started');

const getGithubData = async () => {
    const res =  await axios.get('https://api.github.com/search/repositories?q=user:' + process.env.GH_USERNAME +'&per_page=100&page=1', {
        headers: {
            'Authorization': `token ${process.env.GH_TOKEN}`,
            'Accept-Encoding': 'application/json',
        }
    },);
    return res;
}

const res = [];
getGithubData().then((e) => {
    console.log( )
    console.log(Object.keys(e.data))
    console.log(e.data.items.length)
    e.data.items.forEach(element => {
        // console.log(element);
        res.push({
            url: element.html_url,
            fork: element.fork,
            desciption: element.description,
            language: element.language,
            archived: element.archived,
            vidibility: element.visibility,
            created_at: element.created_at,
            updated_at: element.updated_at,
            pushed_at: element.pushed_at,
        });
    });
    // console.log(res);
    console.log(res.length);
});
