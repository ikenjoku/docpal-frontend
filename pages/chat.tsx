// frontend/pages/chat.tsx

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Bot, Send, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type ChatResponse = {
  response: string;
  state: Record<string, unknown>;
};

export default function Chat() {
  const { isSignedIn, userId } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiBaseUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "http://localhost:8000",
    [],
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    let mounted = true;

    async function checkHealth() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/health`, {
          method: "GET",
        });

        if (!mounted) return;

        setIsOnline(response.status === 200);
      } catch {
        if (!mounted) return;
        setIsOnline(false);
      }
    }

    void checkHealth();

    const interval = setInterval(() => {
      void checkHealth();
    }, 60_000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [apiBaseUrl]);

  async function sendMessage() {
    const text = input.trim();

    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId || userId || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`DocPal request failed with status ${response.status}`);
      }

      const data = (await response.json()) as ChatResponse;

      if (!sessionId && userId) {
        setSessionId(userId);
      }

      const assistantMessage: Message = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unable to reach DocPal right now.";

      setError(message);

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          content:
            "Sorry, I encountered an error while contacting DocPal. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      void sendMessage();
    }
  }

  if (!isSignedIn) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-10">
        <div className="w-full rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-[0_20px_70px_rgba(37,99,235,0.12)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Bot className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-3xl font-semibold text-slate-900">
            Sign in to use DocPal
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Ask medication questions, compare drugs, and review FDA-backed
            summaries from the chat workspace.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Back to landing page
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-[linear-gradient(180deg,#eef5ff_0%,#f8fbff_42%,#ffffff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-[calc(100vh-3rem)] min-h-0 w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_24px_80px_rgba(37,99,235,0.14)]">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-5 py-5 text-white sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Bot className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-xl font-semibold">DocPal Chat</h1>

                <div className="mt-1 flex items-center gap-2 text-sm text-blue-50/90">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isOnline === null
                        ? "bg-yellow-300"
                        : isOnline
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                  />

                  <span>
                    {isOnline === null
                      ? "Checking..."
                      : isOnline
                      ? "Online"
                      : "Offline"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-full bg-white/15 p-1.5">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        {/* Messages */}
        <section className="min-h-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.10),_transparent_36%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="mt-10 rounded-[24px] border border-dashed border-blue-200 bg-blue-50/60 px-6 py-14 text-center text-slate-600">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg">
                <Bot className="h-8 w-8" />
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-slate-900">
                Ask your first drug question
              </h2>

              <p className="mt-3 text-sm leading-7 sm:text-base">
                Try <strong>“aspirin”</strong> or{" "}
                <strong>“compare aspirin vs ibuprofen”</strong>.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-sm sm:max-w-[75%] ${
                      message.role === "user"
                        ? "rounded-br-md bg-blue-600 text-white"
                        : "rounded-bl-md border border-blue-100 bg-white text-slate-800"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-strong:text-slate-900">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkBreaks]}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap text-sm leading-7">
                        {message.content}
                      </p>
                    )}

                    <p
                      className={`mt-3 text-xs ${
                        message.role === "user"
                          ? "text-blue-100"
                          : "text-slate-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.role === "user" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-white shadow-md">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="mt-4 flex justify-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                <Bot className="h-5 w-5" />
              </div>

              <div className="rounded-2xl rounded-bl-md border border-blue-100 bg-white p-4 shadow-sm">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-300" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-300 [animation-delay:120ms]" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-300 [animation-delay:240ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </section>

        {/* Footer */}
        <footer className="border-t border-blue-100 bg-white px-4 py-4 sm:px-6">
          {error && (
            <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              disabled={isLoading}
            />

            <button
              onClick={() => void sendMessage()}
              disabled={!input.trim() || isLoading}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Press Enter to send a message.
          </p>
        </footer>
      </div>
    </main>
  );
}