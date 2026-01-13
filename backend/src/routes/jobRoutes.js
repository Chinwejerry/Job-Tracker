import express from "express";
import {
  createJob,
  getJobs,
  updateJobStatus,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/", createJob);
router.put("/:id", updateJobStatus);
router.delete("/:id", deleteJob);

export default router;
