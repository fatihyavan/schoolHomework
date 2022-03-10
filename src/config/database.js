const  Pool  = require("pg").Pool;

const pool=new Pool( {
  user: "postgres",
  host: "localhost",
  database: "test5",
  password: "postgres",
  port: 8765,
});

module.exports={
   pool
}