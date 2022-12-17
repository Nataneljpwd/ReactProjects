const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(cors());

const mongoUrl='mongodb://127.0.0.1:27017';

mongoose.connect(mongoUrl+"/mem-game",{
    useNewUrlParser:true, 
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected");
}).catch(err => console.error(err));

const user= require('./models/User');
//for now, no user creation
app.get('/mem-game/lvl',async (req,res) => {
    const userData= await user.find();

    res.json(userData[0]);
});

app.get('/mem-game/create',async (req,res) => {
    const userData=new user();
    userData.save();
    res.json(userData);
});

app.put('/mem-game/setLevel',async (req,res) => {
    const userData= await user.findOneAndUpdate({},{'level':req.body.level});
    res.json(userData);
});

app.listen(8888,()=>console.log('listening on port '+8888));
//