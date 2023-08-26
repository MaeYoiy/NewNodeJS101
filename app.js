//โหลดโมดูล express จากนั้นเก็บผลลัพธ์ลงในตัวแปร expressFunction
const expressFunction = require('express');

//เรียกฟังก์ชัน expressFunction() ซึ่งผลลัพธ์จะได้กลับมาเป็น object แล้วนำไปเก็บยังตัวแปร expressApp
const expressApp = expressFunction();

expressApp.use(function (req, res, next){

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    //Pass to next layer of middleware
    next();
});

//เรียกใข้ method get เพื่อตรวจสอบ path ที่ส่งมาพร้อมกับ HTTP Request โดยกำหนด Endpoint
expressApp.get('/api/resource', function(req, res){
    const myJson = {id:'B6333034', name:'Watcharapol Jantajaem'};
    res.send(myJson);
});

//สร้าง Event Listener รอการเชื่อมต่อผ่านจาก port 3000
expressApp.listen(3000, function(){
    console.log('Listening on port 3000');
});