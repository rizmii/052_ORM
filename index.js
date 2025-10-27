const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models');
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.listen(PORT,()=>{
    console.log ("server start on port 3000");

});

db.sequelize.sync().then((result)=>{
    app.listen(3000,()=>{
         console.log ("server started");
    })
})
    .catch((err)=>{
        console.log(err);
    });

    app.post("/komik", async(req,res)=>{
        const data = req.body;
        try{
            const komik = await db.komik.create(data);
            res.send(komik);
        } catch(err){
            res.send(err);
        }
    })

    app.get("/komik",async(req,res)=>{
        try{
            const komik = await db.komik.findAll();
            res.send(komik);
        } catch(err){
            res.send(err);
        }
    })

app.put("/komik",async(req,res)=>{
    const id= req.params.id;
    const data = req.body;
        try{
            const komik = await db.komik.findByPk(id);
            if(!komik){return res.status(404).send({message: "komik tidak tersedia"});}
            await komik.update(data);
            res.send({message:" komik updated", komik});
        } catch(err){
            res.status(500).send(err);
        }
    })    
    app.delete("/komik",async(req,res)=>{
    const id= req.params.id;
    
        try{
            const komik = await db.komik.findByPk(id);
            if(!komik){return res.status(404).send({message: "komik tidak tersedia"});}
            await komik.destroy();
            res.send({message:" komik deleted", komik});
        } catch(err){
            res.status(500).send(err);
        }
    })    