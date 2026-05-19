import { Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const AuthLayout = () => {
  return (
    <div className="relative flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-zinc-950 p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Smart Leads</span>
        </div>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold leading-tight text-white"
          >
            Manage your pipeline
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              like a pro.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-md text-zinc-400"
          >
            Track leads, filter your pipeline, and close deals faster with a modern dashboard built
            for sales teams.
          </motion.p>
        </div>

        <div className="flex gap-8">
          {[
            { value: '10k+', label: 'Leads tracked' },
            { value: '98%', label: 'Uptime' },
            { value: '4.9★', label: 'User rating' }
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-12 dark:bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-zinc-900 dark:text-white">Smart Leads</span>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-card dark:border-zinc-800 dark:bg-zinc-900">
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
