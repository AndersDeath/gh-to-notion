
import { Client } from '@notionhq/client';
export const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

export const ntnTitleField = (name: string): any => {
    return {
      title:[
        {
          "text": {
            "content": name,
          }
        }
      ]
    }
  }
  
  export const ntnUrlField = (url: string): any => {
    return {
      type: 'url',
      url: url
    }
  }
  
  export const ntnRichTextField = (content: string, byDefault: string): any => {
    return {
      rich_text: [
          {
          type: 'text',
          text: {
              content:  content || byDefault
          }
      }
      ]
    } 
  }
  
  export const ntnMultiSelectItem = (content, byDefault) => {
     return  {
          name: content || byDefault
      }
  }
  
  export const ntnMultiSelectField = (elements: any[]): any => {
    return {
      type:'multi_select',
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


  export async function addNtnItem(
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
) {
    try {
        const response = await notion.pages.create({
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
        })
        console.log(response)
        console.log("Success! Entry added.")
    } catch (error) {
        console.error(error.body)
    }
}
