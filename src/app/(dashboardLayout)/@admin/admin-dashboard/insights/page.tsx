"use client";
import { useEffect, useState } from "react";
import { aiApi } from "@/lib/ai-api";

interface Insight {
    insight: string;
    suggestion: string;
}

interface Anomaly {
    label: string;
    issue: string;
    severity: "low" | "medium" | "high";
}

const severityColor = {
    low: "bg-yellow-100 text-yellow-700",
    medium: "bg-orange-100 text-orange-700",
    high: "bg-red-100 text-red-700",
};

export default function AIInsightsPage() {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                // Backend নিজেই DB থেকে সব data আনে
                const insightData = await aiApi.dashboardInsights();
                console.log("Insight response:", insightData);

                // Stats থেকে anomaly data তৈরি করো
                const anomalyData = await aiApi.anomalyDetection(
                    (insightData.stats?.revenueByMonth || []).map(
                        (r: { month: string; revenue: number }) => ({
                            label: r.month,
                            value: r.revenue,
                        })
                    )
                );
                console.log("Anomaly response:", anomalyData);

                setInsights(insightData.insights || []);
                setAnomalies(anomalyData.anomalies || []);
            } catch (err) {
                console.error("Error fetching AI insights:", err);
                setError("Failed to load AI insights. Please check API connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, []);

    if (error) {
        return (
            <div className="p-8 space-y-2">
                <p className="text-red-500 font-semibold">❌ {error}</p>
                <p className="text-sm text-gray-400">
                    API URL: {process.env.NEXT_PUBLIC_API_URL || "undefined - .env.local check করো"}
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="animate-pulse p-6 space-y-8">
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-6" />
                <div className="space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                    <div className="grid md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold">🤖 AI Dashboard Insights</h1>

            {/* Business Insights */}
            <section>
                <h2 className="text-lg font-semibold mb-3">📊 Business Insights</h2>
                {insights.length === 0 ? (
                    <p className="text-gray-400 text-sm">No insights available</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {insights.map((ins, i) => (
                            <div
                                key={i}
                                className="border rounded-xl p-4 dark:bg-gray-800 shadow-sm"
                            >
                                <p className="font-medium">{ins.insight}</p>
                                <p className="text-sm text-blue-500 mt-2">💡 {ins.suggestion}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Anomaly Detection */}
            <section>
                <h2 className="text-lg font-semibold mb-3">⚠️ Anomaly Detection</h2>
                {anomalies.length === 0 ? (
                    <p className="text-green-500">✅ No anomalies detected</p>
                ) : (
                    <div className="space-y-2">
                        {anomalies.map((a, i) => (
                            <div
                                key={i}
                                className={`rounded-xl p-3 flex items-center gap-3 ${severityColor[a.severity]}`}
                            >
                                <span className="font-bold">{a.label}</span>
                                <span>{a.issue}</span>
                                <span className="ml-auto text-xs uppercase font-bold">
                                    {a.severity}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}