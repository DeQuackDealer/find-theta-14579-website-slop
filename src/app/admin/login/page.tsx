import { IbisMark } from "@/components/ibis-mark";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <IbisMark className="mx-auto h-10 w-10 text-fg" />
        <h1 className="mt-6 text-center text-2xl text-fg">Admin</h1>
        <p className="mt-1.5 text-center text-sm text-fg-faint">
          Sign in to manage the site.
        </p>
        <LoginForm redirectTo={from && from.startsWith("/admin") ? from : "/admin"} />
      </div>
    </div>
  );
}
