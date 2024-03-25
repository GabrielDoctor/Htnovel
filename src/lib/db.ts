import postgres from "postgres";

let sql = postgres({
  host: "localhost",
  port: 5432,
  database: "webnovel",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export default sql;
