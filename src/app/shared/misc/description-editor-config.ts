import { EditorConfig } from "@ckeditor/ckeditor5-core";

export const descriptionEditorConfig: EditorConfig = {
  toolbar: {
    items: [
      'bold',
      'underline',
      'italic',
      {
        label: 'Mehr',
        icon: 'text',
        items: [
          'strikethrough',
          'superscript',
          'subscript'
        ]
      },

      '|',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'horizontalLine',
      '|',
      {
        label: 'Mehr',
        icon: 'alignLeft',
        items: [
          'alignment',
          'outdent',
          'indent'
        ]
      },
      '|',
      'undo',
      'redo',
      '|',
      {
        label: 'Mehr',
        icon: 'threeVerticalDots',
        items: [
          'selectAll',
          'showBlocks',
          'sourceEditing'
        ]
      }
    ]
  }
};