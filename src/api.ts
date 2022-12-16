import { ghUserQuery, ghAuthHeader, ghParseData } from './gh';
import { Item, ntnDataBuilder } from './ntn';
import axios from 'axios';
import { Client } from '@notionhq/client';
const notion = new Client({ auth: process.env.NOTION_KEY })

/**
 * Bunch of requests to Github
 * @param pageNumber number of page
 * @param totalNumber 
 * @param perPage repos per page
 * @returns array with data from Github
 */
export const getGithubDataGroup = async (pageNumber: number, totalNumber: number, perPage:number) => {
    const promises: Promise<any>[] = [];
    let data: Item[] = [];
    for (let index = pageNumber; index <= Math.ceil(totalNumber / 20); index++) {
        promises.push(getGithubData(perPage, index));
    }
    return await Promise.all(promises).then((res) => {
        res.forEach((q) => {
            data = [...data, ...q.items];
        });
        return data;
    });
}

/**
 * Request to Guthub
 * @param perPage repos per page
 * @param pageNumber number of page
 * @returns data from github
 */
export const getGithubData = async (perPage: number, pageNumber: number): Promise<any> => {
    const res = await axios.get(ghUserQuery({
        username: process.env.GH_USERNAME,
        perPage: perPage,
        page: pageNumber,
    }), {
        headers: ghAuthHeader(process.env.GH_TOKEN)
    },);
    return {
        count: res.data.total_count,
        items: ghParseData(res.data)
    };
}


/**
 * Apit request to notion
 * @param param0 Notion data
 */
const sendDataToNotion = async ({
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
  }: Item) => {
    try {
      const response = await notion.pages.create(ntnDataBuilder(
        process.env.NOTION_DATABASE_ID, {
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
      }));
      console.log(response)
      console.log("Success! Entry added.")
    } catch (error) {
      console.error(error.body)
    }
  }

  /**
 * Add data to notion include timeout for async requests
 * @param param0 data for notion
 */
export async function addNtnItem(
    { name,
      html_url,
      fork,
      description,
      language,
      archived,
      visibility,
      created_at,
      updated_at,
      pushed_at }: Item
  ) {
  
    setTimeout(async () => {
      await sendDataToNotion({
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
      });
  
    }, 3000);
  
  }