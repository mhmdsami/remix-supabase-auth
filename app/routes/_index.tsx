import { createSupabaseServerClient } from "~/utils/db.server";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import type { OutletContextType } from "~/types";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix with Supabase Auth" },
    { name: "description", content: "Supabase Auth in Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const supabase = await createSupabaseServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return json({ session: session ?? [] }, { headers: response.headers });
};

export default function Index() {
  const { supabase } = useOutletContext<OutletContextType>();
  const { session } = useLoaderData<typeof loader>();

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="p-10 flex flex-col min-h-screen bg-[#1A181B] gap-2 font-bold text-white">
      <div className="flex justify-between">
        <h1 className="text-3xl flex-col">Remix Supabase Auth</h1>
        <div className="flex gap-5">
          <button
            onClick={handleSignInWithGoogle}
            className="bg-white text-black px-3 py-1 rounded-md"
          >
            Sign In
          </button>
          <button
            onClick={handleSignOut}
            className="bg-white text-black px-3 py-1 rounded-md"
          >
            Sign Out
          </button>
        </div>
      </div>
      <pre className="text-xs overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
