
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