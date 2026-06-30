import { Link } from "react-router";

export function NotFound() {
  return (
    <main className="flex w-full flex-col mx-auto max-w-2xl items-start gap-8 px-4 py-20">
      <section>
        <h1 className="text-3xl">404</h1>
        <p>Page not found.</p>
        <Link to="/">Go home</Link>
      </section>
    </main>
  );
}
