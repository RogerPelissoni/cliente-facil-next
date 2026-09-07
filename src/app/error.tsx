"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold">Algo deu errado</h1>
      <button onClick={() => reset()} className="rounded border px-4 py-2">
        Tentar novamente
      </button>
    </div>
  );
}
