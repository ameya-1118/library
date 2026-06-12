import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register, verifyOTP } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await register(formData);
      setStep(2);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Registration failed" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setErrors({});
    setIsLoading(true);

    try {
      await verifyOTP(formData.email, otp);
      navigate("/login");
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Invalid OTP" });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 2) {
    return (
      <section className="auth-page">
        <div className="auth-grid">
          <aside className="auth-showcase surface-grid">
            <span className="eyebrow">One More Step</span>
            <h1 className="mt-5 page-title text-gradient">Secure your workspace with OTP.</h1>
            <p className="page-subtitle">
              We sent a six-digit verification code to {formData.email}. Enter it to activate your account.
            </p>
          </aside>

          <div className="auth-card">
            <span className="badge">Email Verification</span>
            <h2 className="section-title mt-4">Confirm your email</h2>
            <p className="data-muted mt-2">Enter the 6-digit OTP to complete registration.</p>

            {errors.submit && <div className="status-error mt-5">{errors.submit}</div>}

            <div className="mt-6">
              <label className="field-label" htmlFor="otp-input">
                One-Time Password
              </label>
              <input
                id="otp-input"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                maxLength={6}
                className="field-input text-center text-xl tracking-[0.5em]"
              />
            </div>

            <button onClick={handleVerifyOTP} disabled={isLoading || otp.length !== 6} className="btn-primary mt-5 w-full">
              {isLoading ? "Verifying..." : "Verify and Continue"}
            </button>

            <button
              onClick={() => setStep(1)}
              disabled={isLoading}
              className="btn-secondary mt-3 w-full"
              type="button"
            >
              Back to registration
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-grid">
        <aside className="auth-showcase surface-grid">
          <span className="eyebrow">Create Account</span>
          <h1 className="mt-5 page-title text-gradient">Start organizing your library.</h1>
          <p className="page-subtitle">
            Create your account to browse books, discover authors, and manage your catalog from a unified dashboard.
          </p>
        </aside>

        <div className="auth-card">
          <span className="warm-badge">New User</span>
          <h2 className="section-title mt-4">Create your account</h2>
          <p className="data-muted mt-2">We will send an OTP to verify your email address.</p>

          {errors.submit && <div className="status-error mt-5">{errors.submit}</div>}

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div>
              <label className="field-label" htmlFor="register-name">
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="register-email">
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="register-password">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Create a strong password"
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full">
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="data-muted mt-6 text-center">
            Already registered?{" "}
            <Link to="/login" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
