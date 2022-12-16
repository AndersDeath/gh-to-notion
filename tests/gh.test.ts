import axios from 'axios';
import { ghAuthHeader, ghUserQuery, ghParseData, getGithubData } from './../src/gh';
import { describe, expect, test } from '@jest/globals';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('GithubMethods', () => {

    test('ghAuthHeader', () => {
        expect(ghAuthHeader('check')).toEqual({
            'Authorization': `token check`,
            'Accept-Encoding': 'application/json',
        });
    });

    test('ghUserQuery', () => {
        expect(ghUserQuery({ username: 'check', perPage: 1, page: 1 })).toEqual(
            `https://api.github.com/search/repositories?q=user:check&per_page=1&page=1`
        );
    });

    test('ghParseData', () => {
        const dataMock = {
            items: [
                {
                    name: 'check',
                    html_url: 'check',
                    fork: true,
                    description: 'check',
                    language: 'check',
                    archived: true,
                    visibility: 'check',
                    created_at: 'check',
                    updated_at: 'check',
                    pushed_at: 'check'
                }
            ]
        };
        const answerMock = [];
        expect(ghParseData(dataMock)).toEqual([{
            name: 'check',
            html_url: 'check',
            fork: true,
            description: 'check',
            language: 'check',
            archived: true,
            visibility: 'check',
            created_at: 'check',
            updated_at: 'check',
            pushed_at: 'check'
        }]);
    });

});