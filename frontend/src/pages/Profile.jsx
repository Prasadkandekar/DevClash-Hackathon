"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ProfilePage() {
  return (
    <motion.div
      className="min-h-screen py-10 px-4 md:px-10 bg-[#0c0a1a] text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <Card className="bg-[#15132a] border-none shadow-lg rounded-2xl p-6">
          <CardContent className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-purple-700">
              <img
                src="https://api.dicebear.com/7.x/thumbs/svg?seed=Pravin"
                alt="Pravin"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-purple-300">Prasad Kandekar</h2>
                <p className="text-sm text-purple-400">Full Stack Developer • AI ML</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-purple-400">Email</p>
                  <p className="text-white">prasad@email.com</p>
                </div>
                <div>
                  <p className="text-purple-400">Phone</p>
                  <p className="text-white">+91 1234567890</p>
                </div>
                <div>
                  <p className="text-purple-400">Location</p>
                  <p className="text-white">Maharashtra, India</p>
                </div>
                <div>
                  <p className="text-purple-400">Experience</p>
                  <p className="text-white">2+ Years</p>
                </div>
              </div>

              <div>
                <p className="text-purple-400">Bio</p>
                <p className="text-white">
                  I’m a passionate developer exploring AI, building SaaS products, and chasing dreams with coffee in one hand ☕ and a vision board in the other.
                </p>
              </div>

              <div>
                <p className="text-purple-400 mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {["React", "Node.js", "Express", "PostgreSQL", "Tailwind", "Appwrite", "Flutter", "Three.js"].map((tech) => (
                    <span key={tech} className="bg-purple-700/30 text-purple-200 px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="mt-4 bg-purple-700 hover:bg-purple-800 transition">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}