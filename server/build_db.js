import sqlite3 from 'sqlite3'
import fs from 'fs';

// Provide the path to your SQL file
const sqlFilePath = 'Chinook_Sqlite.sql';

// Provide the desired name for your SQLite database
const databaseName = 'Chinook.db';

// Open a connection to the SQLite database (it will be created if it doesn't exist)
const db = new sqlite3.Database(databaseName);

// Read the SQL script from the file
const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

// Execute the SQL script
db.exec(sqlScript, function(err) {
  if (err) {
    console.error('Error executing SQL script:', err.message);
  } else {
    console.log(`SQLite database '${databaseName}' has been created and populated from '${sqlFilePath}'.`);
  }

  // Close the database connection
  db.close();
});
