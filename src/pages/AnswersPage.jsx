import React, { useState } from "react";
import { getAnswers } from "../services/api";

export default function AnswersPage() {
    const [documentsText, setDocumentsText] = useState("");
    const [questionsText, setQuestionsText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // will hold { raw, items }
    const [error, setError] = useState(null);

    const parseDocuments = (text) => {
        try {
            const parsed = JSON.parse(text);
            if (Array.isArray(parsed)) return parsed;
            return [String(parsed)];
        } catch {
            const parts = text.split(/\n-{3,}\n|---+/).map(s => s.trim()).filter(Boolean);
            return parts.length ? parts : (text ? [text] : []);
        }
    };

    const parseQuestions = (text) =>
        text
            .split(/\r?\n/)
            .map(s => s.trim())
            .filter(Boolean);

    const normalizeResponse = (payload) => {
        // payload might be: array, {answers: [...]}, {data: [...]}, {result: [...]}, {answer: "..."}, plain string, etc.
        if (!payload && payload !== 0) return [];
        if (Array.isArray(payload)) return payload;
        if (payload.answers && Array.isArray(payload.answers)) return payload.answers;
        if (payload.data && Array.isArray(payload.data)) return payload.data;
        if (payload.result && Array.isArray(payload.result)) return payload.result;
        if (payload.output && Array.isArray(payload.output)) return payload.output;
        // If it's an object whose keys map to questions, return entries
        if (typeof payload === "object") {
            // common single-answer shape
            if (typeof payload.answer === "string") return [payload.answer];
            // try to flatten string values
            const vals = Object.values(payload).filter(v => v !== undefined);
            if (vals.length) return vals;
        }
        // fallback: return the value as single-item array
        return [payload];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        const documents = parseDocuments(documentsText);
        const questions = parseQuestions(questionsText);
        if (!questions.length) {
            setError("Provide at least one question (one per line).");
            return;
        }

        setLoading(true);
        try {
            const resp = await getAnswers(documents, questions);
            // debug: open console and inspect network / response shape
            console.log("raw axios response:", resp);
            const payload = resp?.data ?? resp;
            console.log("payload:", payload);

            const items = normalizeResponse(payload);
            setResult({ raw: payload, items, questions });
        } catch (err) {
            console.error("fetch error:", err);
            setError(err?.response?.data || err?.message || "Request failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
            <h2>Answer Fetcher</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 6 }}>Documents</label>
                <textarea
                    value={documentsText}
                    onChange={(e) => setDocumentsText(e.target.value)}
                    placeholder="Paste document(s) here. Use JSON array, or separate multiple documents with --- on its own line."
                    rows={8}
                    style={{ width: "100%", marginBottom: 12 }}
                />

                <label style={{ display: "block", marginBottom: 6 }}>Questions (one per line)</label>
                <textarea
                    value={questionsText}
                    onChange={(e) => setQuestionsText(e.target.value)}
                    placeholder="Enter one question per line"
                    rows={4}
                    style={{ width: "100%", marginBottom: 12 }}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Fetching answers..." : "Get Answers"}
                </button>
            </form>

            {error && (
                <div style={{ color: "crimson", marginBottom: 12 }}>
                    {typeof error === "string" ? error : JSON.stringify(error)}
                </div>
            )}

            {result && (
                <section>
                    <h3>Results</h3>

                    <div style={{ marginBottom: 12 }}>
                        <strong>Raw response (inspect in console for more):</strong>
                        <pre style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>{JSON.stringify(result.raw, null, 2)}</pre>
                    </div>

                    <div>
                        <strong>Normalized Answers</strong>
                        {result.items.length === 0 && <div>No answers found in response.</div>}
                        {result.items.map((item, i) => (
                            <div key={i} style={{ marginBottom: 12, padding: 10, border: "1px solid #ddd" }}>
                                <div style={{ fontWeight: 600 }}>
                                    {result.questions && result.questions[i] ? `Q: ${result.questions[i]}` : `Item ${i + 1}`}
                                </div>
                                <div style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>
                                    {typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}