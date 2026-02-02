import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './component/Header';
import Footer from './component/Footer';
import ChatBot from './component/ChatBot';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import JobsPage from './pages/JobsPage';
import ChatbotPage from './pages/ChatbotPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Header - shown on all pages except auth pages */}
          <Routes>
            <Route path="/login" element={null} />
            <Route path="/signup" element={null} />
            <Route path="*" element={<Header />} />
          </Routes>

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Auth Pages */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Feature Pages */}
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
            </Routes>
          </div>

          {/* Footer - shown on all pages except auth pages and chatbot */}
          <Routes>
            <Route path="/login" element={null} />
            <Route path="/signup" element={null} />
            <Route path="/chatbot" element={null} />
            <Route path="*" element={<Footer />} />
          </Routes>

          {/* Floating Chatbot - shown on all pages except dedicated chatbot page */}
          <Routes>
            <Route path="/chatbot" element={null} />
            <Route path="/login" element={null} />
            <Route path="/signup" element={null} />
            <Route path="*" element={<ChatBot />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}