import { getGithubData, ghParseData, getGithubDataGroup } from './gh';
import { Logger } from './logger';
import { addNtnItem } from './ntn';

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
    getGithubData(perPage, pageNumber).then((e) => {
        let data = [];
        const totalNumber = e.data.total_count;
        data = [...data, ...ghParseData(e.data)];
        getGithubDataGroup(pageNumber + 1, totalNumber, perPage).then((q) => {
            data = [...data, ...q];
            data.forEach(element => {
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
