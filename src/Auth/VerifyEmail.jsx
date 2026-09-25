import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HoverField from "./HoverField";

const CODE_LENGTH = 6;

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    const clean = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);

    if (clean && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setDigits(next);
    inputsRef.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const isComplete = digits.every((d) => d !== "");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#10151B]">
      {/* Dial + copy */}
      <div className="relative flex flex-col justify-center items-center gap-8 px-10 py-16 md:w-1/2">
        <HoverField />
        <div className="text-center max-w-xs">
          <h1 className="font-display text-3xl text-[#EDE6D6] tracking-tight">MyCloud</h1>
          <p className="mt-3 text-sm text-[#8B95A1] leading-relaxed">
            One last check, then the vault is yours.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center bg-[#EDE6D6] px-8 py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="font-display text-2xl text-[#10151B] mb-1">Check your email</h2>
          <p className="text-sm text-[#5B6672] mb-8">
            Enter the 6-digit code we sent you.
          </p>

          <div className="flex justify-between gap-2 mb-8" onPaste={handlePaste}>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                inputMode="numeric"
                maxLength={1}
                className="w-11 h-13 text-center text-lg bg-transparent border-b-2 border-[#C8BFA8] focus:border-[#B98D3E] outline-none text-[#10151B] transition-colors"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!isComplete}
            className="w-full bg-[#10151B] text-[#EDE6D6] py-3 font-medium hover:bg-[#B98D3E] hover:text-[#10151B] transition-colors disabled:opacity-40 disabled:hover:bg-[#10151B] disabled:hover:text-[#EDE6D6]"
          >
            Verify
          </button>

          <p className="mt-8 text-sm text-[#5B6672]">
            Didn't get a code?{" "}
            <button
              type="button"
              className="text-[#10151B] underline decoration-[#B98D3E] decoration-2 underline-offset-4"
            >
              Resend it
            </button>
          </p>

          <p className="mt-4 text-sm text-[#5B6672]">
            <Link
              to="/login"
              className="text-[#10151B] underline decoration-[#B98D3E] decoration-2 underline-offset-4"
            >
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}