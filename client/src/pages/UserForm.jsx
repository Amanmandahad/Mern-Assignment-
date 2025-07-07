import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function UserForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", dob: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, dob } = form;

    if (!firstName || !lastName || !dob) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/user", form);
     
      toast.success("Form submitted successfully!");
      navigate("/display");
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Enter Your Details
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
            className="w-full border cursor-pointer border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
