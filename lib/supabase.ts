import { createBrowserClient, createServerClient } from "@supabase/ssr";

// Suppress Next.js 15 dev overlay for benign Supabase Auth refresh errors
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // Prevent unhandled promise rejections from popping up the dev overlay
  window.addEventListener("unhandledrejection", (event) => {
    const msg = event.reason?.message || "";
    const name = event.reason?.name || "";
    if (msg.includes("Invalid Refresh Token") || name === "AuthApiError") {
      event.preventDefault();
      console.warn("Supabase Auth Warning (Suppressed from overlay):", event.reason);
    }
  });

  // Intercept console.error to filter out library-internal GoTrue error logs
  const originalError = console.error;
  console.error = (...args) => {
    const errorStr = args.map(arg => {
      if (!arg) return "";
      if (typeof arg === "object") {
        return arg.message || arg.name || JSON.stringify(arg);
      }
      return String(arg);
    }).join(" ");
    
    if (errorStr.includes("AuthApiError") || errorStr.includes("Invalid Refresh Token")) {
      console.warn("Supabase Auth Error (Suppressed from overlay):", ...args);
      return;
    }
    originalError(...args);
  };
}

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Auto-format project references into valid HTTPs URLs
if (supabaseUrl && !supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
  supabaseUrl = `https://${supabaseUrl}.supabase.co`;
}

// Gracefully handle missing environment variables in development with clear warnings
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "⚠️ Supabase Configuration Warning: " +
        "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in your .env.local file. " +
        "Supabase features will not function correctly until these variables are configured."
    );
  }
}

// Client-side Supabase Client
export const supabaseBrowser = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);

// Server-side Supabase Client Creator
export async function supabaseServer() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
