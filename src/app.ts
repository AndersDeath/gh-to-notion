import { getGithubData, ghParseData, getGithubDataGroup } from './gh';
import { Logger } from './logger';
import { addNtnItem, Item } from './ntn';

interface ghItem {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: any;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;

}
interface ghData {
    total_count: boolean;
    incomplete_results: boolean;
    items: ghItem[]
}

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
        console.log(e.data);
        // let data: Item[] = [];
        // const totalNumber:number = (e.data.total_count) as number;
        // data = [...data, ...ghParseData(e.data)];
        // getGithubDataGroup(pageNumber + 1, totalNumber, perPage).then((q: any) => {
        //     data = [...data, ...q];
        //     data.forEach((element: Partial<Item> )=> {
        //         addNtnItem(
        //             {
        //                 name: element.name,
        //                 html_url: element.html_url,
        //                 fork: element.fork,
        //                 description: element.description,
        //                 language: element.language,
        //                 archived: element.archived,
        //                 visibility: element.visibility,
        //                 created_at: element.created_at,
        //                 updated_at: element.updated_at,
        //                 pushed_at: element.pushed_at
        //             }
        //         );
        //     });
        // });
    });
}
