'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { GlobalContextProvider } from '@/context/store';
import Loading from './loading';

const Editor = dynamic(() => import('@/components/editor/page'), { ssr: false });



export default function EditorPage({ initialData }: { initialData: any }) {
  const [initialEditorState] = useState<string>(initialData.editorSavedState || '');
  const [initialMode] = useState<boolean>(initialData.read === 1);
  const [hasPassword] = useState(!!initialData.password);

  const handleContentChange = useCallback((content: string) => {
    fetch('/api/pages', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pathName: initialData.pathName, editorSavedState: content }),
    });
  }, [initialData.pathName]);

  if (!initialData) {
    return <Loading />; 
  }

  return (
    <GlobalContextProvider>
      <Editor 
        initialEditorState={initialEditorState}
        initialMode={initialMode}
        hasPassword={hasPassword}
        slug={initialData.pathName}
        onContentChange={handleContentChange}
      />
    </GlobalContextProvider>
  );
}