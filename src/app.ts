


import { getGithubData } from './gh';
import { Logger } from './logger';
import { addNtnItem } from './ntn';

const logger = new Logger();

logger.info('Application has been started');

export function App() {
   getGithubData().then((e) => {
        e.data.items.forEach(element => {
            addNtnItem(
                element.name,
                element.html_url,
                element.fork,
                element.description,
                element.language,
                element.archived,
                element.visibility,
                element.created_at,
                element.updated_at,
                element.pushed_at
            );
        });
    });
}
