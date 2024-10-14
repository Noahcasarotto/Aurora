import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-lg">Distributed Compute System</div>
        <div className="space-x-4">
          <Link className="text-gray-300 hover:text-white" href="/">Login</Link>
          <Link className="text-gray-300 hover:text-white" href="/dashboard">Dashboard</Link>
          <Link className="text-gray-300 hover:text-white" href="/job-monitoring">Job Monitoring</Link>
          <Link className="text-gray-300 hover:text-white" href="/job-submission">Job Submission</Link>
          <Link className="text-gray-300 hover:text-white" href="/settings">Settings</Link>
        </div>
      </div>
    </nav>
  );
}
