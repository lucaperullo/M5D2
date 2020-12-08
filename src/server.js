//not sure about what that does tbh
const express = require("express");
//assigning the route for students
const studRoutes = require("./students");
//not suere about what that does tbh
const server = express();
//assigning a port so my sv
const port = 4269;
//converting previous thing that im not sure into JSON to allow the post
server.use(express.json());
//not sure tbh
server.use("/students", studRoutes);
//defining how to reach the sv
server.listen(port, () => {
  console.log(`Server running at:${port}/`);
});
