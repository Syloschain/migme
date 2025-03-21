
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E0F7FF] to-[#B3E5FC] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-migblue mb-2">migme</h1>
          <p className="text-migblue-dark">Connect, chat, and have fun</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
