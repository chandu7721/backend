const oracledb = require("oracledb");
// Set database connection details
const dbConfig = {
  user: "system",
  password: "manager",
  connectString: "localhost:/orcl",
};

const Query = async (sql) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql);
    await connection.commit();
    return result;
  } catch (error) {
    return error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const Result = async (...Parameters) => {
  let Sql;
  let Details;
  
  console.log(typeof Parameters[2]);
  Details = Parameters[2];
  try {
    Details = JSON.parse(Parameters[2]);
  } catch (err) {}

  switch (Parameters[1]) {
    case "Insert":
      Sql = `insert into ${Parameters[0]} values('${Details.email}','${Details.password}','${Details.name}')`;
      break;
   
    case "Read":
      Sql = `select * from ${Parameters[0]}`;
      if (Details !== "All") {
        Sql = `select * from ${Parameters[0]} where email = '${Details}'`;
      }
      break;
    case "Login":
        Sql = `select * from users where email = '${Details.email}' and password = '${Details.password}'`;
        break;
    case "a_Insert":
        Sql = `insert into appoint values('${Details.full_name}','${Details.email}','${Details.phone}','${Details.dob}','${Details.gender}','${Details.a_date}','${Details.a_time}','${Details.problem}')`;
        break;
    case "Delete":
        Sql = `delete from appoint where email = '${Details}'`;
        break;
    case "Update":
       Sql = `update '${Parameters[0]}' set full_name = '${Parameters[3].full_name}', email = '${Parameters[3].email}',phone = '${Parameters[3].phone}',dob = '${Parameters[3].dob}',gender = '${Parameters[3].gender}',a_date = '${Parameters[3].a_date}',a_time = '${Parameters[3].a_time}',aadhar = '${Parameters[3].aadhar}',problem = '${Parameters[3].problem}',city = '${Parameters[3].city}' where email = '${Details}'`;
       break;
    
    default:
      console.error("Invalid Parameters");
      break;
  }
  
  console.log(Sql);
  const result = await Query(Sql);
  return result;
};

module.exports = Result;
