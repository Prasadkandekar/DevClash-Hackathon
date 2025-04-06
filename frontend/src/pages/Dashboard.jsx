import React from 'react';
import axios from 'axios';
import {
  Search,
  Bell,
  ChevronDown,
  Brain,
  Calendar,
  CheckCircle2,
  BookOpen,
  Trophy,
  Code,
  PlusCircle,
  ArrowUpRight,
  Trash2,
} from 'lucide-react';

import { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";

const client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67f196160019fd25c645");

const databases = new Databases(client);

function StatCard({ title, value, icon: Icon, bgColor = 'bg-purple-900/20' }) {
  return (
    <div className="bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-white/10">
      <div className={`${bgColor} p-3 rounded-full w-fit mb-4 shadow-md`}>
        <Icon className="text-purple-400 drop-shadow-md" size={24} />
      </div>
      <h3 className="text-white text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-white/90 mt-1">{value}</p>
    </div>
  );
}

function SectionCard({ title, children, className = '' }) {
  return (
    <div className={`bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-md ${className}`}>
      <h2 className="text-2xl font-bold text-purple-100 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Dashboard() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("https://dev-backend-nine.vercel.app/api/users/profile", {
          withCredentials: true, // if auth cookie is needed
          
        });
        setUserName(res.data.name);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const [resumeScore, setResumeScore] = useState(null);

    useEffect(() => {
      const fetchResumeScores = async () => {
          try {
              const res = await databases.listDocuments(
                  "67f1a9cd0035b3cf5d56", // databaseId
                  "67f1a9e8001271e67606" // collectionId
              );
              if (res.documents.length > 0) {
                const latestScore = res.documents[0].score; // Replace 'score' with your actual key
                setResumeScore(latestScore);
              }
          } catch (err) {
              console.error("Error fetching resume data:", err);
          } finally {
              setLoading(false);
          }
      };

      fetchResumeScores();
  }, []);

  


  const [tasks, setTasks] = useState([
    'Complete System Design lesson',
    'Solve 2 DSA problems',
    'Update portfolio website',
    'Apply to saved jobs',
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([newTask.trim(), ...tasks]);
      setNewTask('');
    }
  };

  const removeTask = (indexToRemove) => {
    setTasks(tasks.filter((_, i) => i !== indexToRemove));
  };

  return (
    

    <div className="min-h-screen bg-gradient-to-br from-[#0e0a1a] via-[#181225] to-[#0c0914] text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#181225]/80 to-[#0e0a1a]/80 backdrop-blur-lg border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
                👋 Welcome, Prasad!
              </h1>              
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Resume Score"
          value={resumeScore !== null ? `${resumeScore}%` : "N/A"}
          icon={Brain}
        />
          <StatCard title="Interviews Given" value="12" icon={Calendar} bgColor="bg-blue-900/20" />
          <StatCard title="Interview Score" value="74%" icon={Trophy} bgColor="bg-green-900/20" />
          <StatCard title="Courses Completed" value="8" icon={BookOpen} bgColor="bg-pink-900/20" />
        </div>

        {/* Main Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <SectionCard title="AI Interview Assistant">
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-900/30 rounded-full mb-4 shadow-lg">
                  <Brain className="text-purple-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Ready for your next interview?</h3>
                <p className="text-purple-200 mb-4">Your last score: 74%</p>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition">
                  Start Mock Interview
                </button>
              </div>
            </SectionCard>

            <SectionCard title="DSA Progress">
              <div className="space-y-4">
                {['Arrays', 'Strings', 'Trees', 'Dynamic Programming'].map((topic) => (
                  <div key={topic} className="flex items-center justify-between">
                    <span className="text-white">{topic}</span>
                    <div className="w-32 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-purple-500 rounded-full h-2"
                        style={{ width: Math.random() * 100 + '%' }}
                      ></div>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 text-purple-300 flex items-center justify-center gap-2 py-2 border border-purple-500 rounded-lg hover:bg-purple-500/20 transition">
                  <Code size={20} />
                  Practice Now
                </button>
              </div>
            </SectionCard>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <SectionCard title="Job Recommendations">
              <div className="space-y-4">
                {[
                  {
                    title: 'Senior Frontend Developer',
                    company: 'Google',
                    match: '95%',
                    location: 'Remote',
                  },
                  {
                    title: 'Full Stack Engineer',
                    company: 'Microsoft',
                    match: '88%',
                    location: 'Bangalore',
                  },
                ].map((job) => (
                  <div
                    key={job.title}
                    className="p-4 border border-white/10 rounded-xl hover:border-purple-400 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{job.title}</h3>
                        <p className="text-purple-300 text-sm">{job.company}</p>
                      </div>
                      <span className="bg-green-900/20 text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        {job.match} Match
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-purple-300 text-sm">{job.location}</span>
                      <button className="text-purple-300 hover:text-purple-400 flex items-center gap-1">
                        Apply <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Learning Path">
              <div className="space-y-4">
                {[
                  {
                    title: 'System Design Fundamentals',
                    platform: 'Coursera',
                    progress: '60%',
                  },
                  {
                    title: 'Advanced React Patterns',
                    platform: 'Udemy',
                    progress: '25%',
                  },
                ].map((course) => (
                  <div
                    key={course.title}
                    className="flex items-center gap-4 p-4 border border-white/10 rounded-xl"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{course.title}</h3>
                      <p className="text-purple-300 text-sm">{course.platform}</p>
                      <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-purple-500 rounded-full h-1.5"
                          style={{ width: course.progress }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <SectionCard title="Today's Goals">
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-400" size={20} />
                      <span className="text-white">{task}</span>
                    </div>
                    <button onClick={() => removeTask(index)} className="text-red-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    className="flex-1 bg-transparent border border-white/20 px-3 py-2 rounded-lg text-white placeholder-white/50 focus:outline-none"
                  />
                  <button
                    onClick={addTask}
                    className="flex items-center gap-2 text-purple-200 py-2 px-4 border border-white/20 rounded-lg hover:bg-white/10 transition"
                  >
                    <PlusCircle size={20} />
                    Add
                  </button>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="🧠 AI Tips for You">
              <div className="space-y-4">
                {[
                  'Add your recent project to GitHub',
                  'Your System Design skills need attention',
                  'Consider applying for Senior roles',
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <Brain className="text-purple-400 mt-1" size={16} />
                    <p className="text-purple-100 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;