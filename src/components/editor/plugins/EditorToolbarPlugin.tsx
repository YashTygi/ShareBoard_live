import React from 'react';
// @ts-ignore
import { Quill } from "react-quill";
import './EditorToolbar.css';
import { 
    CustomUndoIcon, 
    CustomRedoIcon,
 } from "./EditorCustomIcon";
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';
import MagicUrl from 'quill-magic-url'
import QuillCursors from 'quill-cursors';
// @ts-ignore
import { ImageDrop } from 'quill-image-drop-module';
import imageCompressor from 'quill-image-compress';



function undoChange() {
  // @ts-ignore
    this.quill.history.undo();
  }
  function redoChange() {
    // @ts-ignore
    this.quill.history.redo();
  }


  const Size = Quill.import("formats/size") as any;
  Size.whitelist = ["extra-small", "small", "medium", "large"];
  Quill.register(Size, true);

  Quill.register('modules/imageResize', ImageResize);

  Quill.register('modules/magicUrl', MagicUrl)

  Quill.register('modules/cursors', QuillCursors);

  Quill.register('modules/imageDrop', ImageDrop);

  Quill.register('modules/imageCompress', imageCompressor);

//   const Font = Quill.import("formats/font") as any;
// Font.whitelist = 
// Quill.register(Font, true);





export const modules = {
    toolbar: {
      container: "#toolbar",
      syntax: true,
      history: [{ delay: 10 }, { maxStack: 100 }, { userOnly: true }],
      handlers: {
        undo: undoChange,
        redo: redoChange
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],
      handleStyles: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '50%',
        cursor: 'nesw-resize',
    },
    },imageCompress: {
      quality: 0.5, // default
      maxWidth: 1000, // default
      maxHeight: 1000, // default
      imageType: 'image/jpeg', // default
      debug: true, // default
      suppressErrorLogging: false, // default
      insertIntoEditor: undefined, // default
    },
    magicUrl: true,
    cursors: true,
    imageDrop: true,
    keyboard: {
      bindings: {
        removeCodeBlock: {
          key: 'Backspace',
          collapsed: true,
          format: ['code-block'],
          offset: 0,
          handler: function(range: any, context: any, editor: any) {
            if (context.format['code-block']) {
              editor.getEditor().format('code-block', false);
            }
          }.bind(null, null, this)
        }
      }
    }
}

  export const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "link",
    "image",
    "color",
    "code-block"
  ];

  formats.forEach(format => {
    if (!Quill.import(`formats/${format}`)) {
      console.warn(`Format '${format}' is not registered. Skipping.`);
    }
  });

  
  export const QuillToolbar = () => (
    <div id="toolbar">

      <button type="button" className="ql-bold ql-btn" title="Bold"></button>
      <button type="button" className="ql-italic ql-btn" title="Italic"></button>
      <button type="button" className="ql-underline ql-btn" title="Underline" />
      <button type="button" className="ql-strike ql-btn" title="Strike" />
      <button type="button" className="ql-header" value="1" title="Heading" />
      <button type="button" className="ql-header" value="2" title="Subheading" />
      <button type="button" className="ql-list" value="ordered" title="Ordered list" />
      <button type="button" className="ql-list" value="bullet" title="Bullet list" />
      <button type="button" className="ql-image" title="Insert image"></button>
      <button type="button" className="ql-video" title="Insert video" />
      <button type="button" className="ql-blockquote" title="Block quote" />
      <button type="button" className="ql-code-block" title="Insert code block" />
      <button className="ql-undo" type="button" title="Undo changes">
        <CustomUndoIcon />
      </button>
      <button className="ql-redo" type="button" title="Redo changes">
        <CustomRedoIcon />
      </button>
  </div>

  );
  
  export default QuillToolbar;

