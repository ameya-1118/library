import React, { useEffect, useState } from "react";
import { authorApi } from "../api/client";
import { useAuth } from "../context/AuthContext";

const AuthorsList = () => {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchAuthors();
  }, [search]);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authorApi.getAll({ search });
      setAuthors(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch authors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!authorToDelete) {
      return;
    }

    try {
      setDeletingId(authorToDelete._id);
      await authorApi.delete(authorToDelete._id);
      setAuthors((prev) => prev.filter((a) => a._id !== authorToDelete._id));
      setSuccess("Author deleted successfully");
      setAuthorToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete author");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="page-shell">
      <header className="hero-panel">
        <span className="eyebrow">Author Profiles</span>
        <h1 className="page-title mt-5">Discover and manage author records</h1>
        <p className="page-subtitle">Explore biographies, birth details, and maintain your writer directory.</p>
      </header>

      <div className="search-card">
        <div className="search-layout">
          <div>
            <p className="section-title text-[1.35rem]">Find authors</p>
            <p className="data-muted mt-1">Search by first or last name.</p>
          </div>
          <div className="w-full max-w-lg">
            <label htmlFor="author-search" className="field-label">
              Search
            </label>
            <input
              id="author-search"
              type="text"
              placeholder="Search authors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field-input"
            />
          </div>
        </div>
      </div>

      {loading && <div className="panel p-5 text-sm text-slate-600">Loading authors...</div>}
      {error && <div className="status-error">{error}</div>}
      {success && <div className="status-success">{success}</div>}

      {!loading && authors.length === 0 ? (
        <div className="panel p-8 text-center">
          <p className="section-title text-[1.35rem]">No authors found</p>
          <p className="data-muted mt-2">Try another name or create a new author profile.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {authors.map((author) => {
            const initials = `${author.firstname?.[0] || "?"}${author.lastname?.[0] || "?"}`;

            return (
              <article key={author._id} className="catalog-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold uppercase tracking-[0.2em] text-white">
                    {initials}
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => setAuthorToDelete(author)}
                      className="rounded-lg border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {author.firstname} {author.lastname}
                </h2>
                <p className="data-muted mt-2 line-clamp-3">{author.bio || "No bio available."}</p>
                <p className="data-muted mt-3">
                  Birth Date: {author.birthDate ? new Date(author.birthDate).toLocaleDateString() : "N/A"}
                </p>
              </article>
            );
          })}
        </div>
      )}

      {authorToDelete && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 className="section-title text-[1.35rem]">Delete author</h2>
            <p className="data-muted mt-2">
              Are you sure you want to delete {authorToDelete.firstname} {authorToDelete.lastname}?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setAuthorToDelete(null)} className="btn-secondary !px-4 !py-2">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger !px-4 !py-2" disabled={deletingId === authorToDelete._id}>
                {deletingId === authorToDelete._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuthorsList;
