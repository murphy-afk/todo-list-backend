import connection from "../data/db.js";

function index(req, res) {
  const query = 'SELECT * FROM todos';

  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'database query failed'});
    res.json(results);
  })
}


const controller = {
  index
}
export default controller