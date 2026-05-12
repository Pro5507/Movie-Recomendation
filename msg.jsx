function renderMsg(msg) {
    return (
        <ChatRow key={msg.id} msg={msg} onMovieClick={async title => {
            addMsg('user', `Tell me more about "${title}"`);
            setInputActive(false); setIsBotTyping(true);
            try{
                const [ai, direct] = await Promise.all([
                    callAIWithSearch(`Tell me about "${titile}" - description, why it's great, and 2 similar recomendations.`),
                ]);
                addMsg('bot', ai.reply || `"${title}" is a great pic!`);
                const strip = ai.movieResults?.length ? ai.movieResults : direct.slice(0, 6);
                if  (strip.length) addMsg('bot', {type: 'movie-strip', movies: strip});
            }catch { addMsg('bot', `Let me find "${title}" for you!`); }
            finally { setIsBotTyping(false); setInputActive(true);}
        }} />
    )
}