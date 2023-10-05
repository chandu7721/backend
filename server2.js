
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

// Configure Oracle database connection
const dbConfig = {
  user: 'system',
  password: 'manager',
  connectString: 'localhost:/orcl'
};

// Define the route to fetch data from the "users" table
app.get('/api/users', async (req, res) => {
  try {
    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to fetch data from the "causes" table
    const result = await connection.execute('SELECT * FROM users');

    // Close the database connection
    await connection.close();
    const records = result.rows.map(row => ({
      email: row[0],
      password: row[1],
      name: row[2]
    }));
    res.json(records);

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).send('Failed to fetch data from the database');
  }
});

// Define the route to fetch data from the "appoint" table
app.get('/api/appoint', async (req, res) => {
  try {
    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to fetch data from the "diseases" table
    const result = await connection.execute('SELECT * FROM appoint');

    // Close the database connection
    await connection.close();
    const records = result.rows.map(row => ({
      email: row[0],
      full_name: row[1],
      phone:row[2],
      dob:row[3],
      gender:row[4],
      a_date:row[5],
      a_time:row[6],
      problem:row[7]
      
}));
    res.json(records);

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).send('Failed to fetch data from the database');
  }
});

// Define the route to insert data into the "users" table
app.post('/api/users', async (req, res) => {
  try {
    const cause = req.body;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to insert data into the "causes" table
    await connection.execute(
      `INSERT INTO users (email, password, name) VALUES (:email, :password, :name)`,
      cause
    );
    await connection.commit();

    // Close the database connection
    await connection.close();
    res.status(200).json({message: 'Data inserted successfully'});

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to insert data into the database');
  }
});

// Define the route to insert data into the "appoint" table
app.post('/api/appoint', async (req, res) => {
  try {
    const appoint = req.body;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to insert data into the "appoint" table
    await connection.execute(
      `INSERT INTO appoint (email, full_name, phone,dob,gender,a_date,a_time,problem) VALUES (:email, :full_name, :phone,:dob,:gender,:a_date,:a_time,:problem)`,
     appoint
    );
    await connection.commit();

    // Close the database connection
    await connection.close();
    res.status(200).json({message: 'Data inserted successfully'});

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to insert data into the database');
  }
});

// Define the route to update data in the "users" table
app.put('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cause = req.body;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to update data in the "causes" table
    await connection.execute(
      `UPDATE users SET email = :email, password = :password, name = :name WHERE email = :id`,
      { ...cause, id }
    );
    await connection.commit();
    // Close the database connection
    await connection.close();
    res.status(200).json('Data updated successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to update data in the database');
  }
});

// Define the route to update data in the "appoint" table
app.put('/api/appoint/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const disease = req.body;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to update data in the "diseases" table
    await connection.execute(
      `UPDATE appoint SET email = :email, full_name = :full_name ,phone= :phone,dob= :dob,gender= :gender,a_date= :a_date,a_time= :a_time,problem= :problem WHERE email = :id`,
      { ...disease, id }
    );
    await connection.commit();
    // Close the database connection
    await connection.close();
    res.status(200).json('Data updated successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to update data in the database');
  }
});

// Define the route to delete data from the "causes" table
app.delete('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to delete data from the "causes" table
    await connection.execute(`DELETE FROM users WHERE email = :id`, [id]);
    await connection.commit();
    // Close the database connection
    await connection.close();
    res.status(200).json('Data deleted successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to delete data from the database');
  }
});

// Define the route to delete data from the "appoint" table
app.delete('/api/appoint/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to delete data from the "appoint" table
    await connection.execute(`DELETE FROM appoint WHERE email = :id`, [id]);
    await connection.commit();
    // Close the database connection
    await connection.close();
    res.status(200).json('Data deleted successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to delete data from the database');
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM users WHERE email = :email AND password = :password`,
      [email, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

// Route for signup
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO users (username, password) VALUES (:username, :password)`,
      [username, password]
    );
    
    res.json({ success: true, message: 'Signup successful' });
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});