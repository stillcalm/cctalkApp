const Test = require("../models/test.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  
  const test = new Test(req.body.name, req.body.password_hash, req.body.email);

  Test.create(test, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Test.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Test.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Test with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Test with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Test.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Test with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Test with id " + req.params.id,
        });
      }
    } else res.send({ message: `Test was deleted successfully!` });
  });
};
