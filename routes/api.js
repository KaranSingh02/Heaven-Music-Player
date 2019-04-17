 const express = require('express');
 const router = express.Router();
 const UserData = require('../models/user');

 router.get('/getUser', (req,res) => {
    UserData.find((err,userdata) => {
        if(err) return res.json({success:false, error: err.message});
        return res.json(userdata);
    });
 });

 router.post('/createUser', (req,res) => {
    let userdata = new UserData();

    const {name,email,password} = req.body;

    userdata.name = name;
    userdata.email = email;
    userdata.password = password;
    userdata.save(err => {
        if (err) return res.json({success: false, error: err.message});
        return res.json({success: true});
    });
 });

 router.delete('/deleteUser/:id',function(req,res){
    UserData.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    });
});

 router.put('updateUser/:email', (req,res) => {
    const {email,update} = req.body;
    UserData.findByIdAndUpdate(email,update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true }); 
    });
 });

 module.exports = router;