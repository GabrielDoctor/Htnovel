"use client";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
export default function Page() {
  const route = useRouter();
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Button color="blue" onClick={() => route.push("/admin")}>
        Return to Manage Book View
      </Button>
      Search Book
    </div>
  );
}
