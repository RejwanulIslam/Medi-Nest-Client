"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocalBehavior } from "@/hooks/useLocalBehavior";
import { aiApi } from "@/lib/ai-api";

export default function AISearchBar({ context }: { context: string }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [show, setShow] = useState(false);
    const debouncedQuery = useDebounce(query, 500);
    const { addSearch } = useLocalBehavior();

    useEffect(() => {
        if (debouncedQuery.length < 3) { setSuggestions([]); return; }
        aiApi.searchSuggestions(debouncedQuery)
            .then((data) => {
                setSuggestions(data.suggestions || []);
                setShow(true);
            })
            .catch(() => setSuggestions([]));
    }, [debouncedQuery]);

    return (
        <div className="relative w-full max-w-xl">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => setTimeout(() => setShow(false), 200)}
                placeholder="Search..."
                className="w-full border rounded-xl px-4 py-2 dark:bg-gray-800"
            />
            {show && suggestions.length > 0 && (
                <ul className="absolute top-full mt-1 w-full bg-white dark:bg-gray-900 border rounded-xl shadow-lg z-50">
                    {suggestions.map((s, i) => (
                        <li
                            key={i}
                            onClick={() => { setQuery(s); addSearch(s); setShow(false); }}
                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                        >
                            🔍 {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}