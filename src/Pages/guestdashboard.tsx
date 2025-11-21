import { useEffect, useState } from "react";
import axios from "axios";

interface Department {
  id: number;
  abbreviation: string;
  name: string;
  description: string;
  status: string;
}

export default function GuestDashboard() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const fullname = typeof window !== "undefined" ? localStorage.getItem("fullname") : null;
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
  });

  // Fetch departments (read-only for guests)
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/departments");
      setDepartments(res.data.data || []);
    } catch (error) {
      console.error("Error loading departments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <nav className="top-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="brand-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <span className="brand-text">DivHub</span>
          </div>
          
          <div className="navbar-menu">
            <div className="nav-menu-item active">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="9" y1="9" x2="21" y2="9"></line>
              </svg>
              <span>Divisions</span>
            </div>
          </div>

          <div className="navbar-user">
            <div className="user-profile">
              <div className="user-avatar-small">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="user-details">
                <span className="user-name-small">{fullname || "Guest"}</span>
                <span className="user-role-small">{role === "admin" ? "Admin" : "Guest"}</span>
              </div>
            </div>
            <button className="navbar-logout-btn" onClick={logout} title="Logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Page Header */}
        <div className="page-header-section">
          <div className="page-header-content">
            <div>
              <h1 className="page-title">View Divisions</h1>
              <p className="page-subtitle">Browse and view all divisions in the system</p>
            </div>
            <div className="header-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                    <line x1="9" y1="9" x2="21" y2="9"></line>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Total</span>
                  <span className="stat-value">{departments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Info Section */}
          <section className="content-section">
            <div className="section-card">
              <div className="info-section">
                <div className="info-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="info-content">
                  <h2 className="section-title">User Profile</h2>
                  <p>
                    {role === "admin" 
                      ? "You have full administrative access to manage divisions and users."
                      : "You have view-only access. You can browse divisions but cannot make changes."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Stats Section */}
          <section className="content-section">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">Overview</h2>
              </div>
              <div className="quick-info-grid">
                <div className="quick-info-item">
                  <div className="quick-info-icon" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", border: "1px solid rgba(99, 102, 241, 0.3)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3>Total Divisions</h3>
                    <p className="quick-info-value">{departments.length}</p>
                  </div>
                </div>

                <div className="quick-info-item">
                  <div className="quick-info-icon" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3>Active</h3>
                    <p className="quick-info-value">
                      {departments.filter(d => {
                        const status = d.status.toLowerCase().replace(/\s+/g, '-');
                        return status.includes('enterprise') || status.includes('department') || 
                               status.includes('branch') || status.includes('regional') || 
                               status.includes('central') || status === 'active';
                      }).length}
                    </p>
                  </div>
                </div>

                <div className="quick-info-item">
                  <div className="quick-info-icon" style={{ background: "rgba(239, 68, 68, 0.15)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div>
                    <h3>Inactive</h3>
                    <p className="quick-info-value">
                      {departments.filter(d => d.status.toLowerCase() === "inactive").length}
                    </p>
                  </div>
                </div>

                <div className="quick-info-item">
                  <div className="quick-info-icon" style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24", border: "1px solid rgba(251, 191, 36, 0.3)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3>Pending</h3>
                    <p className="quick-info-value">
                      {departments.filter(d => d.status.toLowerCase() === "pending").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Organizations Table Section */}
          <section className="content-section">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">All Divisions</h2>
                <span className="section-badge">{departments.length} {departments.length === 1 ? "division" : "divisions"}</span>
              </div>

              {loading ? (
                <div className="loading-state">
                  <span className="spinner"></span>
                  <p>Loading divisions...</p>
                </div>
              ) : departments.length === 0 ? (
                <div className="empty-state">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <p>No divisions found</p>
                  <span>There are currently no divisions available</span>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="departments-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Division Name</th>
                        <th>Description</th>
                        <th>System</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((dept) => (
                        <tr key={dept.id}>
                          <td>
                            <span className="abbreviation-badge">{dept.abbreviation}</span>
                          </td>
                          <td className="name-cell">{dept.name}</td>
                          <td className="description-cell">{dept.description}</td>
                          <td>
                            <span className={`status-badge status-${dept.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {dept.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
