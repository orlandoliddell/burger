const mysql = require("mysql");
const express = require("express");
const exphbs = require("express-handlebars");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars");

var PORT = process.env.PORT || 8000;

var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "lidd0501",
        database: "burger_db"
    });
};


connection.connect(function (err) {
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {

    connection.query("Select * FROM burgers", function(err, burgers) {
        console.log(burgers);
        var burgersUneaten = burgers.filter(val => {
            return !val.devoured
        });
        var burgersEaten = burgers.filter(val => {
            return val.devoured
        })

        res.render("index", { burgersUneaten: burgersUneaten, burgersEaten: burgersEaten})
    })

})

app.post("/api/burger", function(req, res) {

    connection.query("INSERT INTO burgers SET ?", 
    {
        name: req.body.name
    }, 
    function(err, burgers) {
        console.log(burgers);
        res.json(burgers);
    })

})

app.put("/api/burger/:id", function(req, res) {

    connection.query("UPDATE employee SET ? WHERE ?",
    [
        {
            devoured: true
        },
        {
            id: req.params.id
        }
    ]), 
    function (err, burger) {
        console.log(burger);
        res.json(burger);
    }

});


app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});