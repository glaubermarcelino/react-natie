const express = require("express");
const OngController = require("../src/controllers/OngController");
const IncidentController = require("../src/controllers/IncidentController");
const ProfileController = require("../src/controllers/ProfileController");
const SessionController = require("../src/controllers/SessionController");


var routes = express.Router();

routes.post('/sessions',SessionController.create);
//Ongs
routes.post("/ongs",OngController.create);
routes.get("/ongs",OngController.index);
routes.get("/ongs/:id",OngController.listById);

//Incidents
routes.get("/incidents",IncidentController.index);
routes.get("/incidents/:id",IncidentController.listById);
routes.post("/incidents",IncidentController.create);
routes.delete("/incidents/:id",IncidentController.delete);

//Incidents/ProfileController
routes.get("/profile",ProfileController.index);

module.exports = routes;