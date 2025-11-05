import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getAnswers } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Home.css';

const Home = () => {
  const [url, setUrl] = useState('');
  const [questions, setQuestions] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !questions) {
      toast.error('Please provide both a URL and questions.');
      return;
    }
    setLoading(true);
    try {
      const questionArray = questions.split('\n').filter(q => q.trim() !== '');
      const response = await getAnswers(url, questionArray);
      setResults(response.data);
      toast.success('Answers retrieved successfully!');
    } catch (error) {
      toast.error('An error occurred while fetching answers.');
    }
    setLoading(false);
  };

  return (
    <div className="home-container">
      {loading && <LoadingSpinner />}
      
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Document Q&A with CLAIRE.AI</h1>
        <p>Get accurate answers from your documents instantly with advanced AI technology</p>
      </div>

      {/* Main Form and Results */}
      <div className="form-and-results-container">
        <div className="qa-form-container">
          <h2 className="form-title">Submit Your Query</h2>
          <form onSubmit={handleSubmit} className="qa-form">
            <div className="form-group">
              <label htmlFor="document-url">Document URL</label>
              <input
                id="document-url"
                type="text"
                placeholder="https://example.com/document.pdf"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="questions">Your Questions</label>
              <textarea
                id="questions"
                placeholder="Enter your questions, one per line&#10;Example:&#10;What is the policy coverage?&#10;What are the exclusions?"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Get Answers'}
            </button>
          </form>
        </div>

        {results.length > 0 && (
          <div className="results-container">
            <h2>Your Answers</h2>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <p><strong>Q:</strong> {result.question}</p>
                  <p><strong>A:</strong> {result.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Features Section with Image */}
      <div className="features-section">
        <div className="features-content">
          <div className="features-text">
            <h2>Why Choose CLAIRE.AI?</h2>
            <p className="features-intro">
              CLAIRE.AI makes document analysis simple and efficient. Extract meaningful 
              information from complex documents in seconds.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-number">01</div>
                <div className="feature-details">
                  <h3>Instant Processing</h3>
                  <p>Get answers from your documents within seconds, not hours</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-number">02</div>
                <div className="feature-details">
                  <h3>High Accuracy</h3>
                  <p>Advanced AI ensures precise and contextually relevant answers</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-number">03</div>
                <div className="feature-details">
                  <h3>Multi-Format Support</h3>
                  <p>Works with PDFs, Word documents, and various file formats</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-number">04</div>
                <div className="feature-details">
                  <h3>Secure & Private</h3>
                  <p>Your documents and data are processed with enterprise-grade security</p>
                </div>
              </div>
            </div>
          </div>
          <div className="features-image">
            {/* Replace src with your image path */}
            <img 
              src="/src/images/Pic7.png" 
              alt="CLAIRE.AI Features" 
              className="feature-img"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section">
        <h2 className="section-heading">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Upload Document</h3>
            <p>Provide the URL of your document or file</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Ask Questions</h3>
            <p>Enter your questions about the document</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get Answers</h3>
            <p>Receive accurate, AI-powered responses instantly</p>
          </div>
        </div>
      </div>

      {/* Use Cases Section with Image */}
      <div className="use-cases-section">
        <div className="use-cases-content">
          <div className="use-cases-image">
            {/* Replace src with your image path */}
            <img 
              src="/src/images/Pic6.png" 
              alt="Use Cases" 
              className="use-case-img"
            />
          </div>
          <div className="use-cases-text">
            <h2>Perfect For Various Industries</h2>
            <div className="use-case-list">
              <div className="use-case-item">
                <h4>Insurance & Finance</h4>
                <p>Quickly extract policy details, terms, and conditions from insurance documents</p>
              </div>
              <div className="use-case-item">
                <h4>Legal & Compliance</h4>
                <p>Navigate complex legal documents and contracts with ease</p>
              </div>
              <div className="use-case-item">
                <h4>Healthcare</h4>
                <p>Understand medical reports, research papers, and clinical documentation</p>
              </div>
              <div className="use-case-item">
                <h4>Education & Research</h4>
                <p>Extract insights from academic papers and research materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="trust-section">
        <h2 className="section-heading">Trusted by Professionals</h2>
        <div className="trust-stats">
          <div className="stat-card">
            <div className="stat-number">99%</div>
            <div className="stat-label">Accuracy Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3s</div>
            <div className="stat-label">Average Response Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">20+</div>
            <div className="stat-label">Languages Supported</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Available</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Experience the power of AI-driven document analysis today</p>
          <a href="#form" className="cta-button" onClick={(e) => {
            e.preventDefault();
            document.querySelector('.qa-form-container').scrollIntoView({ behavior: 'smooth' });
          }}>
            Try Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;