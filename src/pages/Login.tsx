
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Please enter your details
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
