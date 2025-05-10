import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/user/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link href="/register">
              <a className="font-medium text-primary-600 hover:text-primary-500">
                create a new account
              </a>
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
