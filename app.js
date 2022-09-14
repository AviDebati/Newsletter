const express = require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https= require("https");
const { url } = require("inspector");
const { post } = require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", (req,res)=>{
    
var firstName=req.body.fname;
var lastName=req.body.lname;
var email=req.body.email;

var data={
    members:[
        {
        email_address:email,
        status:"subscribed",
        merge_fields: {
            FNAME:firstName,
            LNAME: lastName
        }
    }
    ]
};

const jsonData= JSON.stringify(data);

const url="https://us14.api.mailchimp.com/3.0/lists/5af98924e5"
const options = {
    method:"POST",
    auth:"avijit1986:e3e98b020e996930981c0c760087fe85-us14"
}
const request=https.request(url,options,function(response){
response.on("data", (data)=>{
    console.log(JSON.parse(data));
    if(response.statusCode==200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else
    {
        res.sendFile(__dirname+"/failure.html");
    }
})
})

 request.write(jsonData);
 request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Port running at 3000");
});


// e3e98b020e996930981c0c760087fe85-us14
//5af98924e5