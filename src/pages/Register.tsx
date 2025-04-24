
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-gray-600 mt-2">
            Join us and start booking your perfect stays
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
