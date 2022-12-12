


import { getGithubData } from './gh';
import { Logger } from './logger';
import { addNtnItem } from './ntn';

const logger = new Logger();

logger.info('Application has been started');

export function App() {
    getGithubData().then((e) => {
        e.data.items.forEach(element => {
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
}
