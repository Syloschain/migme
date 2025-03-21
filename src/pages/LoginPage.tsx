
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">migme</h1>
          <p className="text-muted-foreground">Connect, chat, and have fun</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
