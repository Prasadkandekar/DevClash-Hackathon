import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { Client, Databases, ID } from "appwrite";

const client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1") // 🟡 Change if self-hosted
    .setProject("67f196160019fd25c645"); // 🔵 Replace with your Appwrite project ID

const databases = new Databases(client);

const AnalyzeResume = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resumeScore, setResumeScore] = useState(0);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setError("");
    };

    const handleSubmit = async () => {
        if (!file) {
            setError("❌ Please upload a resume first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("job_description", jobDescription);

        setLoading(true);
        setAnalysis("");
        setError("");

        try {
            const response = await axios.post("https://dev-clash.onrender.com/analyze-resume/", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            const aiAnalysis = response.data.analysis;
            const aiScore = response.data.score || 85; // 🟡 fallback if not returned

            setAnalysis(aiAnalysis);
            setResumeScore(aiScore);

            // ✅ Save to Appwrite Database
            await databases.createDocument(
                "67f1a9cd0035b3cf5d56", // 🔵 Replace with your database ID
                "67f1a9e8001271e67606", // 🔵 Replace with your collection ID
                ID.unique(),
                {
                    filename: file.name,
                    score: aiScore,
                }
            );

        } catch (error) {
            console.error("Error analyzing resume:", error);
            setError("❌ Failed to analyze the resume. Please try again.");
        }

        setLoading(false);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4",
        });

        const marginLeft = 40;
        const marginTop = 40;
        const maxWidth = 500;
        const lines = doc.splitTextToSize(analysis, maxWidth);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(lines, marginLeft, marginTop);
        doc.save("Resume_Analysis_Report.pdf");
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h2 className="text-4xl font-bold text-neon-cyan text-center mb-10">
                📄 Resume Analyzer
            </h2>

            <div className="max-w-3xl mx-auto bg-[#0f0f1a] border border-[#2e1647] p-8 rounded-3xl shadow-xl">
                {error && (
                    <div className="bg-red-800 text-red-300 px-4 py-2 rounded mb-4 border border-red-500 font-medium">
                        {error}
                    </div>
                )}

                {/* File Upload */}
                <label className="w-full flex flex-col items-center justify-center gap-2 p-6 bg-[#1e1e2f] border-2 border-dashed border-cyan-500 rounded-xl mb-4 cursor-pointer hover:shadow-neon-cyan transition">
                    <span className="text-5xl animate-bounce">📁</span>
                    <span className="text-sm text-gray-400">
                        {file ? file.name : "Click or Drag & Drop PDF Resume"}
                    </span>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {/* JD Input */}
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste Job Description (Optional)"
                    className="w-full h-32 p-4 bg-[#1e1e2f] border border-[#2e1647] rounded-lg mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                ></textarea>

                {/* Analyze Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full text-lg px-5 py-3 rounded-xl font-bold tracking-wide shadow-lg transition-all bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-cyan-500 hover:to-purple-500 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? "🔄 Analyzing..." : "🚀 Analyze Resume"}
                </button>

                {/* Loader */}
                {loading && (
                    <div className="flex items-center gap-2 mt-3 text-gray-400">
                        <span className="animate-spin h-5 w-5 border-2 border-t-cyan-400 border-gray-600 rounded-full"></span>
                        <span>Analyzing your resume...</span>
                    </div>
                )}

                {/* Analysis Result */}
                {analysis && (
                    <div className="mt-8 bg-[#1b1b2d] border border-cyan-500 p-6 rounded-xl shadow-inner">
                        <h3 className="text-2xl font-semibold mb-4 text-neon-purple">🧠 AI Analysis Report</h3>
                        <pre className="whitespace-pre-wrap text-gray-200 text-sm mb-2">{analysis}</pre>
                        <p className="text-sm text-cyan-300">
                            ✅ Confidence Score: <span className="text-green-400 font-semibold">85%</span>
                        </p>

                        <button
                            onClick={handleDownloadPDF}
                            disabled={!analysis}
                            className={`mt-4 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                                analysis
                                    ? "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-teal-500 hover:to-green-500"
                                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            ⬇️ Download PDF Report
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyzeResume;