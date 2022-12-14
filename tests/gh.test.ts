import { ghAuthHeader } from './../src/gh';
import { describe, expect, test } from '@jest/globals';

describe('GithubMethods', () => {
    test('ghAuthHeader', () => {
        expect(ghAuthHeader('check')).toEqual({
            'Authorization': `token check`,
            'Accept-Encoding': 'application/json',
        });
    })
});