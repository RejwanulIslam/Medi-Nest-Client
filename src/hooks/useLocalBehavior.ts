"use client";
import { useEffect, useState } from "react";

interface Behavior {
    viewedItems: string[];
    searchHistory: string[];
}

export function useLocalBehavior() {
    const [behavior, setBehavior] = useState<Behavior>({
        viewedItems: [],
        searchHistory: [],
    });

    useEffect(() => {
        const stored = localStorage.getItem("userBehavior");
        if (stored) setBehavior(JSON.parse(stored));
    }, []);

    const addViewed = (item: string) => {
        setBehavior((prev) => {
            const updated = {
                ...prev,
                viewedItems: [...new Set([item, ...prev.viewedItems])].slice(0, 10),
            };
            localStorage.setItem("userBehavior", JSON.stringify(updated));
            return updated;
        });
    };

    const addSearch = (query: string) => {
        setBehavior((prev) => {
            const updated = {
                ...prev,
                searchHistory: [...new Set([query, ...prev.searchHistory])].slice(0, 10),
            };
            localStorage.setItem("userBehavior", JSON.stringify(updated));
            return updated;
        });
    };

    return { behavior, addViewed, addSearch };
}