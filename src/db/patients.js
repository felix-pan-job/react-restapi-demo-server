const sqlite3 = require("sqlite3").verbose();
const path = require('path');

function savePatientInfo({username, illness_id, severity_level}) {
  
  let db = new sqlite3.Database(path.resolve(__dirname, "./patients.sqlite3"));
  db.run(`INSERT INTO 'patients_info' (username, illness_id, severity_level) 
          VALUES(?,?,?)`, [username, illness_id, severity_level], function(err) {
              if(err) {
                console.log(err.message);
              }
          });
  db.close();
}

module.exports = {savePatientInfo};