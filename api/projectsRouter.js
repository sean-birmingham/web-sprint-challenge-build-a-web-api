const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

// GET /api/projects
router.get('/', (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the projects' });
    });
});

// GET /api/projects/:id
router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// custom middleware
function validateProjectId(req, res, next) {
  const { id } = req.params;

  Projects.get(id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({
          message: 'The project with the specified ID does not exist'
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the project' });
    });
}
module.exports = router;
