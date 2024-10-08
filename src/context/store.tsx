"use client"
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react"

interface ContextProps {
    editorSavedState: string,
    setEditorSavedState: Dispatch<SetStateAction<string>>,
    pathName: string,
    setPathName: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    verifyPassword: string,
    setVerifyPassword: Dispatch<SetStateAction<string>>,
    mode: Mode,
    setMode : Dispatch<SetStateAction<Mode>>,
    receivedMode: ReceivedMode,
    setReceivedMode: Dispatch<SetStateAction<ReceivedMode>>,
}

type Mode = 'edit' | 'read';

type ReceivedMode = 0 | 1 | null;

const GlobalContext = createContext<ContextProps>({
    editorSavedState: "",
    setEditorSavedState: () => {},
    pathName: "",
    setPathName: () => {},
    password: "",
    setPassword: () => {},
    verifyPassword: "",
    setVerifyPassword: () => {},
    mode: 'edit',
    setMode: () => {},
    receivedMode: null,
    setReceivedMode: () => {},
});

export const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {
    const [editorSavedState, setEditorSavedState] = useState<string>('')
    const [pathName, setPathName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [verifyPassword, setVerifyPassword] = useState<string>('')
    const [mode, setMode] = useState<Mode>('edit')
    const [receivedMode, setReceivedMode] = useState<ReceivedMode>(null)

    return (
        <GlobalContext.Provider value={{editorSavedState, setEditorSavedState, pathName, setPathName, mode, setMode, password, setPassword, verifyPassword, setVerifyPassword, receivedMode, setReceivedMode}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext) as ContextProps;