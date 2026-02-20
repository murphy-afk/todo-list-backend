import connection from "../data/db.js";

function index(req, res) {
  const completed = req.query.completed;
  const orders = ['asc', 'desc'];
  const order = req.query.order ? req.query.order.toLowerCase() : 'asc';
  let query = 'SELECT todos.id, todos.title, todos.description, todos.deadline, todos.completed, todos.priority_id, priorities.name as priority FROM todos INNER JOIN priorities ON todos.priority_id = priorities.id';
  if (completed !== undefined) {
    query += ` WHERE todos.completed = ${completed}`;
  }
  query += ` ORDER BY todos.id ${order === 'desc' ? 'DESC' : 'ASC'}`;
  
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'database query failed' });
    res.json(results);
  })
}

function show(req, res) {
  const id = req.params.id;
  const query = 'SELECT todos.id, todos.title, todos.description, todos.deadline, todos.completed, todos.priority_id, priorities.name as priority FROM todos INNER JOIN priorities ON todos.priority_id = priorities.id WHERE todos.id = ?';
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
  const fields = req.body;

  const keys = Object.keys(fields);
  const values = Object.values(fields);

  if (keys.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  const setClause = keys.map(key => `${key} = ?`).join(", ");

  const query = `UPDATE todos SET ${setClause} WHERE id = ?`;

  connection.query(query, [...values, id], (err, results) => {
    if (err) return res.status(500).json({ error: "database query failed" });
    res.json({ message: "todo updated successfully" });
  });
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