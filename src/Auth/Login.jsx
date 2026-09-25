import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HoverField from "./HoverField";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#10151B]">
      {/* Dial + copy */}
      <div className="relative flex flex-col justify-center items-center gap-8 px-10 py-16 md:w-1/2">
        <HoverField />
        <div className="text-center max-w-xs">
          <h1 className="font-display text-3xl text-[#EDE6D6] tracking-tight">MyCloud</h1>
          <p className="mt-3 text-sm text-[#8B95A1] leading-relaxed">
            Your files, kept on your own machine. Hover over the blobs while you wait —
            it doesn't do anything, but it feels nice.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center bg-[#EDE6D6] px-8 py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="font-display text-2xl text-[#10151B] mb-1">Enter your vault</h2>
          <p className="text-sm text-[#5B6672] mb-8">Sign in to see your files.</p>

          <label className="block text-xs text-[#5B6672] mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full bg-transparent border-b border-[#C8BFA8] focus:border-[#B98D3E] outline-none py-2 mb-6 text-[#10151B] placeholder:text-[#A79E8A] transition-colors"
          />

          <label className="block text-xs text-[#5B6672] mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative mb-8">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-transparent border-b border-[#C8BFA8] focus:border-[#B98D3E] outline-none py-2 pr-14 text-[#10151B] placeholder:text-[#A79E8A] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-0 top-2 text-xs text-[#5B6672] hover:text-[#B98D3E] transition-colors"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#10151B] text-[#EDE6D6] py-3 font-medium hover:bg-[#B98D3E] hover:text-[#10151B] transition-colors"
          >
            Log in
          </button>

          <p className="mt-8 text-sm text-[#5B6672]">
            New here?{" "}
            <Link
              to="/signup"
              className="text-[#10151B] underline decoration-[#B98D3E] decoration-2 underline-offset-4"
            >
              Set up your vault
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}