var mysql = require('mysql');
var MYSQL_USERNAME = 'root';
var MYSQL_PASSWORD = '';
var MYSQL_HOST = '10.211.55.5'

var client = mysql.createClient({
   user: MYSQL_USERNAME,
   password: MYSQL_PASSWORD,
   host: MYSQL_HOST,
});

client.query('USE mynode_db');

// function to create employee
exports.add_employee = function(data, callback) {
 client.query("insert into employees (name, salary) values (?,?)", [data.name, data.salary], function(err, info) {
    // callback function returns last insert id
    callback(info.insertId);
    console.log('Employee '+data.name+' has salary '+data.salary);
  });
}
//function to list employees
exports.get_employees = function(callback) {
   client.query("select * from employees", function(err, results, fields) {
	callback(results);
   });
}
