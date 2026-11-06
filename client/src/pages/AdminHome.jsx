import { useAuth } from "../context/AuthContext.jsx";

export default function AdminHome() {
  const { user } = useAuth();

  return (
    <section className="panel">
      <h1>Admin dashboard</h1>
      <p className="muted">Signed in as {user.name}. All reports and status controls will appear here.</p>
    </section>
  );
}
