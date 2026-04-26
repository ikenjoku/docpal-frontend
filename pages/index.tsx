import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { BadgeCheck, Bot, Pill, ShieldCheck, Zap } from "lucide-react";

const quickPrompts = [
  "aspirin",
  "compare aspirin vs ibuprofen",
  "side effects of metformin",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eef5ff_0%,#f8fbff_42%,#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col gap-6">
        <header className="rounded-[28px] border border-blue-100 bg-white/85 px-5 py-4 shadow-[0_24px_80px_rgba(37,99,235,0.10)] backdrop-blur sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-500">DocPal</p>
                <h1 className="text-xl font-semibold text-slate-900">AI Drug Intelligence</h1>
              </div>
            </div>

            <SignedOut>
              <div className="flex flex-wrap items-center gap-3">
                <SignInButton mode="modal">
                  <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-blue-50">
                    Create account
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3">
                <Link
                  href="/chat"
                  className="inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Open chat
                </Link>
                <div className="rounded-full bg-blue-50 p-1.5">
                  <UserButton />
                </div>
              </div>
            </SignedIn>
          </div>
        </header>

        <section className="overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_24px_80px_rgba(37,99,235,0.14)]">
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-6 py-8 text-white sm:px-8 sm:py-10">
            <div className="max-w-3xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/18 backdrop-blur">
                <Pill className="h-7 w-7" />
              </div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Medication answers with a cleaner path from question to FDA-backed summary.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50/88 sm:text-base">
                Ask direct drug questions, compare medications, and review concise label-based summaries in a chat
                interface designed for fast lookup.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
                      Start with DocPal
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                      Create an account
                    </button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/chat"
                    className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    Continue to chat
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">Grounded in label data</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Keep questions anchored to FDA drug label information instead of generic search summaries.
                </p>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">Simple comparison flow</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Ask for a single drug summary or compare two medications in the same conversation.
                </p>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">Fast chat-first workflow</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Open the workspace and ask immediately without moving through dense forms or dashboards.
                </p>
              </div>

              <div className="rounded-3xl border border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">Consistent product feel</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The landing and chat views now share the same visual system, spacing, and tone.
                </p>
              </div>
            </div>

            <aside className="rounded-[26px] border border-dashed border-blue-200 bg-blue-50/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-500">Try These</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">Start with a direct prompt</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The fastest path into the product is the same as the chat page: ask a concrete medication question.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <Link
                    key={prompt}
                    href="/chat"
                    className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    {prompt}
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-4 text-sm text-slate-600">
                Signed in users can jump straight into the workspace from here. New users can authenticate first and
                then continue into the same chat interface.
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}