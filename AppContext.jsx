import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { STAGE, AGE } from '../constants';

const AppContext = createContext(null);
export function AppProvider({ children }) {

  const [theme, setTheme] = useState(() => localStorage.getItem('cv_theme') || 'dark');
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
    localStorage.setItem('cv_theme', theme);
  }, [theme]);

  const [userName, setUserName] = useState('');
  const [userAge,  setUserAge]  = useState(AGE.ADULT);
  const [stage,       setStage]       = useState(STAGE.NAME);
  const [chatMsgs,    setChatMsgs]    = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const msgCounter = useRef(0);
  const newId = () => `msg-${++msgCounter.current}`;
  const addMsg = useCallback((role, content) =>
    setChatMsgs(prev => [...prev, { id: newId(), role, content }]), []);

  const resetChat = useCallback(() => {
    setChatMsgs([]);
    setUserName('');
    setUserAge(AGE.ADULT);
    setIsBotTyping(false);
    setStage(STAGE.NAME);
  }, []);

  const value = {
    theme, setTheme,
    userName, setUserName,
    userAge,  setUserAge,
    stage, setStage,
    chatMsgs, setChatMsgs, addMsg,
    isBotTyping, setIsBotTyping,
    resetChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside <AppProvider>');
  return ctx;
}