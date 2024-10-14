import express from "express";
import "dotenv/config";

let app = express();
let port = 3000;

// let __fileName = fileURLToPath(import.meta.url);
// console.log({ __fileName });

// let __dirName = path.dirname(__fileName);
// console.log({ __dirName });

// Use static assets
app.use(express.static("public"));

// Define view templating engine
app.set("view engine", "pug");
app.set("views", "./views");

// Home route
app.get("/", async (req, res) => {
  let query = req.query.q;
  console.log({ query });

  if (query) {
    //   Get location coordinates
    let locationRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    let location = await locationRes.json();

    console.log({ location });

    let { lon, lat } = location.coord;

    //   Get weather info
    let weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    let weather = await weatherRes.json();
    console.log({ weather });

    res.render("index", { weather });
  }
  
  res.render("index");
});

app.listen(port, () => `Server started on port ${port}`);
