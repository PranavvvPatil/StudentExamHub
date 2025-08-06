import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    
    try {
      await axios.post("http://localhost:5001/api/auth/register", data);
      
      // On success, navigate to the login page
      navigate("/login");

    } catch (err) {
     
      if (axios.isAxiosError(err) && err.response) {
        
        setError(err.response.data.message || "Registration failed. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-max md:mt-[110px] md:mb-[146.5px] mt-auto mb-auto">
      <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto space-y-4 bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        {/* 5. Display the error message to the user */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          className="block w-full border p-2 rounded"
          placeholder="Name"
          required
          onChange={e => setData({ ...data, name: e.target.value })}
        />
        <input
          className="block w-full border p-2 rounded"
          placeholder="Email"
          required
          type="email"
          onChange={e => setData({ ...data, email: e.target.value })}
        />
        <input
          className="block w-full border p-2 rounded"
          placeholder="Password"
          required
          type="password"
          onChange={e => setData({ ...data, password: e.target.value })}
        />
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
