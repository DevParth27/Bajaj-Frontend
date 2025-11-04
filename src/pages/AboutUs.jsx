import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1 className="about-title">
            About <span className="gradient-text">CLAIRE.AI</span>
          </h1>
          <p className="about-subtitle">
            Democratizing Access to Information Through Intelligent Document Analysis
          </p>
        </div>

        {/* Mission Section */}
        <section className="about-section">
          <div className="section-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              CLAIRE.AI (Clause-Aware Intelligent Retrieval Engine) is built to solve one of the most 
              time-consuming challenges in the modern workplace — navigating complex policy documents, 
              insurance papers, and legal content. Our mission is to make access to information 
              simple, intelligent, and universally available.
            </p>
            <p className="section-text">
              We empower professionals and organizations to extract meaningful insights from large, 
              complex documents — without requiring domain expertise or hours of manual reading.
            </p>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="about-section highlight-section">
          <div className="section-content">
            <h2 className="section-title">The Problem We Solve</h2>
            <p className="section-text">
              Understanding and retrieving information from detailed documents is a slow, 
              expertise-driven process. Traditional methods often involve:
            </p>
            <ul className="problem-list">
              <li>Reading through hundreds of pages of documentation</li>
              <li>Relying on limited keyword-based search tools</li>
              <li>Seeking help from subject matter experts</li>
              <li>Dealing with multiple formats and inconsistent structures</li>
              <li>Overcoming technical or language barriers</li>
            </ul>
            <p className="section-text">
              CLAIRE.AI simplifies this by leveraging advanced AI to interpret context, 
              extract relevant data, and deliver clear, actionable answers within seconds.
            </p>
          </div>
        </section>

        {/* Technology Section */}
        <section className="about-section">
          <div className="section-content">
            <h2 className="section-title">Our Technology</h2>
            <div className="tech-grid">
              <div className="tech-card">
                <h3 className="tech-title">Google Gemini 2.5 Flash</h3>
                <p className="tech-description">
                  A cutting-edge AI model offering fast, accurate, and context-aware processing 
                  for complex document queries.
                </p>
              </div>

              <div className="tech-card">
                <h3 className="tech-title">Enhanced RAG Pipeline</h3>
                <p className="tech-description">
                  A retrieval-augmented generation system that uses intelligent chunking, 
                  compression, and optimized vector embeddings to improve precision.
                </p>
              </div>

              <div className="tech-card">
                <h3 className="tech-title">Performance Optimization</h3>
                <p className="tech-description">
                  Advanced caching, asynchronous execution, and dynamic scaling ensure 
                  speed and reliability at every stage.
                </p>
              </div>

              <div className="tech-card">
                <h3 className="tech-title">Enterprise-Grade Security</h3>
                <p className="tech-description">
                  Token-based authentication, strict data policies, and secure credential 
                  management protect your information throughout the pipeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="about-section highlight-section">
          <div className="section-content">
            <h2 className="section-title">System Architecture</h2>
            <p className="section-text">
              CLAIRE.AI is powered by a modular and scalable architecture that ensures reliability, 
              performance, and security.
            </p>
            
            <div className="architecture-diagram">
              <div className="architecture-layer">
                <h4>Presentation Layer</h4>
                <p>React-based interface for a seamless, responsive user experience</p>
              </div>
              <div className="architecture-arrow">↓</div>
              <div className="architecture-layer">
                <h4>API Layer</h4>
                <p>FastAPI with JWT authentication and request throttling</p>
              </div>
              <div className="architecture-arrow">↓</div>
              <div className="architecture-layer">
                <h4>Processing Layer</h4>
                <p>Document parser supporting multi-format ingestion and metadata extraction</p>
              </div>
              <div className="architecture-arrow">↓</div>
              <div className="architecture-layer">
                <h4>AI Layer</h4>
                <p>Google Gemini 2.5 Flash with advanced RAG integration</p>
              </div>
              <div className="architecture-arrow">↓</div>
              <div className="architecture-layer">
                <h4>Data Layer</h4>
                <p>Vector database with optimized embedding cache and validation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="about-section">
          <div className="section-content">
            <h2 className="section-title">Key Capabilities</h2>
            <div className="capabilities-grid">
              <div className="capability-item">
                <div className="capability-content">
                  <h4>Multi-Format Support</h4>
                  <p>Handles PDFs, Word, Excel, PowerPoint, CSV, and plain text documents.</p>
                </div>
              </div>

              <div className="capability-item">
                <div className="capability-content">
                  <h4>Global Language Coverage</h4>
                  <p>Supports 20+ languages including English, Hindi, Spanish, and Arabic.</p>
                </div>
              </div>

              <div className="capability-item">
                <div className="capability-content">
                  <h4>URL-Based Ingestion</h4>
                  <p>Extracts and processes documents directly from online sources.</p>
                </div>
              </div>

              <div className="capability-item">
                <div className="capability-content">
                  <h4>High Accuracy</h4>
                  <p>Contextual search with hallucination detection and confidence scoring.</p>
                </div>
              </div>

              <div className="capability-item">
                <div className="capability-content">
                  <h4>Real-Time Responses</h4>
                  <p>Delivers accurate document-based answers within seconds.</p>
                </div>
              </div>

              <div className="capability-item">
                <div className="capability-content">
                  <h4>Scalable Infrastructure</h4>
                  <p>Supports multiple concurrent users and large-scale document sets.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="about-section">
          <div className="section-content">
            <h2 className="section-title">Our Vision</h2>
            <p className="section-text">
              We aim to create a world where information is truly accessible — 
              where every professional can instantly understand policies, legal documents, 
              and research materials without friction.
            </p>
            <p className="section-text">
              CLAIRE.AI is an evolving platform. We are continuously enhancing our models, 
              refining precision, and expanding to new domains to make knowledge retrieval 
              seamless and inclusive.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-text">
              Experience intelligent document analysis that empowers your workflow.
            </p>
            <a href="/" className="cta-button">
              Try CLAIRE.AI Now →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
