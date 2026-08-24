import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  return (
    <div className="signup">
      <div className="signup-form">
        <h2>Signup</h2>
        <form>
          <input type="text" placeholder="Enter your name" />
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <button type="submit" onClick={() => navigate("/verify-email")}>Signup</button>
        </form>
        <p className="login-link">Already have an account?<a href="/Login">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;