const mysql = require('mysql');
const pool = mysql.createPool({
    host:'nodejs-rds.cbn49nh1i8lf.ap-northeast-2.rds.amazonaws.com',
    port:3306,
    user:'admin',
    password:'Tkddnjs1!',
    database:'sangwon_nodejs'
});
exports.pool = pool;