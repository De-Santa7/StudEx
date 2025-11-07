"use client";

import { useRouter, useParams } from "next/navigation";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams(); // already resolved, no React.use() needed
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem("studexUsers");
    if (saved && params?.id) {
      const allUsers = JSON.parse(saved);

      const found = allUsers.find(
        (u: any) => String(u.id ?? u._id) === String(params.id)
      );

      setUser(found);
    }
  }, [params?.id]);

  if (!user) {
    return (
      <main className="min-h-screen bg-white text-gray-800 px-6 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft size={18} />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">User not found</h1>
          <p className="text-gray-500 mt-2">
            The requested user could not be found in localStorage.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft size={18} />
          Back
        </Button>

        {/* User Details */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">
            {user.name}
          </h1>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {user.role}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phone || "—"}
            </p>
            <p>
              <span className="font-semibold">Joined:</span>{" "}
              {user.joined || "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
