//connect to the database
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// pool.query(`
// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
// ORDER BY teacher;
// `)
// .then(res => {
//   res.rows.forEach(row => {
//     console.log(`${row.cohort}: ${row.teacher}`);
//   })
// });

// Get cohort name from command-line argument
const cohortName = process.argv[2];

// Create the SQL query with placeholder for cohort name
const queryString = `
SELECT DISTINCT teachers.name
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name = $1;
`;

// Execute the query with the specified cohort name
pool.query(queryString, [cohortName])
  .then(res => {
    res.rows.forEach(teacher => {
      console.log(`${cohortName}: ${teacher.name}`);
    });
  })
  .catch(err => console.error('query error', err.stack));