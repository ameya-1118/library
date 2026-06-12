import React from "react";
import { Link } from "react-router-dom";

const dashboardStats = [
  { title: "Books", value: "1200+", note: "Cataloged titles" },
  { title: "Authors", value: "350+", note: "Writer profiles" },
  { title: "Members", value: "2.5k", note: "Active readers" },
  { title: "Genres", value: "25", note: "Curated categories" },
];

const Dashboard = ({ user }) => {
  if (!user) {
    return (
      <section className="content-wrap">
        <div className="panel p-8 text-center">
          <h1 className="section-title">Loading dashboard...</h1>
          <p className="data-muted mt-2">Preparing your workspace.</p>
        </div>
      </section>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <section className="page-shell">
      <header className="hero-panel">
        <span className={isAdmin ? "warm-badge" : "badge"}>{isAdmin ? "Admin Workspace" : "Reader Workspace"}</span>
        <h1 className="page-title mt-5">
          {isAdmin ? "Run your catalog command center" : "Explore your personalized library"}
        </h1>
        <p className="page-subtitle">
          {isAdmin
            ? "Create books, manage author records, and keep your library data updated from one place."
            : "Browse titles, discover new authors, and keep your reading world in one clean dashboard."}
        </p>
      </header>

      <section className="stats-grid">
        {dashboardStats.map((stat) => (
          <article key={stat.title} className="stat-card">
            <p className="data-muted uppercase tracking-[0.15em]">{stat.title}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="data-muted mt-1">{stat.note}</p>
          </article>
        ))}
      </section>

      <section className="feature-grid">
        <DashboardCard
          title="Browse Books"
          desc="Search book titles and quickly preview publishing details."
          link="/books"
          action="Open Books"
        />
        <DashboardCard
          title="Explore Authors"
          desc="Read author biographies and discover writer histories."
          link="/authors"
          action="Open Authors"
        />

        {isAdmin && (
          <>
            <DashboardCard
              title="Add New Book"
              desc="Publish fresh entries with image cover and metadata."
              link="/add-book"
              action="Add Book"
            />
            <DashboardCard
              title="Add New Author"
              desc="Create complete author profiles for the catalog."
              link="/add-author"
              action="Add Author"
            />
          </>
        )}
      </section>
    </section>
  );
};

const DashboardCard = ({ title, desc, link, action }) => (
  <article className="feature-card">
    <h2 className="section-title text-[1.35rem]">{title}</h2>
    <p className="data-muted mt-2">{desc}</p>
    <Link to={link} className="btn-primary mt-6">
      {action}
    </Link>
  </article>
);

export default Dashboard;
