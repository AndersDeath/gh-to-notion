import { ntnTitleField, ntnUrlField, ntnRichTextField, ntnMultiSelectField, ntnMultiSelectItem, ntnCheckboxField, ntnDateField } from './ntn';
import { Logger } from './logger';
import { Client } from '@notionhq/client';
import axios from 'axios';
require('dotenv').config();
const start = false;
const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

const logger = new Logger();

logger.info('Application has been started');

const ghUserQuery = ({username, perPage, page} : {username: string; perPage: number; page: number}): string => {
  return `https://api.github.com/search/repositories?q=user:${username}&per_page=${perPage}&page=${page}`;
}

const ghAuthHeader = (ghToken: string): { Authorization: string; 'Accept-Encoding': string} => {
  return {
    'Authorization': `token ${ghToken}`,
    'Accept-Encoding': 'application/json',
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
          URL: ntnUrlField(html_url),
          Description: ntnRichTextField(description, 'no description'),
          Language: ntnMultiSelectField([
            ntnMultiSelectItem(language, 'no language')
          ]),
          Fork: ntnCheckboxField(fork),
          Archived:  ntnCheckboxField(archived),
          Visibility:  ntnRichTextField(visibility, 'no visibility'),
          Created_at: ntnDateField(created_at),
          Updated_at: ntnDateField(updated_at),
          Pushed_at:  ntnDateField(pushed_at),
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
    e.data.items.forEach(element => {
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
            );
    });
});



}