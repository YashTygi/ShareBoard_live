'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { filterExistingURL, limitedPermutationGenerator } from '@/utils';
import styles from './page.module.css';

const NotFound = () => {
    const pathname = usePathname();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function generateSuggestions() {
        const segments = pathname.split('/').filter(Boolean);

        if (segments.length > 0) {
            const combinations = limitedPermutationGenerator(segments, 6);  
            const filteredCombinations = await filterExistingURL(combinations);
            setSuggestions(filteredCombinations.slice(0, 6));  
        }

        setLoading(false);
    }

    useEffect(() => {
        generateSuggestions();
    }, [pathname]);

    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Uh-oh! It seems you’ve traveled some extra <span className={styles.italic}>slashes</span></h1>
        <p className={styles.text}>Oops! The page &quot;{pathname}&quot; does not exist.</p> {/* Escaped quotes */}
        
        {loading ? (
            <p className={styles.text}>Loading suggestions...</p>
        ) : (
            suggestions.length > 0 ? (
                <div>
                    <h3 className={styles.suggestionTitle}>Let&apos;s drive you back:</h3>
                    <ul className={styles.suggestionList}>
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className={styles.suggestionItem}>
                                <a href={`/${suggestion}`} className={styles.suggestionLink}>
                                    shareboard.live/{suggestion}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className={styles.text}>No suggestions available.</p>
            )
        )}
    </div>
);
};

export default NotFound;