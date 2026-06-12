import React, { useState } from "react";
import { authorApi } from "../api/client";

const AddAuthor = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authorApi.create(formData);
      setSuccess(true);
      setFormData({ firstname: "", lastname: "", bio: "", birthDate: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create author");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell">
      <header className="hero-panel">
        <span className="eyebrow">Admin Task</span>
        <h1 className="page-title mt-5">Create a new author profile</h1>
        <p className="page-subtitle">Capture core identity, biography, and birth details for the directory.</p>
      </header>

      <div className="panel p-6 sm:p-8">
        {success && <div className="status-success">Author created successfully.</div>}
        {error && <div className="status-error">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="author-first-name">
                First Name
              </label>
              <input
                id="author-first-name"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="field-input"
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="author-last-name">
                Last Name
              </label>
              <input
                id="author-last-name"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="field-input"
                required
              />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="author-bio">
              Biography
            </label>
            <textarea
              id="author-bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="field-input min-h-32"
              placeholder="Write a short author biography"
            />
          </div>

          <div>
            <label className="field-label" htmlFor="author-birth-date">
              Birth Date
            </label>
            <input
              id="author-birth-date"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="field-input"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
            {loading ? "Creating..." : "Create Author"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAuthor;
