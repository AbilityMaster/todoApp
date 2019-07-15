var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var jsonParser = bodyParser.json();



app.use(express.static(__dirname));
app.set('port', 8080);

app.get("/api/users", function(req, res){
    const fileData = fs.readFileSync("config.json", "utf8");
    const config = JSON.parse(fileData);
    res.send(config);
});

app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const data = JSON.stringify(req.body);

    fs.writeFileSync("config.json", data);
    res.send(data);
});

app.put("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const fileData = fs.readFileSync("config.json", "utf8");
    const config = JSON.parse(fileData);
    const idTask = req.body.idTask;
    const checked = req.body.checked;

    const task = config.find( value => (value.id === idTask));
    task.isDone = checked;

    const data = JSON.stringify(config);

    fs.writeFileSync("config.json", data);
    res.send(data);
});

app.put("/api/todo/modify", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const fileData = fs.readFileSync("config.json", "utf8");
    const config = JSON.parse(fileData);
    const idTask = req.body.idTask;
    const content = req.body.data;

    const task = config.find( value => (value.id === idTask));
    task.description = content;

    const data = JSON.stringify(config);

    fs.writeFileSync("config.json", data);
    res.send(data);
});

app.delete("/api/users/:idTask", function(req, res){
    const fileData = fs.readFileSync("config.json", "utf8");
    const config = JSON.parse(fileData);
    const idTask = req.params.idTask;

    const delIndex = config.findIndex( value => (value.id === idTask));
    config.splice(delIndex, 1);

    const data = JSON.stringify(config);

    fs.writeFileSync("config.json", data);
    res.send(data);
});


app.listen(app.get('port'), function(){
    console.log("Сервер ожидает подключения...");
});