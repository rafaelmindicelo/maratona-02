const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/profileController");
const JobController = require("./controllers/jobController");
const DashboardController = require("./controllers/dashboardController");

routes.get("/", DashboardController.index);
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;