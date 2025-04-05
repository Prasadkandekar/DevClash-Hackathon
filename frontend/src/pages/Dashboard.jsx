import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-10">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-neon-cyan">👋 Welcome back, Pravin!</h1>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Resume Score" value="82%" />
        <StatCard title="Job Matches" value="12" />
        <StatCard title="DSA Progress" value="65%" />
        <StatCard title="Mock Interview Score" value="74%" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume Analyzer */}
        <DashboardCard title="📄 Resume Analyzer" theme="purple">
          <p className="text-gray-300 mb-4">Your resume is optimized at 82%.</p>
          <button className="btn-gradient">Analyze Again</button>
        </DashboardCard>

        {/* Job Recommendations */}
        <DashboardCard title="💼 Job Recommendations" theme="cyan" span={2}>
          <ul className="space-y-3">
            {["Frontend Developer at Google", "React Intern at Microsoft", "Full Stack at Razorpay"].map((job, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-gray-200">{job}</span>
                <button className="text-sm btn-gradient px-3 py-1">Apply</button>
              </li>
            ))}
          </ul>
        </DashboardCard>

        {/* Learning Path */}
        <DashboardCard title="🧠 Personalized Learning Path" theme="purple" span={2}>
          <p className="text-gray-300 mb-4">We curated your learning path using Coursera/Udemy:</p>
          <ul className="space-y-2 list-disc list-inside text-gray-200">
            <li>DSA Crash Course</li>
            <li>System Design Basics</li>
            <li>Resume Writing Workshop</li>
            <li>Advanced React Projects</li>
          </ul>
        </DashboardCard>

        {/* Calendar */}
        <DashboardCard title="🗓️ Calendar" theme="cyan">
          <p className="text-gray-400">Your upcoming tasks will appear here.</p>
        </DashboardCard>

        {/* DSA Progress Tracker */}
        <DashboardCard title="📊 DSA Progress Tracker" theme="purple">
          <ul className="text-gray-300 space-y-2">
            <li>Arrays ✅</li>
            <li>Strings ✅</li>
            <li>Recursion ⏳</li>
            <li>Trees ❌</li>
          </ul>
        </DashboardCard>

        {/* Todo List */}
        <DashboardCard title="✅ Daily Checklist" theme="cyan">
          <ul className="space-y-2 text-gray-300">
            <li>🎯 Solve 2 DSA problems</li>
            <li>📝 Update Resume</li>
            <li>🎙️ Attempt Mock Interview</li>
          </ul>
        </DashboardCard>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#1b1b2d] border border-[#2e1647] p-5 rounded-3xl shadow-md text-center hover:shadow-neon-cyan transition-all">
      <h3 className="text-md text-gray-400">{title}</h3>
      <p className="text-3xl font-bold text-cyan-400">{value}</p>
    </div>
  );
}

function DashboardCard({ title, children, theme = "cyan", span = 1 }) {
  const themeClass = theme === "purple" ? "text-neon-purple border-[#5b2677]" : "text-neon-cyan border-[#2e1647]";
  return (
    <div className={`bg-[#1b1b2d] border p-6 rounded-3xl shadow-xl col-span-${span} ${themeClass}`}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}