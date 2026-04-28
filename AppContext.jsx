import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { STAGE, AGE} from '../constants';

const AppContext = createContext(null);
export function AppProvider({children}) {
    const [theme, setTheme] = useState(() => localStorage.getItem('cv_theme') || 'dark');
    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-mode' : '';
        localStorage.setItem('cv_theme', theme);
    }, [theme]);

    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState(AGE.ADULT);

    const [stage, setStage] = useStage(STAGE.NAME);
    const [chatMsgs, setChatMsgs] = useState([]);
    const [isBotTyping, setIsBotTyping] = useState(False);
}