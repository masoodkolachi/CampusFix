import { useAuth } from "../context/AuthContext.jsx";

export default function StudentHome() {
  const { user } = useAuth();

  return (
    <section className="panel">
      <h1>Hello, {user.name}</h1>
      <p className="muted">Your reports will show up here. Report submission arrives next week.</p>
    </section>
  );
}
