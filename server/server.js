import app from "./api/app.js";

// port 8080
const port = 8080;
app.listen(process.env.PORT || port, () => {
  console.log(`server running at ${process.env.PORT || port}`);
});
