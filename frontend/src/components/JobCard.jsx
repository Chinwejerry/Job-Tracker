function JobCard({ job, onStatusChange, onDelete }) {
  const statusColors = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.companyName}</h3>
          <p className="text-gray-600">{job.position}</p>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={job.status}
            onChange={(e) => onStatusChange(job._id, e.target.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              statusColors[job.status]
            }`}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <button
            onClick={() => onDelete(job._id)}
            className="text-red-600 hover:text-red-800 text-sm hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
