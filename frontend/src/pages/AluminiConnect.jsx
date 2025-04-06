import React, { useState, useEffect } from 'react';
import {ThumbsUp,Search, Github, Mail, ExternalLink } from 'lucide-react';


const AlumniConnect = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Normally you would fetch this data from an API
  useEffect(() => {
    // Sample alumni data
    const alumniData = [
        {
          id: 1,
          name: 'Alex Johnson',
          photo: 'https://randomuser.me/api/portraits/men/75.jpg',
          company: 'Google',
          position: 'Software Engineer',
          graduationYear: 2021,
          location: 'San Francisco, CA',
          bio: 'Full-stack developer specializing in React and Node.js. Passionate about creating accessible web applications.',
          socials: {
            linkedin: 'https://linkedin.com/in/alexjohnson',
            github: 'https://github.com/alexjohnson',
            twitter: 'https://twitter.com/alexjohnson',
            email: 'alex.johnson@example.com'
          }
        },
        {
          id: 2,
          name: 'Priya Patel',
          photo: 'https://randomuser.me/api/portraits/women/65.jpg',
          company: 'Microsoft',
          position: 'Product Manager',
          graduationYear: 2020,
          location: 'Seattle, WA',
          bio: 'Product manager with a background in computer science. Focused on creating intuitive user experiences.',
          socials: {
            linkedin: 'https://linkedin.com/in/priyapatel',
            github: 'https://github.com/priyapatel',
            email: 'priya.patel@example.com'
          }
        },
        {
          id: 3,
          name: 'Marcus Wong',
          photo: 'https://randomuser.me/api/portraits/men/52.jpg',
          company: 'Amazon',
          position: 'Data Scientist',
          graduationYear: 2022,
          location: 'New York, NY',
          bio: 'Data scientist working on recommendation systems. Interest in machine learning and AI ethics.',
          socials: {
            linkedin: 'https://linkedin.com/in/marcuswong',
            twitter: 'https://twitter.com/marcuswong',
            email: 'marcus.wong@example.com'
          }
        },
        {
          id: 4,
          name: 'Sarah Chen',
          photo: 'https://randomuser.me/api/portraits/women/21.jpg',
          company: 'Netflix',
          position: 'Frontend Developer',
          graduationYear: 2021,
          location: 'Los Angeles, CA',
          bio: 'Frontend developer focused on creating engaging user interfaces. Experienced with React and Vue.',
          socials: {
            linkedin: 'https://linkedin.com/in/sarahchen',
            github: 'https://github.com/sarahchen',
            twitter: 'https://twitter.com/sarahchen',
            email: 'sarah.chen@example.com'
          }
        },
        {
          id: 5,
          name: 'Jordan Taylor',
          photo: 'https://randomuser.me/api/portraits/men/23.jpg',
          company: 'Apple',
          position: 'iOS Developer',
          graduationYear: 2019,
          location: 'Cupertino, CA',
          bio: 'iOS developer with experience in Swift and React Native. Interested in mobile app design patterns.',
          socials: {
            linkedin: 'https://linkedin.com/in/jordantaylor',
            github: 'https://github.com/jordantaylor',
            email: 'jordan.taylor@example.com'
          }
        },
        {
          id: 6,
          name: 'Aisha Rodriguez',
          photo: 'https://randomuser.me/api/portraits/women/33.jpg',
          company: 'Spotify',
          position: 'Backend Engineer',
          graduationYear: 2020,
          location: 'Stockholm, Sweden',
          bio: 'Backend engineer working with distributed systems. Passionate about scalable architecture.',
          socials: {
            linkedin: 'https://linkedin.com/in/aisharodriguez',
            github: 'https://github.com/aisharodriguez',
            twitter: 'https://twitter.com/aisharodriguez',
            email: 'aisha.rodriguez@example.com'
          }
        }
      ];
      
    
    setAlumni(alumniData);
    setFilteredAlumni(alumniData);
  }, []);

  useEffect(() => {
    const results = alumni.filter(alumnus => {
      const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          alumnus.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alumnus.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === 'all') return matchesSearch;
      return matchesSearch && alumnus.graduationYear.toString() === filter;
    });
    
    setFilteredAlumni(results);
  }, [searchTerm, filter, alumni]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-3 text-indigo-400">Alumni Connect</h1>
          <p className="text-gray-400 text-lg">Connect with our successful graduates and expand your professional network</p>
        </header>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by name, company, or position..."
              className="w-full py-2 px-4 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          </div>
          
          <div className="w-full sm:w-auto">
            <select 
              className="py-2 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 w-full"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All Years</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        {filteredAlumni.length === 0 ? (
          <div className="text-center p-8 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No alumni found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map(alumnus => (
              <div key={alumnus.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-900/20 hover:translate-y-1 transition-all duration-300">
                <div className="relative p-6 pb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={alumnus.photo} 
                      alt={alumnus.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{alumnus.name}</h3>
                      <p className="text-indigo-400">{alumnus.position}</p>
                      <p className="text-gray-400 text-sm">{alumnus.company}</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <p className="text-gray-300 mb-4 text-sm">{alumnus.bio}</p>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <span className="bg-gray-700 px-2 py-1 rounded">{alumnus.location}</span>
                    <span className="bg-gray-700 px-2 py-1 rounded">Class of {alumnus.graduationYear}</span>
                  </div>
                </div>

                <div className="px-6 pb-6 flex gap-3">
                  {alumnus.socials.linkedin && (
                    <a href={alumnus.socials.linkedin} className="text-gray-400 hover:text-indigo-400 transition-colors" target="_blank" rel="noopener noreferrer">
                      <ThumbsUp size={20} />
                    </a>
                  )}
                  {alumnus.socials.github && (
                    <a href={alumnus.socials.github} className="text-gray-400 hover:text-indigo-400 transition-colors" target="_blank" rel="noopener noreferrer">
                      <Github size={20} />
                    </a>
                  )}
                 
                  {alumnus.socials.email && (
                    <a href={`mailto:${alumnus.socials.email}`} className="text-gray-400 hover:text-indigo-400 transition-colors">
                      <Mail size={20} />
                    </a>
                  )}
                  <button className="ml-auto text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-sm">
                    View Profile <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniConnect;