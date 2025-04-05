import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "☁️",
    title: "Learn DSA",
    description: "Enhance your skills with personalized learning paths",
  },
  {
    icon: "🕸️",
    title: "Resume Analyser",
    description: "Get instant feedback on your resume and Improve ATS Score",
  },
  {
    icon: "📱",
    title: "Interactive TO-DO",
    description: "Capture ideas on the go, online or offline",
  },
  {
    icon: "🔒",
    title: "Unlock Dream Jobs",
    description: "Get personalized job recommendations based on your skills",
    
  },
  {
    icon: "📅",
    title: "Personalized Planner",
    description: "Stay Organized with a Personalized planner",
  },
  {
    icon: "🚀",
    title: "Mock Interviews",
    description: "Anayse your performance with AI-driven feedback and Get Full Report", 
  },
  {
    icon: "📥",
    title: "Course Recommendations",
    description: "Get personalized course recommendations based on your skills",
    
  },
  {
    icon: "🔍",
    title: "Frictionless search",
    description: "Easily recall and index past notes and ideas",
  },
];

const FeaturesGrid = () => {
  return (
    <div className="min-h-screen bg-[#0a0812] text-white p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-[#14101d] p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300"
            whileHover={{
              scale: 1.07,
              rotateX: 5,
              rotateY: -5,
              boxShadow: "0px 20px 50px rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-125">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;
