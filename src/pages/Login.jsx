import "./Login.css";

function Login() {
  return (
    <main>
      <nav className="navbar">
        <div className="logo">SkillBridge</div>
        <ul className="nav-links">
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>
            <a href="#">Find Jobs</a>
          </li>
          <li>
            <a href="#">Learn</a>
          </li>
          <li>
            <a href="#">Community</a>
          </li>
        </ul>
      </nav>

      <div className="login-container">
        <h2>Welcome Back</h2>

        <button className="social-btn google">Continue with Google</button>
        <button className="social-btn linkedin">Continue with LinkedIn</button>

        <div className="separator">
          <span>or</span>
        </div>

        <form id="login-form">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <a href="signup.html">Sign Up</a>
        </p>
      </div>
    </main>
  );
}

export default Login;
