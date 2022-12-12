


import { getGithubData } from './gh';
import { Logger } from './logger';
import { addNtnItem } from './ntn';

const logger = new Logger();

logger.info('Application has been started');

const perPage = 20;
let pageNumber = 1;

const promises = [];

export function App() {
    getGithubData(perPage, pageNumber).then((e) => {
        console.log(e.data.total_count);
        console.log(Math.ceil(e.data.total_count/20));

        
        // e.data.items.forEach(element => {
        //     addNtnItem(
        //         {
        //             name: element.name,
        //             html_url: element.html_url,
        //             fork: element.fork,
        //             description: element.description,
        //             language: element.language,
        //             archived: element.archived,
        //             visibility: element.visibility,
        //             created_at: element.created_at,
        //             updated_at: element.updated_at,
        //             pushed_at: element.pushed_at
        //         }
        //     );
        // });
    });
}
