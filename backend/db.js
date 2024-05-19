const mongoose = require('mongoose');

function main(){
    const url ="mongodb+srv://Aman:Aman0112@cluster0.haf5ywe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(res=>{
        console.log("Mongoose Connected")
    }).catch(err=>{
        console.error(`error : ${err}`)
    })
}

module.exports = main