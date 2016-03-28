var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//DB STUFF
mongoose.connect('mongodb://localhost/kennel');
mongoose.model("Pets", new Schema({"pet_name" : String, "pet_type" : String, "pet_age" : String, "pet_pic" : String}));

var Pet = mongoose.model("Pets");



app.get("/pets", function(req,res){
    // pull all pets out of mongo
    Pet.find({}, function(err,data){
        if (err){
            console.log("error in finding pet in get",err)
        }
        console.log("in app.js app.get pets getting ready to send", data);


        res.send(data);
    });
    //res.send("Yupper do");
});


app.delete("/pets/:id", function(req,res){
    console.log("in app js for delete", req.params.id);
    Pet.remove({_id: req.params.id},function(err,data){
        if(err){
            console.log(err);
        }
        res.status(200).send();
    });
});


app.post("/pets", function(req,res){
    console.log(req.body);

    var addedPet = new Pet({"pet_name" : req.body.pet_name, "pet_type" : req.body.pet_type, "pet_age" : req.body.pet_age, "pet_pic" : req.body.pet_pic});
    addedPet.save(function(err, data){
        if(err){
          console.log("Error in saving pet in post",err);
        }

        res.send(data);
    });


});



app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "/public/", file));
});

app.listen(app.get("port"), function(){
    console.log("Listening");
});

module.exports = app;
