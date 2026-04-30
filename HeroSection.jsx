import { useState, useEffect, useRef } from 'react';
import { useApp } from '../content/AppContext';
import { parseAItext } from '../utils/textParser';
import { STATE, AGE, CATEGORIES_BY_AGE, MOODS_BYAGE, LANGUAGEs } from '../constant';

function TypingDots() {
    return (
        <div className="chat-row bot-row">
            <div className="bot-avatar"><i className="bi bi-star" /></div>
            <div className="bubble bot-bubble">
                <div className="typing-dots"><span /><span /><span /></div>
            </div>
        </div>
    );
}

function SpecialContent({ content }) {
    const { addMsg, switchAge } = useApp();
    const [cats, setCats] = useState([]);
    const [langs, setLangs] = useState(['Any Language']);
    const { type } = content;

    if (type === 'mood-greeting') return(
        <div className="choice-row">
            {[['Great Day!','Having a Great day'],['Meh day','Just a meh day'],['rescue me!','I need a movie to rescue me!']]
            .map(([label, val]) => (
                <button key={val} className="choice-btn" onClick={() => content.onSelect(val)}>{label}</button>
            ))}
            {content.enableTyping && <button className="choice-btn type-btn" onClick={() => content.enableTyping}>Type</button>}
        </div>
    );

    if (type === 'age-picker') return (
        <div className="choice-row">
            {[[AGE.KIDS, 'Kids', 'Under 13'], [AGE.TEEN, 'Teen', '13-17'], [AGE.ADULT,'Adult', '18+']]
            .map(([age, label, sub]) => (
                <button key={age} className="choice-btn" onClick={() => content.onSelect(age)}>
                    {label} <span className="choice-sub">{sub}</span>
                </button>
            ))}
        </div>
    )
}