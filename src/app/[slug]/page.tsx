'use client';

import { useEffect, useState, useCallback } from 'react';
import Editor from '@/components/editor/page';
import { GlobalContextProvider } from '@/context/store';
import { useParams } from 'next/navigation';

export default function EditorPage() {
  const { slug } = useParams();
  const singleSlug = Array.isArray(slug) ? slug[0] : slug;
  const [initialEditorState, setInitialEditorState] = useState<string | null>(null);
  const [initialMode, setInitialMode] = useState<boolean>(false);
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (singleSlug) {
        const response = await fetch(`/api/pages?pathName=${singleSlug}`);
        const data = await response.json();
        if (data.success && data.data) {
          setInitialEditorState(data.data.editorSavedState);
          setInitialMode(data.data.read === 1);
          setHasPassword(!!data.data.password);
        } else {
          setInitialEditorState('');
          setInitialMode(false);
          setHasPassword(false);
        }
      }
    };
  
    fetchPage();
  }, [singleSlug]);
  
  const handleContentChange = useCallback((content: string) => {
    if (singleSlug) {
      fetch('/api/pages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pathName: singleSlug, editorSavedState: content }),
      });
    }
  }, [singleSlug]);

  if (initialEditorState === null) {
    return <div>Loading...</div>; 
  }

  return (
    <GlobalContextProvider>
      <Editor 
        initialEditorState={initialEditorState}
        initialMode={initialMode}
        hasPassword={hasPassword}
        slug={singleSlug || ''}
        onContentChange={handleContentChange}
      />
    </GlobalContextProvider>
  );
}