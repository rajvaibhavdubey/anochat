var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("landing.ejs");
});
















app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("The server has started!!!");    
});
