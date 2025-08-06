import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); 

    try {
      
      const res = await axios.post("https://student-exam-api.onrender.com/api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/exam";
    } catch (err) {
      
      if (axios.isAxiosError(err) && err.response) {
        
        setError(err.response.data.message || "Login failed. Please check your credentials.");
      } else {
        
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto md:mt-[150px] md:mb-[165px] mt-auto mb-auto space-y-6 bg-white p-8 shadow rounded">
      <h2 className="text-2xl font-bold">Login</h2>
      
      
      {error && <p className="text-red-500 text-center">{error}</p>}

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
      <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">Login</button>
    </form>
  );
}
