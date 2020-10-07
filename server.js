const express=require('express');
const bodyParser=require('body-parser');
const axios=require('axios');
const ejs=require('ejs');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", ejs);

app.get('/', function(req, res){
    res.render("index.ejs", {countryEJS: ''});
});

app.post('/',function(req,res){
    let country=req.body.country;
    let url=`https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    
    axios.get(url)
    .then(function(response){
        
        let countryObject = response.data[0];
        
        console.log(countryObject);
        
        console.log(countryObject.languages[0].nativeName);
        res.render("index.ejs", {countryEJS: countryObject})
    })
    .catch(function(error){
        console.log(error);
    });

});
//your server will start on both localhost and the heroku servers
app.listen(process.env.PORT || 3400,()=>{
    console.log('Server is running on port 3400.');
});
