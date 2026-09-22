import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://zyetechassignmentbackend-1.onrender.com";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    day: "",
    month: "",
    year: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get("https://countries.dev/countries");

        console.log(response.data);
        setCountries(response.data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoadingCountries(false);
      }
    };

    getCountries();
  }, []);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = "Surname is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!data.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!data.day) {
      newErrors.day = "Please select a day";
    }

    if (!data.month) {
      newErrors.month = "Please select a month";
    }

    if (!data.year) {
      newErrors.year = "Please select a year";
    }

    if (!data.country) {
      newErrors.country = "Please select your country";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newErrors = validateForm();

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
      const token = response.data?.token;

      if (token) {
        Cookies.set("token", token, { expires: 7 });
      }

      console.log("Account created:", response.data);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);

      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "Email already in use"
      ) {
        toast.error("This email is already registered. Please log in.", {
          autoClose: 3000,
          onClose: () => {
            navigate("/login");
          },
        });

        return;
      }

      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto mt-20 w-fit px-16 max-w-180">
      <h1 className="text-xl font-bold text-amber-700">Assignment</h1>
      <h2 className="text-3xl font-semibold">Get started on Backend</h2>
      <p className="mt-1 text-md wrap-break-word">
        Create an account to connect with colleagues, students and communities
        of people who share your interests in backend.
      </p>

      <form onSubmit={handleSubmit} className="mb-20">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-semibold">Name</label>

          <span className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="bg-white border border-black/50 rounded-lg px-4 py-3"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                placeholder="Surname"
                className="bg-white border border-black/50 rounded-lg px-4 py-3"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </span>
        </div>

        <div className="mt-3">
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="judepaul@email.com"
            className="bg-white border border-black/50 rounded-lg w-full px-4 py-3 mr-20 text-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mt-3 flex flex-col">
          <label htmlFor="gender" className="text-lg font-semibold">
            Gender
          </label>

          <span className="grid grid-cols-3 gap-4">
            <label className="border border-black/50 rounded-lg p-3 cursor-pointer flex items-center justify-between">
              <span>Male</span>

              <input
                type="radio"
                name="gender"
                checked={data.gender === "male"}
                onChange={handleChange}
                value="male"
              />
            </label>

            <label className="border border-black/50 rounded-lg p-3 cursor-pointer flex items-center justify-between">
              <span>Female</span>

              <input
                type="radio"
                name="gender"
                value="female"
                checked={data.gender === "female"}
                onChange={handleChange}
              />
            </label>

            <label className="border border-black/50 rounded-lg p-3 cursor-pointer flex items-center justify-between">
              <span>Custom</span>

              <input
                type="radio"
                name="gender"
                value="custom"
                checked={data.gender === "custom"}
                onChange={handleChange}
              />
            </label>
          </span>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block mt-3 mb-2 text-lg font-semibold">
            Date of Birth
          </label>

          <div className="flex gap-4">
            <div className="flex-1">
              <select
                name="day"
                value={data.day}
                onChange={handleChange}
                className="border border-black/50 rounded-lg p-2 flex-1"
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.day && (
                <p className="text-red-500 text-sm mt-1">{errors.day}</p>
              )}
            </div>

            <div className="flex-1">
              <select
                name="month"
                value={data.month}
                onChange={handleChange}
                className="border border-black/50 rounded-lg p-2 flex-1"
              >
                <option value="">Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              {errors.month && (
                <p className="text-red-500 text-sm mt-1">{errors.month}</p>
              )}
            </div>

            <div className="flex-1">
              <select
                name="year"
                value={data.year}
                onChange={handleChange}
                className="border border-black/50 rounded-lg p-2 flex-1"
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">{errors.year}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="country" className="block mb-2 text-lg font-semibold">
            Country
          </label>

          <select
            id="country"
            name="country"
            value={data.country}
            onChange={handleChange}
            className="border border-black/50 rounded-lg p-3 w-full"
          >
            <option value="">
              {loadingCountries
                ? "Loading countries..."
                : "Select your country"}
            </option>

            {countries.map((country) => (
              <option key={country.alpha2Code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>

        <div className="mt-3">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-semibold"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="bg-white border border-black/50 rounded-lg w-full px-4 py-3 pr-12"
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              <span className="material-symbols-outlined">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mt-3">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-lg font-semibold"
          >
            Confirm Password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="bg-white border border-black/50 rounded-lg w-full px-4 py-3 pr-12"
            />

            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide confirm password" : "Show confirm password"
              }
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              <span className="material-symbols-outlined">
                {showConfirmPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="block mx-auto mt-6 w-full bg-[#0064e0] hover:bg-[#0d5dbe] text-white text-center rounded-3xl p-3"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="block mx-auto mt-2 w-full bg-white hover:bg-[#d7dee2] text-black/85 font-semibold text-center rounded-3xl p-3"
        >
          I already have an account
        </button>
      </form>
    </div>
  );
}
