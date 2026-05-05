"use client";
import { useEffect, useState } from "react";
import { useLocalBehavior } from "@/hooks/useLocalBehavior";
import { aiApi } from "@/lib/ai-api";

interface Rec { title: string; reason: string; }

export default function AIRecommendations({ context }: { context: string }) {
    const { behavior } = useLocalBehavior();
    const [recs, setRecs] = useState<Rec[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!behavior.viewedItems.length && !behavior.searchHistory.length) {
            setLoading(false);
            return;
        }
        aiApi.recommendations(behavior.viewedItems, behavior.searchHistory).then((data) => {
            setRecs(data.recommendations || []);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="animate-pulse h-32 bg-gray-200 rounded-xl" />;
    if (!recs.length) return null;

    return (
        <section className="my-8">
            <h2 className="text-xl font-bold mb-4">✨ Recommended for You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recs.map((r, i) => (
                    <div key={i} className="border rounded-xl p-4 dark:bg-gray-800">
                        <h3 className="font-semibold">{r.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{r.reason}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}