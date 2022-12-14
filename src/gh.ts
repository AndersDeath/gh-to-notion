import { Item } from './ntn';
import axios from 'axios';

/**
 * UserQuery interface
 */
interface UserQuery {
    username: string;
    perPage: number;
    page: number;
}

/**
 * AuthHeader interface
 */
interface AuthHeader {
    Authorization: string;
    'Accept-Encoding': string;
}

/**
 * query's builder
 * @param param0 UserQuery
 * @returns url address for fetching data from github
 */
export const ghUserQuery = ({ username, perPage, page }: UserQuery): string => {
    return `https://api.github.com/search/repositories?q=user:${username}&per_page=${perPage}&page=${page}`;
}

/**
 * 
 * @param ghToken Github auth token
 * @returns AuthHeader for request
 */
const ghAuthHeader = (ghToken: string): Partial<AuthHeader> => {
    return {
        'Authorization': `token ${ghToken}`,
        'Accept-Encoding': 'application/json',
    }
}

/**
 * Request to Guthub
 * @param perPage repos per page
 * @param pageNumber number of page
 * @returns data from github
 */
export const getGithubData = async (perPage: number, pageNumber: number): any => {
    const res = await axios.get(ghUserQuery({
        username: process.env.GH_USERNAME,
        perPage: perPage,
        page: pageNumber,
    }), {
        headers: ghAuthHeader(process.env.GH_TOKEN)
    },);
    return res;
}

/**
 * 
 * @param data data from github
 * @returns parsed data for pushing to Notion
 */
export const ghParseData = (data: Partial<{items: Item[]}>): Item[] => {
    const box: Item[] = []
    data.items.forEach((element: Item) => {
        box.push({
            name: element.name,
            html_url: element.html_url,
            fork: element.fork,
            description: element.description,
            language: element.language,
            archived: element.archived,
            visibility: element.visibility,
            created_at: element.created_at,
            updated_at: element.updated_at,
            pushed_at: element.pushed_at
        });
    });
    return box;
}

export const getGithubDataGroup = async (pageNumber: number, totalNumber: number, perPage:number) => {
    const promises: Promise<any>[] = [];
    let data: Item[] = [];
    for (let index = pageNumber; index <= Math.ceil(totalNumber / 20); index++) {
        promises.push(getGithubData(perPage, index));
    }
    return await Promise.all(promises).then((res) => {
        res.forEach((q) => {
            data = [...data, ...ghParseData(q.data)];
        });
        return data;
    });
}
