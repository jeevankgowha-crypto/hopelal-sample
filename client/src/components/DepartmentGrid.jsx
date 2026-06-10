import { motion } from "framer-motion";
import { departments } from "../lib/data";

export default function DepartmentGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {departments.map((department, index) => {
        const Icon = department.icon;
        return (
          <motion.article
            key={department.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-slate-900"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ocean-50 text-ocean-700 dark:bg-ocean-900 dark:text-ocean-100">
              <Icon size={24} />
            </span>
            <h3 className="mt-4 font-bold">{department.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{department.description}</p>
          </motion.article>
        );
      })}
    </div>
  );
}
