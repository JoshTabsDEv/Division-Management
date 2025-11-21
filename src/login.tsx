import { useState } from "react";
import "./App.css";
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const navigate = useNavigate();

  // === Manual login ===
  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");
    
    try {
      const { data } = await axios.post("/api/login", {
        username,
        password,
      });

      if (data.success) {
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("role", data.role);
        setMessage("Login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => {
          if (data.role === "admin") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/guestdashboard";
          }
        }, 1000);
      } else {
        setMessage(data.message || "Invalid credentials");
        setMessageType("error");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "Server error. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // === Google login ===
  const handleGoogleLogin = async (credentialResponse: any) => {
    setIsLoading(true);
    setMessage("");
    
    try {
      if (!credentialResponse.credential) {
        setMessage("No Google credentials found");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      const res = await axios.post("/api/google-login", {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("role", res.data.role.toLowerCase());

        setMessage("Google login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => {
          if (res.data.role.toLowerCase() === "admin") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/guestdashboard";
          }
        }, 1000);
      } else {
        setMessage(res.data.message || "Google login failed");
        setMessageType("error");
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      setMessage(err.response?.data?.message || "Google login failed");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">
      <div className="login-wrapper-new">
        {/* Top Header Bar */}
        <header className="login-header-bar">
          <div className="header-content">
            <div className="header-logo">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <span className="header-brand">DivHub</span>
            </div>
            <button 
              className="header-register-btn"
              onClick={() => navigate("/register")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              Sign Up
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="login-main-container">
          {/* Left Side - Visual Elements */}
          <div className="login-visual-section">
            <div className="visual-content">
              <div className="visual-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Secure Platform</span>
              </div>
              
              <h1 className="visual-title">Division Management</h1>
              <p className="visual-description">
                Efficiently manage and organize your divisions with our comprehensive platform
              </p>

              <div className="visual-stats">
                <div className="stat-item">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Secure</div>
                </div>
              </div>

              <div className="visual-features">
                <div className="visual-feature">
                  <div className="feature-dot"></div>
                  <span>Real-time collaboration</span>
                </div>
                <div className="visual-feature">
                  <div className="feature-dot"></div>
                  <span>Advanced analytics</span>
                </div>
                <div className="visual-feature">
                  <div className="feature-dot"></div>
                  <span>Role-based access control</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="visual-decorations">
              <div className="decoration-circle circle-1"></div>
              <div className="decoration-circle circle-2"></div>
              <div className="decoration-circle circle-3"></div>
              <div className="decoration-grid"></div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="login-form-section">
            <div className="form-wrapper">
              <div className="form-header">
                <h2>Welcome Back</h2>
                <p>Sign in to access your account</p>
              </div>

              <div className="form-body">
                {message && (
                  <div className={`alert-message ${messageType}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {messageType === "success" ? (
                        <polyline points="20 6 9 17 4 12"></polyline>
                      ) : (
                        <>
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </>
                      )}
                    </svg>
                    <span>{message}</span>
                  </div>
                )}

                <div className="form-field">
                  <div className="field-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Username</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className={message && messageType === "error" && !username ? "field-error" : ""}
                  />
                </div>

                <div className="form-field">
                  <div className="field-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Password</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className={message && messageType === "error" && !password ? "field-error" : ""}
                  />
                </div>

                <button 
                  className="form-submit-btn" 
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="btn-loading">
                      <span className="btn-spinner"></span>
                      Signing in...
                    </span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>

                <div className="form-divider">
                  <div className="divider-line"></div>
                  <span>or continue with</span>
                  <div className="divider-line"></div>
                </div>

                <div className="google-auth-wrapper">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      setMessage("Google login failed");
                      setMessageType("error");
                    }}
                    useOneTap
                  />
                </div>

                <div className="form-footer">
                  <p>
                    Don't have an account?{" "}
                    <button 
                      className="footer-link"
                      onClick={() => navigate("/register")}
                    >
                      Create one now
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
