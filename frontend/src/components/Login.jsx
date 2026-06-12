import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-grid">
        <aside className="auth-showcase surface-grid">
          <span className="eyebrow">Library Workspace</span>
          <h1 className="mt-5 page-title text-gradient">Bring your shelves online.</h1>
          <p className="page-subtitle">
            Track books, browse authors, and manage catalog updates from one clean workspace built for readers and admins.
          </p>
          <div className="mt-8 grid gap-3">
            <div className="panel rounded-2xl bg-white/90 p-4">
              <p className="text-sm font-semibold text-slate-900">Fast catalog search</p>
              <p className="data-muted mt-1">Find books and authors in seconds with smart filtering.</p>
            </div>
            <div className="panel rounded-2xl bg-white/90 p-4">
              <p className="text-sm font-semibold text-slate-900">Admin-ready controls</p>
              <p className="data-muted mt-1">Create and maintain entries without leaving your dashboard.</p>
            </div>
          </div>
        </aside>

        <div className="auth-card">
          <span className="warm-badge">Welcome Back</span>
          <h2 className="section-title mt-4">Sign in to your account</h2>
          <p className="data-muted mt-2">Use your registered email and password to continue.</p>

          {errors.submit && <div className="status-error mt-5">{errors.submit}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="field-label" htmlFor="login-email">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="field-input"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="field-input"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full">
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="data-muted mt-6 text-center">
            Need an account?{" "}
            <Link to="/register" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
