import "./login.css";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <button type="submit" onClick={() => {
            navigate("/home");
          }}>
            Login
          </button>
        </form>
        <p className="signup-link">Don't have an account? <a href="/Signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;