var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
var usr_name = "root";  //mysqlユーザーネーム
var usr_pass = "aokia0quI!";   //ユーザーパスワード
var db_name = "test";   //DB名前
var table_name = "t_master";    //扱うテーブルネーム

//require
var mysql = require('mysql');

//MySQLとのコネクションの作成
var connection = mysql.createConnection({
    host : "localhost",
    user : usr_name,
    password : usr_pass,
    database : db_name
});

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/chat.html');
});
app.use('/style',express.static(__dirname + '/style'));

io.on('connection',function(socket){
    socket.on('message',function(msg){
        console.log('message: ' + msg);
        connection.query("insert into test.t_message (member_id,talk_id,m_text) values ('takuto','test','" + msg + "');", function (err, rows, fields) {
            if (err) {console.log("err:" + err)
            } else {console.log("Successfully Connected")};
        });

        socket.broadcast.emit('message', msg);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});
