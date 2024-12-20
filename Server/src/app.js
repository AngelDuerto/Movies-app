const path = require ("path");
const express = require ("express")
const app = express();
const getMovie = require("./utils/apiMovie")

// PORT
const port = process.env.PORT || 3000;

//Serve static files
app.use(express.static(path.join(__dirname, "../../Client")));

//Define the route for root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Client/index.html"));
});
app.get("/movie", (req, res) => {
    if (!req.query.search) {
        res.send({
        error: "Something went wrong",
    });
        return;
    }

    // Call getMovie function with the search query
    getMovie(req.query.search, (error, data) => {
        if (error) {
            res.send({
            error: "Something went wrong",
        });
            return;
        }
        res.send(data);
    });
});

// Define route for 404 page
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Angel Duerto",
        errorMessage: "Page not Found"
    })
})


//Start the server and listen on defined port
app.listen(port, () => {
    console.log('Server is running on ' + port);
});