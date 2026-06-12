import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="page-shell">
      <header className="hero-panel">
        <span className="eyebrow">Library Platform</span>
        <h1 className="page-title mt-5">A modern layout for your digital library</h1>
        <p className="page-subtitle">Browse books, discover authors, and keep your workspace organized with a clean and focused interface.</p>
      </header>

      <div className="feature-grid">
        <article className="feature-card">
          <h2 className="section-title text-[1.35rem]">Books</h2>
          <p className="data-muted mt-2">Explore the catalog with quick search and visual previews.</p>
          <Link to="/books" className="btn-primary mt-6">
            Browse Books
          </Link>
        </article>

        <article className="feature-card">
          <h2 className="section-title text-[1.35rem]">Authors</h2>
          <p className="data-muted mt-2">Read biographies and maintain a complete writer directory.</p>
          <Link to="/authors" className="btn-primary mt-6">
            Explore Authors
          </Link>
        </article>
      </div>
    </section>
  );
};

export default Home;
