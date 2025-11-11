import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getAnswers } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Home.css';

const Home = () => {
  const [url, setUrl] = useState('');
  const [questions, setQuestions] = useState('');
  const [results, setResults] = useState([]);
  const [rawResponse, setRawResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !questions) {
      toast.error('Please provide both a URL and questions.');
      return;
    }
    setLoading(true);
    try {
      const questionArray = questions
        .split('\n')
        .map(q => q.trim())
        .filter(q => q !== '');

      const response = await getAnswers(url, questionArray);
      const payload = response?.data ?? response;

      setRawResponse(payload);
      setResults(normalizeResults(payload, questionArray));
      toast.success('Answers retrieved successfully!');
    } catch (error) {
      toast.error('An error occurred while fetching answers.');
    }
    setLoading(false);
  };

  const normalizeResults = (payload, questionsList) => {
    const pickQuestion = (index) => questionsList[index] || `Question ${index + 1}`;

    const extractItems = (value) => {
      if (value === undefined || value === null) return [];
      if (Array.isArray(value)) return value;
      if (Array.isArray(value.answers)) return value.answers;
      if (Array.isArray(value.data)) return value.data;
      if (Array.isArray(value.result)) return value.result;
      if (Array.isArray(value.output)) return value.output;
      if (value.items && Array.isArray(value.items)) return value.items;

      if (typeof value === 'object') {
        if (typeof value.answer === 'string' || typeof value.answer === 'number') {
          return [value];
        }
        const objValues = Object.values(value);
        if (objValues.length) return objValues;
      }

      return [value];
    };

    const toDisplayEntry = (item, index) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        const question =
          item.question ||
          item.prompt ||
          item.query ||
          pickQuestion(index);

        const answer =
          item.answer ??
          item.output ??
          item.response ??
          (typeof item.text === 'string' ? item.text : JSON.stringify(item));

        return {
          question,
          answer: typeof answer === 'string' ? answer : JSON.stringify(answer),
        };
      }

      return {
        question: pickQuestion(index),
        answer: typeof item === 'string' || typeof item === 'number'
          ? String(item)
          : JSON.stringify(item),
      };
    };

    return extractItems(payload).map(toDisplayEntry);
  };

  const renderAnswer = (answer) => {
    if (answer === undefined || answer === null) return '';

    const stringify = (value) =>
      typeof value === 'string' ? value : JSON.stringify(value, null, 2);

    const escapeHtml = (value) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const formatInline = (value) => {
      const escaped = escapeHtml(value);
      const bolded = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const italicized = bolded.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return italicized;
    };

    const lines = stringify(answer).split(/\r?\n/);
    const htmlParts = [];
    let listBuffer = [];

    const flushList = () => {
      if (listBuffer.length) {
        htmlParts.push(`<ul class="answer-list">${listBuffer.join('')}</ul>`);
        listBuffer = [];
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushList();
        htmlParts.push('<div class="answer-spacer"></div>');
        return;
      }

      const bulletMatch = trimmed.match(/^[-*•]\s+(.*)/);
      if (bulletMatch) {
        listBuffer.push(`<li>${formatInline(bulletMatch[1])}</li>`);
        return;
      }

      flushList();
      htmlParts.push(`<p class="answer-paragraph">${formatInline(trimmed)}</p>`);
    });

    flushList();
    return htmlParts.join('');
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
        <div className="qa-form-container" id="form">
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

          {(results.length > 0 || rawResponse) && (
            <div className="answers-card">
              <div className="answers-header">
                <h3>Your Answers</h3>
                {results.length > 0 && (
                  <span className="answers-count">
                    {results.length} {results.length === 1 ? 'answer' : 'answers'}
                  </span>
                )}
              </div>

              {results.length > 0 ? (
                <div className="answers-list">
                  {results.map((result, index) => (
                    <article className="answer-item" key={index}>
                      <header className="answer-question">
                        <span className="answer-chip">Q{index + 1}</span>
                        <p>{result.question}</p>
                      </header>
                      <div
                        className="answer-body"
                        dangerouslySetInnerHTML={{ __html: renderAnswer(result.answer) }}
                      />
                    </article>
                  ))}
                </div>
              ) : (
                <p className="answers-empty">No direct answers found in the response.</p>
              )}

              {rawResponse && (
                <details className="raw-response">
                  <summary>View raw response</summary>
                  <pre>{JSON.stringify(rawResponse, null, 2)}</pre>
                </details>
              )}
            </div>
          )}
        </div>
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