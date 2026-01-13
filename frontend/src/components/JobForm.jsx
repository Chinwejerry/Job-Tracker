import { useState } from "react";

function JobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    location: "",
    status: "Applied",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newJob = await res.json();

      onJobAdded(newJob);

      setFormData({
        companyName: "",
        position: "",
        location: "",
        status: "Applied",
      });
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-sm border mb-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">Add New Job</h2>

      <input
        type="text"
        name="companyName"
        placeholder="Company name"
        value={formData.companyName}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="text"
        name="location"
        placeholder="Location (e.g. Remote, Berlin)"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Job
      </button>
    </form>
  );
}

export default JobForm;
