import { AuthHeader, Item, UserQuery } from "./interfaces";



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
export const ghAuthHeader = (ghToken: string): Partial<AuthHeader> => {
    return {
        'Authorization': `token ${ghToken}`,
        'Accept-Encoding': 'application/json',
    }
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
