//โหลดโมดูล express จากนั้นเก็บผลลัพธ์ลงในตัวแปร expressFunction
const expressFunction = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/university';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

var Schema = require("mongoose").Schema; //รองรับข้อมูลที่เกิดขึ้นจากการ Query ต่างๆของ Data ของ MongoDB
const userSchema = Schema({
    stdid: String,
    name: String,

}, {
    collection: 'students'
});
let Students
try {
    Students = mongoose.model('students')
} catch (error) {
    Students = mongoose.model('students', userSchema);
}

//เรียกฟังก์ชัน expressFunction() ซึ่งผลลัพธ์จะได้กลับมาเป็น object แล้วนำไปเก็บยังตัวแปร expressApp
const expressApp = expressFunction();

//middleware ชั้นที่ 1
expressApp.use(function (req, res, next){

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    //Pass to next layer of middleware
    next();
});

//middleware ชั้นที่ 2
expressApp.use(expressFunction.json());

//middleware ชั้นที่ 3
expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
        .then(() => {
            console.log('Connected to MongoDB');
            next();
        })
        .catch(err =>{
            console.log("Cannot connect to MongoDB");
            res.status(501).send('Cannot connect to MongoDB')
        })
})

//เรียกใข้ method get เพื่อตรวจสอบ path ที่ส่งมาพร้อมกับ HTTP Request โดยกำหนด Endpoint
expressApp.get('/api/resource', function(req, res){
    Students.find({id:"B6333034"})
    .then(users => {
        res.json(users);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
    // const myJson = {id:'B6333034', name:'Watcharapol Jantajaem'};
    // res.send(myJson);
});

//สร้าง Event Listener รอการเชื่อมต่อผ่านจาก port 3000
expressApp.listen(3000, function(){
    console.log('Listening on port 3000');
});