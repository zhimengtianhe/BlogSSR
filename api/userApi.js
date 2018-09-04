//api/userApi.js ---- api示例
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
// 连接数据库
//202.182.111.4
const db = mysql.createPool({
    host:'202.182.111.4',
	user:'root',
	password:'hanchao',
	database:'vue_study',
	port:'3306'
});


let $sql = {
    //获取诗词
    poetry:{
        get_poetry:'SELECT * FROM poetry'
    }
}


//获取诗词
router.post('/poetry',(req,res) => {
	let get_poetry=$sql.poetry.get_poetry;
	db.query(get_poetry,(error,data)=>{
		if(error){
			console.log(error);
		}else{
			res.send(data).end();
		}
	})
})



module.exports = router;