import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todo_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('db works');
  
})

export default connection