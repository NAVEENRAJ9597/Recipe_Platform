const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Naveen09082005',
  database: 'tamil_recipes',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.get('/recipes', (req, res) => {
  db.query('SELECT * FROM recipes', (err, results) => {
    if (err) {
      console.error('Error fetching recipes:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.get('/recipes/search', (req, res) => {
  const searchTerm = req.query.term;
  db.query('SELECT * FROM recipes WHERE title LIKE ?', [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error('Error searching recipes:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.post('/recipes', (req, res) => {
  const { title, description, instructions, image_url, user_id, category_id, ingredients } = req.body;
  
  // First insert the recipe
  db.query(
    'INSERT INTO recipes (title, description, instructions, image_url, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, instructions, image_url || null, user_id, category_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: 'Database error' });
      }
      
      const recipeId = results.insertId;
      
      // Then handle ingredients if provided
      if (ingredients && ingredients.length > 0) {
        // You would need to implement logic here to:
        // 1. Check if ingredients exist in ingredients table
        // 2. Insert new ingredients if needed
        // 3. Create the recipe_ingredients relationships
        // This would be more complex and require transactions
      }
      
      res.send({ message: 'Recipe added successfully', id: recipeId });
    }
  );
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
})