import { ntnTitleField, ntnUrlField, ntnRichTextField } from './../src/ntn';
import {describe, expect, test} from '@jest/globals';

describe('Notions structure', () => {
  test('ntnTitleField', () => {
    expect(ntnTitleField('check')).toEqual({
      title: [
        {
          "text": {
            "content": 'check',
          }
        }
      ]
    });
  });

  test('ntnUrlField', () => {
    expect(ntnUrlField('check')).toEqual({
      type: 'url',
      url: 'check'
    });
  });

  test('ntnRichTextField with data', () => {
    expect(ntnRichTextField('check', 'default')).toEqual({
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'check'
          }
        }
      ]
    });
  });

  test('ntnRichTextField without data', () => {
    expect(ntnRichTextField('', 'default')).toEqual({
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'default'
          }
        }
      ]
    });
  });

});