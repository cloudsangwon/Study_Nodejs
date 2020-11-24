// Express 
const express = require('express');
const app = express();
const port = 5000;

// Mysql
const mysql = require('mysql');
const db = mysql.createPool({
    host:'',
    port:3306,
    user:'',
    password:'',
    database:''
});
// cors
const cors = require('cors');
app.use(cors());

// post 위해 body-parser 사용
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json()); // 이거 없어서 http:localhost:5000/api/insert POST error &
                        // Error: ER_BAD_NULL_ERROR: Column 'serviceName' cannot be null (mysql 에러 뜸)


// delete 요청으로 프론트에서 serviceName 값을 받아와서 name 에 저장한다.
// db에 name 기준으로 칼럼을 삭제하는 쿼리문을 보낸다.
// req.params - delete 
app.delete('/api/delete/:serviceName',(req,res)=>{
    const name = req.params.serviceName;
    const sqlDelete="DELETE FROM service_reviews WHERE serviceName=?";
    db.query(sqlDelete,name,(err,result)=>{
        if(err){
            console.log(err);throw(err);
        }
        else{
            console.log("Delete "+name);
        }
    })
})

// req.body -put 
// serviceName을 기준으로 review를 업데이트 한다.
app.put('/api/update',(req,res)=>{
    const name =req.body.serviceName;
    const review = req.body.serviceReview;

    const sqlUpdate = "UPDATE service_reviews SET serviceReview = ? WHERE serviceName = ?";
    db.query(sqlUpdate,[review,name],(err,result)=>{
        if(err){
            console.log(err);
            throw(err);
        }
        else{
            console.log("Update"+name+" "+review);
        }
    })

})
//  get 요청으로 service_reviews의 모든 값을 볼 수 있는 쿼리문을 보낸다.
app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT * FROM service_reviews";
    db.query(sqlSelect,(err,result)=>{
        if(err)
        {
            console.log(err);
            throw(err);
        }
        else{
            res.send(result);
        }
    })
})

// DB에 Front에서 입력받은 값들을 저장한다. req.body - post 
app.post('/api/insert',(req,res)=> {

    const serviceName = req.body.serviceName;
    const serviceReview = req.body.serviceReview;

    const sqlInsert = "INSERT INTO service_reviews (serviceName, serviceReview) VALUES (?,?)";
    db.query(sqlInsert,[serviceName,serviceReview],(err,results)=>{
        if(err) {
            console.log(err); throw(err);
        }
        else{
            console.log(results);
            console.log(serviceName);
            console.log(serviceReview);
        }
       

    })

});
// req.params - get 
app.get('/',(req,res)=> {
    
    // 값이 Insert 되었는 지 확인
    // const sqlInsert = "INSERT INTO service_reviews (serviceName, serviceReview) VALUES ('EC2','AWS Core Function !')";
    // db.query(sqlInsert,(err,results)=>{
    //     if(err) {
    //         console.log(err);
    //         throw(err);
    //     }
    //     else
    //     {
    //         console.log(results);
    //     }
    // })
    res.send("Hello Express");
})


// listen
app.listen(port,()=>{

    console.log(`Server Port Connected ${port}`);
});