export default function Footer() {
  return (
    <footer className="bg-sky-700 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-2">📘 Study Management</h3>
          <p className="text-sky-100 text-sm">
            A simple system to plan, track and manage your daily study tasks.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="text-sky-100 text-sm space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
            <li><a href="/register" className="hover:underline">Register</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sky-100 text-sm">Email: support@study.com</p>
          <p className="text-sky-100 text-sm">Web Database Lab Final Project</p>
        </div>
      </div>
      <div className="border-t border-sky-500 text-center text-sky-100 text-sm py-3">
        © {new Date().getFullYear()} Study Management System. All rights reserved.
      </div>
    </footer>
  );
}
