import React, { useEffect, useState } from "react";
import { authorApi, bookApi } from "../api/client";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    authorID: "",
    publishedDate: "",
  });
  const [authors, setAuthors] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await authorApi.getAll();
      setAuthors(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch authors");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("authorID", formData.authorID);
      data.append("publishedDate", formData.publishedDate);

      if (file) {
        data.append("coverImage", file);
      }

      await bookApi.create(data);
      setSuccess(true);
      setFormData({ title: "", authorID: "", publishedDate: "" });
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell">
      <header className="hero-panel">
        <span className="eyebrow">Admin Task</span>
        <h1 className="page-title mt-5">Create a new book entry</h1>
        <p className="page-subtitle">Add title, author, publish date, and optional cover image.</p>
      </header>

      <div className="panel p-6 sm:p-8">
        {success && <div className="status-success">Book created successfully.</div>}
        {error && <div className="status-error">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="field-label" htmlFor="book-title">
              Title
            </label>
            <input
              id="book-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="field-input"
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="book-author">
              Author
            </label>
            <select
              id="book-author"
              name="authorID"
              value={formData.authorID}
              onChange={handleChange}
              className="field-input"
              required
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.firstname} {author.lastname}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="book-published-date">
                Published Date
              </label>
              <input
                id="book-published-date"
                type="date"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleChange}
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="book-cover-image">
                Cover Image
              </label>
              <input
                id="book-cover-image"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="field-input"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
            {loading ? "Creating..." : "Create Book"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddBook;
