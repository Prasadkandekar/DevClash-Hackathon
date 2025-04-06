import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Layout from './Layout'
import AnalyzeResume from '@/pages/AnalyzeResume'

import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import JobRecommendations from '@/pages/JobRecommendations'
import DSAContent from '@/pages/DSAcontent'
import CodingPlatformsShowcase from '@/pages/CodingPlatformsShowcase'
import AptitudeTest from '@/pages/AptitudeTests'
import AlumniConnect from '@/pages/AluminiConnect'

function Routings() {
  return (
    <div>
        <Router>
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/resume" element={<AnalyzeResume />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/app" element={<Layout />} >
                <Route index element={<Dashboard />} />
                <Route path="resume" element={<AnalyzeResume />} />
                <Route path="job" element={<JobRecommendations />} />
                <Route path="learn" element={<DSAContent />} />
                <Route path="contests" element={<CodingPlatformsShowcase />} />
                <Route path="aptitude" element={<AptitudeTest />} />
                <Route path="alumini" element={<AlumniConnect />} />
                
            </Route>
            </Routes>
        </Router>
    </div>
  )
}

export default Routings