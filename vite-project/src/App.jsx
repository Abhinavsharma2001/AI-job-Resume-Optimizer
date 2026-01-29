import Navbar from "./component/Navbar"
import Hero from "./component/Hero"
import HomeCards from "./component/HomeCards"
import JobListings from "./component/JobListings"
import LiveJobListings from "./component/LiveJobListings"
import UseState from "./ReactHooks/UseState"
import ChatBot from "./component/ChatBot"
import JobResumeBuilder from "./component/JobResumeBuilder"

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <HomeCards />
      <JobListings />
      <LiveJobListings />

      {/* Job-First Resume Builder Section */}
      <JobResumeBuilder />

      <UseState />

      <section className="m-auto max-w-lg my-10 px-6">
        <a
          href="jobs.html"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</a>
      </section>

      {/* AI Chatbot - Fixed position on right side */}
      <ChatBot />
    </>
  )
}