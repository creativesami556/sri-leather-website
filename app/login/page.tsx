"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Clear messages on tab switch
  useEffect(() => {
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (activeTab === "login") {
        // Sign In
        const { error } = await supabaseBrowser.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg("Logged in successfully! Redirecting...");
          // Migrate guest wishlist to user wishlist
          const guestWish = localStorage.getItem("sri_leather_wishlist");
          const { data: { user } } = await supabaseBrowser.auth.getUser();
          if (user && guestWish) {
            localStorage.setItem(`sri_leather_wishlist_${user.id}`, guestWish);
            localStorage.removeItem("sri_leather_wishlist");
          }
          
          setTimeout(() => {
            router.push(redirect);
            router.refresh();
          }, 1000);
        }
      } else {
        // Sign Up
        const { data: authData, error: signUpError } = await supabaseBrowser.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: "user",
            },
          },
        });

        if (signUpError) {
          setErrorMsg(signUpError.message);
        } else {
          // Upsert to profiles table if user is successfully registered
          if (authData?.user) {
            try {
              await supabaseBrowser.from("profiles").upsert({
                id: authData.user.id,
                email: email,
                role: "user",
                created_at: new Date().toISOString(),
              });
            } catch (dbError) {
              console.error("DB Profiles setup error (can be ignored if table not created):", dbError);
            }
          }

          // If email confirmation is disabled in Supabase, sign them in automatically
          if (authData?.session) {
            setSuccessMsg("Registration successful! Redirecting...");
            const userId = authData.user?.id;
            const guestWish = localStorage.getItem("sri_leather_wishlist");
            if (userId && guestWish) {
              localStorage.setItem(`sri_leather_wishlist_${userId}`, guestWish);
              localStorage.removeItem("sri_leather_wishlist");
            }
            setTimeout(() => {
              router.push(redirect);
              router.refresh();
            }, 1000);
          } else {
            setSuccessMsg("Account created! Please verify your email to log in.");
            setActiveTab("login");
          }
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-[#d4c3c1]/30 rounded-2xl p-8 shadow-xl space-y-6">
      {/* Brand Header */}
      <div className="text-center">
        <Link href="/">
          <h2 className="font-display-lg text-3xl font-extrabold text-[#321716] tracking-tight">
            Sri Leather
          </h2>
        </Link>
        <p className="text-body-sm text-[#504443] mt-2">
          {activeTab === "login"
            ? "Sign in to access your wishlist, cart, and account profile."
            : "Join us to save handcrafted items and track orders."}
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-[#d4c3c1]/20">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "login"
              ? "border-[#4a2c2a] text-[#321716]"
              : "border-transparent text-[#504443] hover:text-[#321716]"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "signup"
              ? "border-[#4a2c2a] text-[#321716]"
              : "border-transparent text-[#504443] hover:text-[#321716]"
          }`}
        >
          Create Account
        </button>
      </div>

      {/* Feedback Messages */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-900 rounded-xl text-xs font-semibold leading-relaxed">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold leading-relaxed">
          {successMsg}
        </div>
      )}

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === "signup" && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#321716] uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full bg-[#f6f3f2] px-4 py-3 rounded-xl border border-outline-variant/30 focus:border-primary outline-none text-body-sm text-[#1c1b1b]"
              placeholder="e.g. Rajesh Kumar"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-[#321716] uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full bg-[#f6f3f2] px-4 py-3 rounded-xl border border-outline-variant/30 focus:border-primary outline-none text-body-sm text-[#1c1b1b]"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-[#321716] uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            className="w-full bg-[#f6f3f2] px-4 py-3 rounded-xl border border-outline-variant/30 focus:border-primary outline-none text-body-sm text-[#1c1b1b]"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>



        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 bg-[#4a2c2a] text-[#ffdad7] font-bold text-label-uppercase rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase text-xs tracking-wider"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : activeTab === "login" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Footer / Info */}
      <div className="text-center pt-2">
        <Link
          href="/"
          className="text-xs font-bold text-[#4a2c2a] hover:underline flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Return to Storefront
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 bg-[#fcf9f8] py-12">
      <Suspense fallback={
        <div className="w-full max-w-md bg-white border border-[#d4c3c1]/30 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#321716]/10 border-t-[#321716] rounded-full animate-spin"></div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </main>
  );
}
