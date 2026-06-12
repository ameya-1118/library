import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navClass = ({ isActive }) =>
    [
      "rounded-xl px-3 py-2 text-sm font-semibold transition duration-200",
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    ].join(" ");

  return (
    <nav className="glass-nav">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to={user ? "/dashboard" : "/login"} className="group inline-flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold uppercase tracking-[0.2em] text-white transition duration-200 group-hover:-translate-y-0.5">
            SV
          </span>
          <span className="brand-title">Shelf Vista</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {user ? (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/books" className={navClass}>
                Books
              </NavLink>
              <NavLink to="/authors" className={navClass}>
                Authors
              </NavLink>
              {user.role === "admin" && (
                <>
                  <NavLink to="/add-book" className={navClass}>
                    Add Book
                  </NavLink>
                  <NavLink to="/add-author" className={navClass}>
                    Add Author
                  </NavLink>
                </>
              )}
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navClass}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 sm:inline-flex">
                {user.name}
              </span>
              <button onClick={onLogout} className="btn-danger !rounded-xl !px-4 !py-2">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary !rounded-xl !px-4 !py-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
