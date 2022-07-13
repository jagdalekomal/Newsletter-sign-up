const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const request= require("request");
const https = require("https");

const app= express();
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/failure", function(req,res){
  res.redirect("/");
})
app.post("/", function(req,res){
  var firstname= req.body.FirstName;
  var lastname= req.body.LastName;
  var email = req.body.email;
  var data = {
      members:[{
          email_address: email,
          status: "subscribed",
          merge_fields:{
            FNAME:firstname,
            LNAME:lastname
          }
      }]
  }

  var jsonData= JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/lists/18aeba385c" ;
const options={
  method:"POST",
  auth: "komal:c7b00639d5dc6046226a60f7546a8378-us14"

}

  const request= https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
      if(response.statusCode===200)
      {
        res.sendFile(__dirname+"/sucess.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
    })
    
      
    
    console.log();
  });
  request.write(jsonData);
  request.end();
    console.log(firstname+" "+ lastname+" "+email);
});

app.listen(process.env.PORT || 3000, ()=> console.log("Server is running on port 3000"));

//c7b00639d5dc6046226a60f7546a8378-us14
//18aeba385c. audience id/ list id
