// ====== 1. InterviewResultsPage.jsx (Frontend) ======
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function InterviewResultsPage() {
  const [searchParams] = useSearchParams();
  const interviewId = searchParams.get("interviewId");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!interviewId || !/^[a-f\d]{24}$/i.test(interviewId)) {
      setError("Invalid or missing interview ID.");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/interview/${interviewId}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error("Interview not found.");
          throw new Error("Failed to fetch interview data");
        }
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, [interviewId]);

  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!data) return <div className="p-6 text-center text-gray-700">Loading interview results...</div>;

  const categories = ["communication", "technical", "problemSolving", "confidence", "clarity"];

  const averageScore = (field) => {
    const scores = data.responses
      .map((f) => f?.scores?.[field])
      .filter((v) => typeof v === "number");
    return scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0";
  };

  const overallAvg = (() => {
    const valid = data.responses.filter((r) => r?.scores);
    const total = valid.reduce((acc, r) => {
      const s = r.scores || {};
      return acc + (s.communication || 0) + (s.technical || 0) + (s.problemSolving || 0) + (s.confidence || 0) + (s.clarity || 0);
    }, 0);
    return valid.length ? (total / (valid.length * 5)).toFixed(1) : "0";
  })();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Interview Results for {data.role || "Role"} @ {data.company || "Company"}
      </h1>

      <Card>
        <CardHeader><CardTitle>Overall Interview Score</CardTitle></CardHeader>
        <CardContent>
          <Progress value={Number(overallAvg)} />
          <p className="text-sm text-gray-600 mt-2">{overallAvg} / 10</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Category-wise Averages</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {categories.map((cat) => {
            const avg = averageScore(cat);
            return (
              <div key={cat}>
                <p className="capitalize font-semibold">{cat}</p>
                <Progress value={Number(avg)} />
                <p className="text-sm text-gray-600">{avg} / 10</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {data.responses.map((f, idx) => (
        <Card key={idx}>
          <CardHeader><CardTitle>Question {idx + 1}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Q:</strong> {f.question}</p>
            <p><strong>Your Answer:</strong> {f.answer}</p>
            <p><strong>AI Feedback:</strong> {f.feedback || "N/A"}</p>
            <p><strong>Insights:</strong> {f.insights || "N/A"}</p>
            <p><strong>Recommendation:</strong> {f.recommendation || "N/A"}</p>

            {f.scores && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(f.scores).map(([key, value]) => (
                  <div key={key}>
                    <p className="capitalize">{key}</p>
                    <Progress value={Number(value) || 0} />
                    <p className="text-sm text-gray-600">{value} / 10</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}