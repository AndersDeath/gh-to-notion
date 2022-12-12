


import { getGithubData } from './gh';
import { Logger } from './logger';
import { addNtnItem } from './ntn';

const logger = new Logger();

logger.info('Application has been started');

const perPage = 20;
let pageNumber = 1;

const promises = [];

export function App() {
    const data = [];
    getGithubData(perPage, pageNumber).then((e) => {
        e.data.items.forEach(element => {
            data.push({
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
        for (let index = pageNumber + 1; index <= Math.ceil(e.data.total_count/20); index++) {
            promises.push(getGithubData(perPage, index));
        }
        Promise.all(promises).then((res) => {
            res.forEach((q) => {
                q.data.items.forEach(element => {
                    data.push({
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
            })
        });

    }).then(() => {
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
        })
       
    });
}
