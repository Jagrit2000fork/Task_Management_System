import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bycrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const app=express();
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());

const con=mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database:"users"
})

con.connect(function(err){
    if(err)
    {
        console.log("Error in Connection"+err);
    }
    else
    {
        console.log("Connected");
    }
})
const verifyUser= (req,res,next)=>{
    const token=req.cookies.token;
    if(!token)
    {
        return res.json({Message:"You are not authenticated"});
    }
    else
    {
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error:"Token is not okay"});
            }else{
                req.name=decoded.name;
                req.Userid=decoded.Userid;
                next();
            }
        })
    }
}
app.get('/',verifyUser,(req,res)=>{
 const id=req.Userid;
 const sql="SELECT * FROM task WHERE UserId=?";
 con.query(sql,[id],(err,result)=>{
    if(err) return res.json({Message:"Error inside Server"});
    const responseData = {
        name: req.name, // Add the name property from req
        tasks: result,// Include the query result
        Status:"Success"
    };
    return res.json(responseData);
 })
});
app.post('/task',verifyUser,(req,res)=>{
    const id=req.Userid;
    console.log(id);
    const sql='INSERT INTO task VALUES (default,?)';
    const values=[req.body.name,req.body.description,req.body.status,id];
    con.query(sql,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})
app.get('/read/:id',(req,res)=>{
    const sql='SELECT * FROM task WHERE taskid=?';
    const id=req.params.id;
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})
app.post('/signup', (req,res) =>{
    const sql = "INSERT INTO user Values (default,?)";
    bycrypt.hash(req.body.password,10,(err,hash)=>{
        if(err) return res.json({Error:"Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        con.query(sql, [values], (err,data) => {
            if(err) return res.json(err);
            return res.json({Status: "Success"});
        })
    })
})
app.post('/login',(req,res)=> {
   const sql='SELECT * FROM user WHERE email=?';
   con.query(sql,[req.body.email],(err,result)=>{
    if(err) return res.json({Status:"Error",Error:"Login Error in Server"})
    if(result.length>0){
        bycrypt.compare(req.body.password.toString(),result[0].password,(err,response)=>{
        if(err) return res.json({Status:"Error",Error:"Password compare error"});
        if(response)
        {
         const name=result[0].Name;
         const id=result[0].Userid;
         const token=jwt.sign({name:name,Userid:id},"jwt-secret-key",{expiresIn:"1d"});
         res.cookie('token',token);
         return res.json({Status:"Success"});
        }
        else
        {
            return res.json({Status:"Error",Error:"Email or Password is Wrong"});
        }
        })
    }
    else{
        return res.json({Status: "Error", Error:"Email or Password is Wrong"});
    }
   })

})
app.put('/update/:id',(req,res)=>{
    const id=req.params.id;
    const sql='UPDATE task SET `task_name`=?, `task_description`=?, `status`=?  WHERE taskid=?'
    con.query(sql,[req.body.name,req.body.description,req.body.status,id],(err,result)=>{
        if(err) return res.json(sql+""+err);
        return res.json(result);
    })
})
app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    const sql='DELETE FROM task WHERE taskid=?'
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})
app.listen(8081,()=>{
    console.log("Running");
})