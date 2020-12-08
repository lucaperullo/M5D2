const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const router = express.Router();

router.get("/", (req, res) => {
  //filepath
  const studPath = path.join(__dirname, "students.json");
  //reading file from file path "students.json"
  const fileBleepBloop = fs.readFileSync(studPath);
  //converting in to string
  const fileString = fileBleepBloop.toString();
  //parsing as JSON
  const studentsArray = JSON.parse(fileString);
  //sending response to client
  res.send(studentsArray);
});

//filtered student by id
router.get("/:id", (req, res) => {
  const studPath = path.join(__dirname, "students.json");
  const fileBleepBloop = fs.readFileSync(studPath);
  const fileString = fileBleepBloop.toString();
  const studentsArray = JSON.parse(fileString);
  // defining the id param
  let peppiti = req.params.id;
  //filtering the students.json with defined id in the URL
  let fltredStudent = studentsArray.find((stud) => stud.ID === peppiti);
  //response to client again
  res
    .status(fltredStudent ? 200 : 404)
    .send(fltredStudent || { message: "not found!" });
});

//post method
router.post("/", (req, res) => {
  //defining filepath as studPath
  const studPath = path.join(__dirname, "students.json");
  //reading the students.json with fs.read
  const fileBleepBloop = fs.readFileSync(studPath);
  //converting the read file into a string
  const fileString = fileBleepBloop.toString();
  //parsing the previous string into a json
  const studentsArray = JSON.parse(fileString);

  //assining the body that will be requested from the client to a variable
  const newStud = req.body;
  //assign a random id to the newStud that will be created from the client
  newStud.ID = uniqid();
  //push the just created student to the studArray
  studentsArray.push(newStud);
  //re write the array with the fs.writeFileSync funcion "so with ()" and then JSON.stringify the whole array
  fs.writeFileSync(studPath, JSON.stringify(studentsArray));
  //setting the response status + answering with new student id
  res.status(201).send({ id: newStud.ID });
});

//put method
router.put("/:id", (req, res) => {
  //selecting the path for any user
  const studPath = path.join(__dirname, "students.json");
  //reading the path with fs.readFileSync function "so with ()"
  const fileBleepBloop = fs.readFileSync(studPath);
  //converting the file into a string
  const fileString = fileBleepBloop.toString();
  //parsing the previous file into a JSON
  const studentsArray = JSON.parse(fileString);
  //creating new array without shit
  const newStudentsArray = studentsArray.filter(
    (student) => student.ID !== req.params.id
  );
  //the client modify the actual array and just do a put request to the students.json
  const modifiedStudent = req.body;
  //replacing the past array in order
  modifiedStudent.ID = req.params.id;
  //repushing the array with the new changes
  newStudentsArray.push(modifiedStudent);
  //fs.writing the new array
  fs.writeFileSync(studPath, JSON.stringify(newStudentsArray));
  //sending response to the client
  res.send("Modified array fag");
});

//delete method
router.delete("/:id", (req, res) => {
  //selecting the path for anybody
  const studPath = path.join(__dirname, "users.json");
  //
  const fileBleepBloop = fs.readFileSync(usersFilePath);
  //
  const fileString = fileBleepBloop.toString();
  //
  const studentsArray = JSON.parse(fileString);
  //
  const newStudentsArray = studentsArray.filter(
    (user) => user.ID !== req.params.id
  );
  //
  fs.writeFileSync(studPath, JSON.stringify(newStudentsArray));
  //
  res.status(204).send();
});
module.exports = router;
