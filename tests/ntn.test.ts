import { ntnTitleField, ntnUrlField, ntnRichTextField, ntnMultiSelectItem, ntnMultiSelectField, ntnCheckboxField, ntnDateField, ntnDataBuilder } from './../src/ntn';
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

  test('ntnMultiSelectItem with data', () => {
    expect(ntnMultiSelectItem('check', 'default')).toEqual({
      name: 'check'
    });
  });

  test('ntnMultiSelectItem without data', () => {
    expect(ntnMultiSelectItem('', 'default')).toEqual({
      name: 'default'
    });
  });
  
  test('ntnMultiSelectField', () => {
    console.log()
    expect(ntnMultiSelectField([ntnMultiSelectItem('check', 'default')])).toEqual(
      {
        type: 'multi_select',
        multi_select: [
          {
            name: 'check'
          }
        ]
      }
    );
  });

  test('ntnCheckboxField', () => {
    expect(ntnCheckboxField(true)).toEqual({
      type: 'checkbox',
      checkbox: true
    });
  });

  test('ntnDateField', () => {
    expect(ntnDateField('check')).toEqual({
      type: 'date',
      date: {
        start: 'check'
      }
    });
  });

  test('ghParseData', () => {


    expect(ntnDataBuilder(
      'test-key',
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
    )).toEqual(
 
      {
        "parent": {
            "database_id": "test-key"
        },
        "properties": {
            "Title": {
                "title": [
                    {
                        "text": {
                            "content": "check"
                        }
                    }
                ]
            },
            "URL": {
                "type": "url",
                "url": "check"
            },
            "Description": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": "check"
                        }
                    }
                ]
            },
            "Language": {
                "type": "multi_select",
                "multi_select": [
                    {
                        "name": "check"
                    }
                ]
            },
            "Fork": {
                "type": "checkbox",
                "checkbox": true
            },
            "Archived": {
                "type": "checkbox",
                "checkbox": true
            },
            "Visibility": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": "check"
                        }
                    }
                ]
            },
            "Created_at": {
                "type": "date",
                "date": {
                    "start": "check"
                }
            },
            "Updated_at": {
                "type": "date",
                "date": {
                    "start": "check"
                }
            },
            "Pushed_at": {
                "type": "date",
                "date": {
                    "start": "check"
                }
            }
        }
    }
    );
});
  

});