import React, { useState } from 'react';
import { Shield, Code, Award, Users, Clock, Cpu, ExternalLink, Bell, BellOff } from 'lucide-react';

const CodingPlatform = ({ name, icon, description, contestCount, userCount, primaryColor, url }) => {
  const [showContest, setShowContest] = useState(false);
  const [notified, setNotified] = useState(false);
  
  const handleNotify = () => {
    setNotified(!notified);
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-700">
      <div className="h-2" style={{ backgroundColor: primaryColor }}></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-lg mr-4 bg-gray-700">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
          </div>
          <button
            onClick={handleNotify}
            className={`p-2 rounded-lg transition-colors duration-300 ${notified ? 'bg-gray-700 text-green-400' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
            title={notified ? "You will be notified about contests" : "Get notified about contests"}
          >
            {notified ? <Bell size={20} /> : <BellOff size={20} />}
          </button>
        </div>
        
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <Award size={16} className="mr-1 text-gray-400" />
            <span className="text-sm text-gray-400">{contestCount} contests</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1 text-gray-400" />
            <span className="text-sm text-gray-400">{userCount}+ users</span>
          </div>
        </div>
        
        <button 
          className="w-full py-2 rounded-md font-medium text-white transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
          onClick={() => setShowContest(!showContest)}
        >
          {showContest ? 'Hide Contests' : 'Show Contests'}
        </button>
        
        {showContest && (
          <div className="mt-4 p-3 rounded-md bg-gray-700">
            <h4 className="font-bold mb-2 text-white">Upcoming Contests</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-gray-200">
                <span>{name} Weekly Challenge</span>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span className="text-sm">2 days</span>
                  <button 
                    className="ml-2 p-1 rounded-full bg-gray-600 hover:bg-gray-500 text-gray-200"
                    title="Get notified about this contest"
                  >
                    <Bell size={12} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-200">
                <span>Global Coding Competition</span>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span className="text-sm">5 days</span>
                  <button 
                    className="ml-2 p-1 rounded-full bg-gray-600 hover:bg-gray-500 text-gray-200"
                    title="Get notified about this contest"
                  >
                    <Bell size={12} />
                  </button>
                </div>
              </div>
              <a 
                href={`${url}/contests`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm flex items-center mt-2 text-blue-400 hover:text-blue-300 hover:underline"
              >
                View all contests <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="px-6 py-4 bg-gray-750 border-t border-gray-700 flex justify-between">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm flex items-center text-blue-400 hover:text-blue-300 font-medium"
        >
          Visit {name} <ExternalLink size={14} className="ml-1" />
        </a>
        <button
          onClick={handleNotify}
          className={`text-sm flex items-center font-medium ${notified ? 'text-green-400' : 'text-gray-400 hover:text-white'}`}
        >
          {notified ? 'Notifications On' : 'Notify Me'}
          <Bell size={14} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const CodingPlatformsShowcase = () => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  
  const platforms = [
    {
      name: "LeetCode",
      icon: <Code size={24} color="#FFA116" />,
      description: "Practice coding skills with algorithmic problems and prepare for technical interviews.",
      contestCount: "Weekly",
      userCount: "2M",
      primaryColor: "#FFA116",
      url: "https://leetcode.com"
    },
    {
      name: "HackerRank",
      icon: <Shield size={24} color="#00AB70" />,
      description: "Coding challenges for both developers & companies, supporting multiple programming languages.",
      contestCount: "Monthly",
      userCount: "5M",
      primaryColor: "#00AB70",
      url: "https://www.hackerrank.com"
    },
    {
      name: "CodeForces",
      icon: <Award size={24} color="#1F8ACB" />,
      description: "Competitive programming website featuring regular contests and comprehensive problemset.",
      contestCount: "Bi-weekly",
      userCount: "1.5M",
      primaryColor: "#1F8ACB",
      url: "https://codeforces.com"
    },
    {
      name: "CodeChef",
      icon: <Cpu size={24} color="#9B5C1B" />,
      description: "Platform fostering competitive programming with long & short contests and practice problems.",
      contestCount: "Monthly",
      userCount: "800K",
      primaryColor: "#9B5C1B",
      url: "https://www.codechef.com"
    },
    {
      name: "AtCoder",
      icon: <Shield size={24} color="#3399FF" />,
      description: "Japanese programming contest platform with high-quality algorithm contests.",
      contestCount: "Weekly",
      userCount: "500K",
      primaryColor: "#3399FF",
      url: "https://atcoder.jp"
    },
    {
      name: "TopCoder",
      icon: <Code size={24} color="#F69322" />,
      description: "Pioneering competitive programming platform with Single Round Matches and Marathon Matches.",
      contestCount: "Weekly",
      userCount: "1M",
      primaryColor: "#F69322",
      url: "https://www.topcoder.com"
    }
  ];

  const NotificationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">Set Up Notifications</h3>
        <p className="text-gray-300 mb-4">
          Enter your email to receive notifications about upcoming contests from your selected platforms.
        </p>
        <div className="mb-4">
          <input
            type="email"
            placeholder="your.email@example.com"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>
        <div className="flex justify-between">
          <button 
            onClick={() => setShowNotificationModal(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              alert("Notification preferences saved!");
              setShowNotificationModal(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Coding Platforms Explorer</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Discover top competitive programming platforms and never miss a contest
          </p>
          <button 
            onClick={() => setShowNotificationModal(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg flex items-center mx-auto"
          >
            <Bell size={18} className="mr-2" />
            Manage All Notifications
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <CodingPlatform key={index} {...platform} />
          ))}
        </div>
      </div>
      
      {showNotificationModal && <NotificationModal />}
    </div>
  );
};

export default CodingPlatformsShowcase;