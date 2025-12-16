import Navbar from "../components/navbar";
import { useState } from "react";

const Register: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          {/* Title */}
          <h1 className="text-xl font-semibold mb-8">
            Create New Account
          </h1>

          {/* Avatar */}
          <div className="mb-8">
            <p className="mb-3 text-sm text-white/70">Choose Picture</p>

            <label className="mx-auto flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-dashed border-white/30 hover:border-white/60 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setAvatar(e.target.files?.[0] || null)
                }
              />

              {!avatar ? (
                <svg
                  className="h-6 w-6 text-white/50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5V6a2.25 2.25 0 012.25-2.25h4.636a2.25 2.25 0 011.591.659l1.636 1.636a2.25 2.25 0 001.591.659H18A2.25 2.25 0 0120.25 9v7.5"
                  />
                </svg>
              ) : (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              )}
            </label>

            <p className="mt-2 text-xs text-white/40">
              Choose Picture
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4 text-left">
            {/* Username */}
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Username
              </label>
              <div className="flex items-center rounded-lg bg-white/10 px-3 py-2">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Email
              </label>
              <div className="flex items-center rounded-lg bg-white/10 px-3 py-2">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Password
              </label>
              <div className="flex items-center rounded-lg bg-white/10 px-3 py-2">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="mb-1 block text-xs text-white/60">
                Country (optional)
              </label>
              <select className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none">
                <option>Select...</option>
                <option>Indonesia</option>
                <option>United States</option>
                <option>Japan</option>
              </select>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-white/20 py-2 text-sm font-semibold hover:bg-white/30 transition"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3 text-xs text-white/40">
            <div className="h-px flex-1 bg-white/10" />
            Or continue with
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* OAuth */}
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#5865F2] py-2 text-sm font-medium hover:brightness-110 transition">
              Continue with Discord
            </button>

            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-sm font-medium text-black hover:bg-gray-100 transition">
              Continue with Google
            </button>
          </div>

          {/* Login */}
          <p className="mt-6 text-sm text-white/50">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/40">
        <p className="mb-2">
          Read Comics, manga, manhua, manhwa, translated swiftly.
          Vortex, your ultimate library.
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <a href="#">Privacy Policy</a>
          <a href="#">DMCA</a>
          <a href="#">Discord</a>
        </div>
        <div className="text-white/30">
          © 2025 All Rights Reserved · v1.5
        </div>
      </footer>
    </div>
  );
};

export default Register;
