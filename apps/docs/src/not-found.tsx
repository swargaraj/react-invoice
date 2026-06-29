import { Link } from "react-router";

export function NotFound() {
  return (
    <section>
      <h1 className="text-3xl">404</h1>
      <p>Page not found.</p>
      <Link to="/">Go home</Link>
    </section>
  );
}
