import connection from "../data/db.js";

function index(req, res) {
  const query = 'SELECT todos.id, todos.title, todos.description, todos.deadline, todos.completed, priorities.name as priority FROM todos INNER JOIN priorities ON todos.priority_id = priorities.id';

  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'database query failed'});
    res.json(results);
  })
}

function show(req, res) {
  const id = req.params.id;
  const query = 'SELECT todos.id, todos.title, todos.description, todos.deadline, todos.completed, priorities.name as priority FROM todos INNER JOIN priorities ON todos.priority_id = priorities.id WHERE todos.id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'database query failed'});
    res.json(results[0]);
  })
}


const controller = {
  index, 
  show
}
export default controller