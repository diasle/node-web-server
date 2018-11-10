const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

hbs.registerPartials("views/partials");
//set express related configurations
app.set("view engine", "hbs");

//use middleware
//thanks to next we can say when middleware function is done
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${ now }: ${ req.method } ${ req.url }`;

    //logs everytime user make request to site
    console.log(log);
    fs.appendFile("server.log", log + "\n", (e) => {
        if (e) {
            console.log("Unable to append to file");
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
//     // next();
// });

app.use(express.static("public"));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", (text) => text.toUpperCase());

app.get("/", (req, res) => {
    res.render("home.hbs", {
        title: "Home page",
        welcomeMessage: "Welcome!"
    });
    // res.send("<h1>Hello express</h1>");
    // res.send({
    //     name: "Diana",
    //     like: ["music", "swimming"]
    // })
});

app.get("/about", (req, res) => {
    //render template ste up with current view engine
    res.render("about.hbs", {
        title: "About page",
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Oh no! Something went wrong!"
    })
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});