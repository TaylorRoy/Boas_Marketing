// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const sgMail = require('@sendgrid/mail');
let keys = require('./keys.js')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("assets"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });

app.get("/client", function(req, res) {
    res.sendFile(path.join(__dirname, "./client.html"));
  });

app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "contact2.html"));
  });

app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, "./contact2.html"));
    res.sendFile('contact2.html')
});

app.post('/api/contactEmail', function (req, res) {
    sgMail.setApiKey(keys.sendgrid.secret);
    const msg = {
        to: 'charlieboas@gmail.com',
        from: req.body.email,
        // from: 'tbroy@hotmail.com',
        subject: 'From Boas Marketing Website',
        text: req.body.message, 
        // text: 'data test',
        html: '<strong>' + req.body.first_name + " " + req.body.last_name + " wrote: " + req.body.message + "  I can be contacted at: " + req.body.phone + '</strong>',
    };
    sgMail.send(msg)
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});