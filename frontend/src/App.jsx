import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import JobForm from "./components/JobForm";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobAdded = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5001/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const updatedJob = await res.json();

      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === id ? updatedJob : job))
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job application?")) return;

    try {
      await fetch(`http://localhost:5001/api/jobs/${id}`, {
        method: "DELETE",
      });

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };
  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Job Tracker</h1>

        <div className="flex gap-2 mb-6">
          {["All", "Applied", "Interview", "Offer", "Rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        <JobForm onJobAdded={handleJobAdded} />

        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg font-medium">No job applications found</p>
            <p className="text-sm">Try adding one or change the filter</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
