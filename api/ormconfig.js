// module.exports = {
//   type: 'mysql',
//   host: 'users-db',
//   port: process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/*{.ts,.js}'],
//   logging: true,
// };

module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'kouki0712',
  database: 'node_lesson_db',
  entities: ['dist/**/entities/*.entity{*.ts,*.js}'],
  migrations: ['dist/*{.ts,.js}'],
  logging: true,
};
