import { ntnTitleField, ntnUrlField, ntnRichTextField, ntnMultiSelectItem, ntnMultiSelectField, ntnCheckboxField, ntnDateField } from './../src/ntn';
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
  

});