import connection from "../data/db.js";

function index(req, res) {
  const query = 'SELECT todos.id, todos.title, todos.description, todos.deadline, todos.completed, priorities.name as priority FROM todos INNER JOIN priorities ON todos.priority_id = priorities.id';

  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'database query failed' });
    res.json(results);
  })
}

function show(req, res) {
  const id = req.params.id;
  const query = 'SELECT todos.id, todos.title, todos.description, todos.deadline, todos.completed, priorities.name as priority FROM todos INNER JOIN priorities ON todos.priority_id = priorities.id WHERE todos.id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'database query failed' });
    res.json(results[0]);
  })
}

function create(req, res) {
  const { title, description, deadline, completed, priority_id } = req.body;
  const query = 'INSERT INTO todos (title, description, deadline, completed, priority_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [title, description, deadline, completed, priority_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'database query failed' });
    res.json({ id: results.insertId });
  })
}

function update(req, res) {
  const id = req.params.id;
  const { title, description, deadline, completed, priority_id } = req.body;
  const query = 'UPDATE todos SET title = ?, description = ?, deadline = ?, completed = ?, priority_id = ? WHERE id = ?';
  connection.query(query, [title, description, deadline, completed, priority_id, id], (err, results) => {
    if (err) return res.status(500).json({ error: 'database query failed' });
    res.json({ message: 'todo updated successfully' });
  })
}

function destroy(req, res) {
  const id = req.params.id;
  const query = 'DELETE FROM todos WHERE id = ? LIMIT 1';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'database query failed' });
    res.json({ message: 'todo deleted successfully' });
  })
}


const controller = {
  index,
  show,
  create,
  update,
  destroy
}
export default controller