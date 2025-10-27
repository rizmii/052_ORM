const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.listen(port,()=>{
    console.log ("server start on port 3000");

});

db.sequelize.sync().then((result)=>{
    app.listen(300,()=>{
         console.log ("server started");
    })
    .catch((err)=>{
        console.log(err);
    });
});
