import { Client } from '@notionhq/client';
export const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId: string = process.env.NOTION_DATABASE_ID

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
export const ntnUrlField = (url: string): any=> {
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

export const ntnMultiSelectItem = (content, byDefault) => {
  return {
    name: content || byDefault
  }
}

export const ntnMultiSelectField = (elements: any[]): any => {
  return {
    type: 'multi_select',
    multi_select: elements
  }
}

export const ntnCheckboxField = (content): any => {
  return {
    type: 'checkbox',
    checkbox: content
  }
}

export const ntnDateField = (date: string): any => {
  return {
    type: 'date',
    date: {
      start: date
    }
  }
}

const ntnDataBuilder = ({ name,
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

const ntnWrite = async ({
  name,
  html_url,
  fork,
  description,
  language,
  archived,
  visibility,
  created_at,
  updated_at,
  pushed_at
}: Item) => {
  try {
    const response = await notion.pages.create(ntnDataBuilder({
      name,
      html_url,
      fork,
      description,
      language,
      archived,
      visibility,
      created_at,
      updated_at,
      pushed_at
    }))
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

export async function addNtnItem(
  { name,
    html_url,
    fork,
    description,
    language,
    archived,
    visibility,
    created_at,
    updated_at,
    pushed_at }: Item
) {

  setTimeout(async () => {
    await ntnWrite({
      name,
      html_url,
      fork,
      description,
      language,
      archived,
      visibility,
      created_at,
      updated_at,
      pushed_at
    });

  }, 3000);

}

export interface Item {
    name: string;
    html_url: string;
    fork: boolean;
    description: string;
    language: string;
    archived: boolean;
    visibility: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
};