import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", rollNumber: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await signup(form);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <h1>Create your account</h1>
      <p className="muted">Students can report problems and follow their progress.</p>
      <form onSubmit={handleSubmit}>
        <label>Full name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>Roll number
          <input name="rollNumber" placeholder="053-24-0011" value={form.rollNumber} onChange={handleChange} />
        </label>
        <label>Password
          <input type="password" name="password" minLength={6} value={form.password} onChange={handleChange} required />
        </label>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button className="btn" disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Sign up"}</button>
      </form>
      <p className="muted">Already registered? <Link to="/login">Log in</Link></p>
    </div>
  );
}
