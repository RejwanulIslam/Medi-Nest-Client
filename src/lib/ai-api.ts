// src/lib/ai-api.ts
const BASE = process.env.NEXT_PUBLIC_API_URL || "https://medi-nest-server-beta.vercel.app";

export const aiApi = {
  // RAG Chatbot
  chat: async (message: string, history: object[]) => {
    const res = await fetch(`${BASE}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    return res.json();
  },

  // Vector Search Suggestions
  searchSuggestions: async (query: string) => {
    const res = await fetch(`${BASE}/api/ai/search-suggestions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    return res.json();
  },

  // Vector Recommendations
  recommendations: async (
    viewedItems: string[],
    searchHistory: string[]
  ) => {
    const res = await fetch(`${BASE}/api/ai/recommendations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ viewedItems, searchHistory }),
    });
    return res.json();
  },

  // Dashboard Insights (Real DB Data)
  dashboardInsights: async () => {
    const res = await fetch(`${BASE}/api/ai/dashboard-insights`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    return res.json();
  },

  // Anomaly Detection
  anomalyDetection: async (data: { label: string; value: number }[]) => {
    const res = await fetch(`${BASE}/api/ai/anomaly-detection`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    return res.json();
  },
};