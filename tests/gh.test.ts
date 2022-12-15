import { ghAuthHeader, ghUserQuery } from './../src/gh';
import { describe, expect, test } from '@jest/globals';

describe('GithubMethods', () => {
    test('ghAuthHeader', () => {
        expect(ghAuthHeader('check')).toEqual({
            'Authorization': `token check`,
            'Accept-Encoding': 'application/json',
        });
    })

    test('ghUserQuery', () => {
        expect(ghUserQuery({ username: 'check', perPage: 1, page: 1})).toEqual(
            `https://api.github.com/search/repositories?q=user:check&per_page=1&page=1`
        );
    })
});