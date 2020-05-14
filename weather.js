const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res)
{
  const query = req.body.cityname;
  const appid = "46d1b0189dab528de74e65efb816aeed";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/forecast?q="+ query +"&units="+ unit + "&appid="+ appid;

  https.get(url,function(response)
{
  console.log(response.statusCode);
  response.on("data",function(data)
{
  const weatherdata = JSON.parse(data);
  const name = weatherdata.city.name;
  const temp = weatherdata.list[0].main.temp;
  const description = weatherdata.list[0].weather[0].description;
  const icon = weatherdata.list[0].weather[0].icon;
  const imageurl="http://openweathermap.org/img/wn/"+ icon + "@2x.png";
  res.write("<p>The weather is currently " + description +"</p>");
  res.write("<h1>The tempurature in "+ name+" is "+ temp +"</h1>");
  res.write("<img src="+imageurl +" />");
  res.send();

})
});
})
app.listen("3000",function(req,res)
{
  console.log("Started and listenin to post requests");
});
