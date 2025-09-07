"use client";
export default function Error({error}:{error:Error}){
  return (
    <main className="min-h-dvh grid place-items-center bg-app text-app-ink">
      <div className="text-center">
        <h1 className="h2">Something went wrong</h1>
        <p className="mt-2 lead">{error.message || "Please try again."}</p>
        <a className="mt-4 inline-block underline" href="/">Go home</a>
      </div>
    </main>
  );
}

