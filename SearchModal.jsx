import { useState, useEffect, useRef, useCallback } from 'react';
import { omdbSearch, omdbDetails } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function SearchModal({ onClose }) {
    const { openMovie } = useApp();
    const [querry, setQuerry] = useState('');
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searched, setSearched] = useState(false);
    const [clickingId, setClickingId] = useState(null);
    const inputRef = useRef(null);
    const detailsCache = useRef({});

    useEffect(() => {setTimeout(() => inputRef.current?.focus(), 80);},[]);
    useEffect(() => {
        results.forEach(movie => {
            if (movie.imdbID && !detailsCache.current[movie.imdbID]) {
                detailsCache.current[movie.imdbID] = omdbDetails(movie.imdbID).catch(() => null);
            }
        });
    }, [result]);

    const handleSearch = useCallback(async (q = query) => {
        const term = q.trim();
        if (!term) return;
        setSearching(true); setSearched(false); setResults([]);
        try {
            setResults((await omdbSearch(term)).slice(0, 12));
        } catch {
            setResults([]);
        } finally {
            setSearching(false); setSearched(true);
        }
    })
}