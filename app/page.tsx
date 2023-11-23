"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [remoteId, setRemoteId] = useState("");
  const { push } = useRouter();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          push(`/${remoteId}`);
        }}
      >
        <input
          className="bg-slate-200 px-4 py-2"
          placeholder="Insert id"
          type="text"
          onChange={(e) => setRemoteId(e.target.value)}
        />
        <button type="submit">Acessar</button>
      </form>
    </div>
  );
}
