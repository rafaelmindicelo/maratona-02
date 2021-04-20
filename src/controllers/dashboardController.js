const Job = require("../model/job");
const Profile = require("../model/profile");
const JobUtils = require("../utils/jobUtils");

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      //ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      //somando a quantidade de status
      statusCount[status] += 1;

      jobTotalHours =
        status !== "done"
          ? jobTotalHours + Number(job["daily-hours"])
          : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    // qtd de horas/dia que quero trabalhar MENOS qdt de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile,
      statusCount,
      freeHours,
    });
  },
};
