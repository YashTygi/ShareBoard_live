"use client";
import dynamic from 'next/dynamic'
import React, { useEffect, useState, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import QuillToolbar, { modules, formats } from './plugins/EditorToolbarPlugin';
//@ts-ignore
import ReactQuill from 'react-quill';
import { useGlobalContext } from '@/context/store';
import './editor.css';
import ReadEditModeButton from '../ReadEditModeButton/ReadEditModeButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDebounce from '@/hooks/useDebounce';

type Props = {
  initialEditorState: string;
  initialMode: boolean;
  hasPassword: boolean;
  slug: string;
  onContentChange?: (content: string) => void;
}

const Editor: React.FC<Props> = ({ initialEditorState, initialMode, hasPassword, slug, onContentChange }) => {
  const [editorValue, setEditorValue] = useState<string>(initialEditorState);
  const [currentMode, setCurrentMode] = useState<boolean>(initialMode);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const debouncedEditorValue = useDebounce(editorValue, 500);

  const quillRef = useRef<ReactQuill>(null);

  const readNotify = () => toast("📖 Switched to Read Mode");
  const editNotify = () => toast("📝 Switched to Edit Mode");

  useEffect(() => {
    if (hasFetched && onContentChange) {
      onContentChange(debouncedEditorValue);
    }
  }, [debouncedEditorValue, onContentChange, hasFetched]);

  const handleEditorChange = (content: string) => {
    setEditorValue(content);
  };

  useEffect(() => {
    if (initialEditorState !== undefined) {
      setEditorValue(initialEditorState);
      setHasFetched(true); 
    }
  }, [initialEditorState]);

  const handleModeChange = (newMode: boolean) => {
    setCurrentMode(newMode);
    if (newMode) {
      readNotify();
    } else {
      editNotify();
    }
  };

  return (
    <div className="editor">
      <div className="editor_content_container">
        <QuillToolbar />
        <ReactQuill
          ref={quillRef}
          modules={modules}
          formats={formats}
          placeholder={"Write something awesome..."}
          theme="snow"
          value={editorValue}
          onChange={handleEditorChange}
          readOnly={currentMode}
        />
      </div>
      <ToastContainer />
      <div className='editor_btn'>
      <ReadEditModeButton 
  initialMode={currentMode} 
  slug={slug} 
  onModeChange={handleModeChange} 
  hasPassword={hasPassword} 
/>
      </div>
    </div>
  );
}

export default Editor;