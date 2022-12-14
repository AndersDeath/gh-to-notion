import { Item } from './ntn';
import axios, { AxiosRequestConfig } from 'axios';

interface UserQuery {
    username: string;
    perPage: number;
    page: number;
}

interface AuthHeader {
    Authorization: string;
    'Accept-Encoding': string;
}


export const ghUserQuery = ({ username, perPage, page }: UserQuery): string => {
    return `https://api.github.com/search/repositories?q=user:${username}&per_page=${perPage}&page=${page}`;
}

const ghAuthHeader = (ghToken: string): Partial<AuthHeader> => {
    return {
        'Authorization': `token ${ghToken}`,
        'Accept-Encoding': 'application/json',
    }
}

export const getGithubData = async (perPage: number, pageNumber: number) => {
    const res = await axios.get(ghUserQuery({
        username: process.env.GH_USERNAME,
        perPage: perPage,
        page: pageNumber,
    }), {
        headers: ghAuthHeader(process.env.GH_TOKEN)
    },);
    return res;
}

export const ghParseData = (data: Partial<{items: Item[]}>) => {
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
