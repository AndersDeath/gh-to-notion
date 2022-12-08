import { Logger } from './logger';
import { Client } from '@notionhq/client';
import axios from 'axios';
require('dotenv').config();
const start = false;
const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

console.log(process.env.NOTION_KEY)

const logger = new Logger();

logger.info('Application has been started');

console.log('==========!@#!@#!@#!@#123==========');

const ghUserQuery = ({username, perPage, page} : {username: string; perPage: number; page: number}): string => {
  return `https://api.github.com/search/repositories?q=user:${username}&per_page=${perPage}&page=${page}`;
}

const ghAuthHeader = (ghToken: string): { Authorization: string; 'Accept-Encoding': string} => {
  return {
    'Authorization': `token ${ghToken}`,
    'Accept-Encoding': 'application/json',
  }
}

const ntnTitleField = (name: string) => {
  return {
    title:[
      {
        "text": {
          "content": name,
        }
      }
    ]
  }
}

const getGithubData = async () => {
    const res =  await axios.get(ghUserQuery({
      username:  process.env.GH_USERNAME,
      perPage: 20,
      page: 1,
    }), {
        headers: ghAuthHeader(process.env.GH_TOKEN)
    },);
    return res;
} 


async function addItem(
    name,
    html_url,
    fork,
    description,
    language,
    archived,
    visibility,
    created_at,
    updated_at,
    pushed_at    
) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          Title: ntnTitleField(name),
          URL: {
              type: 'url',
              url: html_url
          },
          Description: {
            rich_text: [
                {
                type: 'text',
                text: {
                    content:  description || 'no description',
                }
            }
            ]
          },
          Language: {
            type:'multi_select',
            multi_select: [
                {
                    name: language || 'no language'
                }
            ]
          },
          Fork: {
            type: 'checkbox',
            checkbox: fork
          },
          Archived: {
            type: 'checkbox',
            checkbox: archived
          },
          Visibility: {
            rich_text: [
                {
                type: 'text',
                text: {
                    content:  visibility || 'no description',
                }
            }
            ]
          },
          Created_at: {
            type: 'date',
            date: {
                start: created_at
            }
          },
          Updated_at: {
            type: 'date',
            date: {
                start: updated_at
            }
          },
          Pushed_at: {
            type: 'date',
            date: {
                start: pushed_at
            }
          }
        },
      })
      console.log(response)
      console.log("Success! Entry added.")
    } catch (error) {
      console.error(error.body)
    }
  }

const res = [];
if(start) {


getGithubData().then((e) => {
    console.log( )
    console.log(Object.keys(e.data))
    console.log(e.data.items.length)
    e.data.items.forEach(element => {
        // console.log(element);
        res.push({
            name: element.name,
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

        addItem(
            element.name,    
            element.html_url,
            element.fork,
            element.description,
            element.language,
            element.archived,
            element.visibility,
            element.created_at,
            element.updated_at,
            element.pushed_at
            )

    });
    // console.log(res);
    // console.log(res.length);
});



}