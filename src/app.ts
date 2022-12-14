import { getGithubData, ghParseData, getGithubDataGroup } from './gh';
import { Logger } from './logger';
import { addNtnItem, Item } from './ntn';

/**
 * Logger instance
 */
const logger = new Logger();

/**
 * Application function
 */
export function App() {
    logger.info('Application has been started');
    const perPage: number = 20;
    let pageNumber: number = 1;
    getGithubData(perPage, pageNumber).then((e: any) => {
        let data: Item[] = [];
        const totalNumber:number = (e.data.total_count) as number;
        data = [...data, ...ghParseData(e.data)];
        getGithubDataGroup(pageNumber + 1, totalNumber, perPage).then((q: any) => {
            data = [...data, ...q];
            data.forEach((element: Partial<Item> )=> {
                addNtnItem(
                    {
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
                    }
                );
            });
        });
    });
}
