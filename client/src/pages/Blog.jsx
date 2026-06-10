import { blogPosts } from "../lib/data";

export default function Blog() {
  return (
    <section className="container-page py-16">
      <h1 className="section-title">Health Blog</h1>
      <p className="section-copy">Patient education articles for preventive care, emergency awareness, and family wellness.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.title} className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-slate-900">
            <p className="text-sm font-bold text-ocean-700 dark:text-ocean-100">{post.category}</p>
            <h2 className="mt-3 text-xl font-bold">{post.title}</h2>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{post.minutes}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
