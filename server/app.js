const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const port = 5000;

mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).catch(error => { });

mongoose.connection.on("connected", () =>
{
  console.log("Connected yo MOngo DB");
});

mongoose.connection.on("error", (err) =>
{
  console.log("Error connecting ", err.code);
});

require("./Db/user");
require("./Db/Books")

app.use(express.json());
app.use(require("./routes/auth"));


app.listen(port, () =>
{
  console.log("Server is running on ", port);
});
