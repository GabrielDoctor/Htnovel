"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, Checkbox, Label, Card, Avatar } from "flowbite-react";
import Link from "next/link";
import { useAuth } from "../ui/contexts/AuthContext";
import { LockClosedIcon } from "@heroicons/react/20/solid";

export default function SignUp() {
  const router = useRouter();
  const { setUserData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const message = await response.json();
    if (message.error) {
      setErrorMessage(message.error);
    } else {
      setUserData(message);
      setErrorMessage("");
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <div className="flex flex-col items-center">
          <Avatar
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLxhyKjZrplz3gBeZz28lobBbWvKw1VC2SVX6R5RLig&s"
            rounded={true}
          />
          <h5 className="text-xl font-medium leading-tight mt-4">Sign in</h5>
          <form onSubmit={handleSubmit} className="w-full px-4 py-4">
            <div className="mb-4">
              <Label htmlFor="email">Email address</Label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-3 py-2 dark:text-black bg-white border border-gray-300 rounded-md text-sm shadow-sm w-full"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <input
                id="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 px-3 py-2 dark:text-black bg-white border border-gray-300 rounded-md text-sm shadow-sm w-full"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            {errorMessage && (
              <Alert className="m-3" color="failure">
                {errorMessage}
              </Alert>
            )}
            {/* {successMessage && (
              <Alert className="m-3" color="success">
                {successMessage}
              </Alert>
            )} */}
            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </form>
          <div className="flex flex-col justify-between items-center mt-4">
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
            <Link
              href="/signup"
              className="text-sm text-blue-600 hover:underline"
            >
              Dont have an account? Sign Up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
