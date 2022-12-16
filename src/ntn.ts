import { Item } from "./interfaces"

/**
 * Notion title field
 * @param name title name
 * @returns title structure
 */
export const ntnTitleField = (name: string): any => {
  return {
    title: [
      {
        "text": {
          "content": name,
        }
      }
    ]
  }
}

/**
 * Notion url field
 * @param url url string
 * @returns url structure
 */
export const ntnUrlField = (url: string): any => {
  return {
    type: 'url',
    url: url
  }
}

/**
 * Notion RichTextFirld
 * @param content content string
 * @param byDefault default value
 * @returns ruchtext structure
 */
export const ntnRichTextField = (content: string, byDefault: string): any => {
  return {
    rich_text: [
      {
        type: 'text',
        text: {
          content: content || byDefault
        }
      }
    ]
  }
}

/**
 * Notion Multi select item
 * @param content 
 * @param byDefault 
 * @returns multi select item structure
 */
export const ntnMultiSelectItem = (content: string, byDefault: string) => {
  return {
    name: content || byDefault
  }
}

/**
 * Notion multi select field
 * @param elements mulbit select items
 * @returns multi select structure
 */
export const ntnMultiSelectField = (elements: any[]): any => {
  return {
    type: 'multi_select',
    multi_select: elements
  }
}

/**
 * Notion checkbox field
 * @param content checkox value
 * @returns checkbox field structure
 */
export const ntnCheckboxField = (content: boolean): any => {
  return {
    type: 'checkbox',
    checkbox: content
  }
}

/**
 * Notion date field
 * @param date date value
 * @returns date field structure
 */
export const ntnDateField = (date: string): any => {
  return {
    type: 'date',
    date: {
      start: date
    }
  }
}

/**
 * Preparation data for notion
 * @param param0 Item for notion
 * @returns Data for sending to Notion
 */
export const ntnDataBuilder = (databaseId, { name,
  html_url,
  fork,
  description,
  language,
  archived,
  visibility,
  created_at,
  updated_at,
  pushed_at }: Item) => {
  return {
    parent: { database_id: databaseId },
    properties: {
      Title: ntnTitleField(name),
      URL: ntnUrlField(html_url),
      Description: ntnRichTextField(description, 'no description'),
      Language: ntnMultiSelectField([
        ntnMultiSelectItem(language, 'no language')
      ]),
      Fork: ntnCheckboxField(fork),
      Archived: ntnCheckboxField(archived),
      Visibility: ntnRichTextField(visibility, 'no visibility'),
      Created_at: ntnDateField(created_at),
      Updated_at: ntnDateField(updated_at),
      Pushed_at: ntnDateField(pushed_at),
    },
  }
}


