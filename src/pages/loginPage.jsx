import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );

      console.log("Login submitted:", response.data);
      toast.success("Login successfull!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);

      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "Account not found") {
        toast.error("Account not found");
        return;
      }

      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "Invalid Credentials") {
        toast.error("Invalid Password");
        return;
      }

      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-150 shadow-2xl rounded-2xl mt-20 p-8 bg-amber-50/40">
      <h2 className="mt-4 text-2xl font-semibold text-amber-700 text-center">
        Login to your assignment account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-4 p-6 rounded-xl"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm text-[#0f172b] mb-1.5"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="johndoe@email.com"
            className="bg-white border border-[#1bdbed] rounded-md w-full px-4 py-3 mr-20 text-md"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm text-[#0f172b] mb-1.5"
          >
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="myP@ssword"
              className="bg-white border border-[#1bdbed] rounded-md w-full px-4 py-3 pr-12 text-md"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <span className="material-symbols-outlined">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="block mx-auto mt-12 bg-[#05c689] hover:bg-[#5ee9b5] rounded-md px-20 py-2 text-lg"
        >
          Log In
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="block mx-auto text-center text-md hover:text-[#05c689]"
        >
          Don't have an account?
        </button>
      </form>
    </div>
  );
}
