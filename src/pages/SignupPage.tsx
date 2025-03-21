
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">migme</h1>
          <p className="text-muted-foreground">Join our global community</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
