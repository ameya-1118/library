import React, { useEffect, useState } from "react";
import { bookApi } from "../api/client";
import { useAuth } from "../context/AuthContext";

const BooksList = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookApi.getAll({ search });
      setBooks(response.data.data || []);
    } catch (err) {
      if (err.response?.status === 404) {
        setBooks([]);
        setError(null);
      } else {
        setError(err.response?.data?.message || "Failed to fetch books");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!bookToDelete) {
      return;
    }

    try {
      setDeletingId(bookToDelete._id);
      await bookApi.delete(bookToDelete._id);
      setBooks((prev) => prev.filter((book) => book._id !== bookToDelete._id));
      setSuccess("Book deleted successfully");
      setBookToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete book");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="page-shell">
      <header className="hero-panel">
        <span className="eyebrow">Book Catalog</span>
        <h1 className="page-title mt-5">Browse and curate your book collection</h1>
        <p className="page-subtitle">Search by title or author and preview details at a glance.</p>
      </header>

      <div className="search-card">
        <div className="search-layout">
          <div>
            <p className="section-title text-[1.35rem]">Find books</p>
            <p className="data-muted mt-1">Use title or author keywords.</p>
          </div>
          <div className="w-full max-w-lg">
            <label htmlFor="book-search" className="field-label">
              Search
            </label>
            <input
              id="book-search"
              type="text"
              placeholder="Search books or authors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field-input"
            />
          </div>
        </div>
      </div>

      {loading && <div className="panel p-5 text-sm text-slate-600">Loading books...</div>}
      {error && <div className="status-error">{error}</div>}
      {success && <div className="status-success">{success}</div>}

      {!loading && books.length === 0 ? (
        <div className="panel p-8 text-center">
          <p className="section-title text-[1.35rem]">No books found</p>
          <p className="data-muted mt-2">Try a different keyword or add a new book.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {books.map((book) => {
            const publishDate = book.publishDate || book.publishedDate;
            const authorName = `${book.authorID?.firstname || "Unknown"} ${book.authorID?.lastname || "Author"}`;

            return (
              <article key={book._id} className="catalog-card">
                {book.coverImage?.cloudinary?.url ? (
                  <img src={book.coverImage.cloudinary.url} alt={book.title} className="catalog-cover" />
                ) : (
                  <div className="catalog-cover flex items-center justify-center text-sm font-semibold text-slate-500">
                    Cover not available
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-2 text-lg font-bold text-slate-900">{book.title}</h2>
                    {isAdmin && (
                      <button
                        onClick={() => setBookToDelete(book)}
                        className="rounded-lg border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-700">{authorName}</p>
                  <p className="data-muted mt-2">
                    Published: {publishDate ? new Date(publishDate).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {bookToDelete && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 className="section-title text-[1.35rem]">Delete book</h2>
            <p className="data-muted mt-2">Are you sure you want to delete "{bookToDelete.title}"?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setBookToDelete(null)} className="btn-secondary !px-4 !py-2">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger !px-4 !py-2" disabled={deletingId === bookToDelete._id}>
                {deletingId === bookToDelete._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BooksList;
