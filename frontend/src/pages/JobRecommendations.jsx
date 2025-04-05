import React, { useEffect, useState } from "react";
import axios from "axios";

const JobRecommendations = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.get(
          "https://dev-clash-hackathon-sgsj.vercel.app/job-recommendations",
          {
            params: {
              query: "developer in India",
              page: "1",
              num_pages: "2"
            }
          }
        );

        console.log("API Response:", res.data); // Debug logging

        if (!res.data.success) {
          throw new Error(res.data.error || "Failed to load jobs");
        }

        if (!res.data.jobs || res.data.jobs.length === 0) {
          setError("No jobs found");
        } else {
          setJobs(res.data.jobs);
          setFilteredJobs(res.data.jobs);
        }
      } catch (err) {
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          stack: err.stack
        });
        
        setError(err.response?.data?.error || err.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = jobs.filter((job) =>
      job.job_title?.toLowerCase().includes(value) ||
      job.employer_name?.toLowerCase().includes(value) ||
      job.job_city?.toLowerCase().includes(value) ||
      job.job_country?.toLowerCase().includes(value)
    );

    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <span className="ml-4 text-gray-600">Fetching job recommendations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">💼 Recommended Jobs for You</h1>
        <p className="text-gray-600 mt-2">
          Browse through the latest job opportunities matching your profile
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search jobs by title, company, or location"
          className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition hover:border-purple-200"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-1">
                {job.job_title || "No title available"}
              </h2>
              <p className="text-gray-600 mb-1">
                <strong>{job.employer_name || "Unknown company"}</strong>
                {job.job_city && ` • ${job.job_city}`}
                {job.job_country && `, ${job.job_country}`}
              </p>
              <p className="text-sm text-gray-500">
                {job.job_employment_type && `Type: ${job.job_employment_type}`}
                {job.job_posted_at_datetime_utc && (
                  <>
                    {job.job_employment_type && " | "}
                    Posted: {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}
                  </>
                )}
              </p>
              {job.job_apply_link && (
                <a
                  href={job.job_apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Apply Now
                </a>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 text-lg">No jobs found matching your search 😕</p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRecommendations;