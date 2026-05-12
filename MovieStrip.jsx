import { useState, useEffect, useRef } from 'react';
import { ombdDetails } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function MovieStripe({ movies }) {
    const { openMovie } = useApp();
    const scrollRef = useRef(null);
    const detailesRef = useRef({});
    const [clickingId, setClickingId] = useState(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);
    const validMovies = movies.filter(m => m.Poster && m.Poster !== 'N/A');
    
    useEffect(() => {
        validMovies.forEach(movie => {
            if (movie.imdbID && !detailesRef.current[movie.imdbID])
                detailesRef.current[movie.imdbID] = omdbDetails(movie.imdbID).catch(() => null);
        });
    }; []);
    const handleClick = async (movie) => {
        if (clickingId) return;
        setClickingId(movie.imdbID);
        const deails = await (detailesRef.current[movie.imdbID])
    }
}