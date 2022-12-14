const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'data',
  password: 'root',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('select * from values; ', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getUserById = (request, response) => {
    const english_name = (request.params.english_name)
  
    pool.query('SELECT * FROM values WHERE english_name = $1', [english_name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  const createUser = (request, response) => {
    const { english_name,tamil_name ,transliterated_name,count } = request.body

    pool.query('insert into values (english_name,tamil_name ,transliterated_name,count) VALUES($1,$2,$3,$4) RETURNING *', [english_name,tamil_name ,transliterated_name,count], (error, results) => {
    // pool.query('INSERT INTO values (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with name: ${results.rows[0].english_name}`)
    })
  }

  const updateUser = (request, response) => {
    /* Parsing the id from the request. */
    const english_name = (request.params.english_name)
    const { tamil_name ,transliterated_name,count } = request.body
    // update values SET english_name ='test',tamil_name ='சோதனை',transliterated_name ='tesst',count =21 where english_name = 'saran'
    pool.query('UPDATE values SET english_name = $1, tamil_name = $2,transliterated_name = $3, count = $4 WHERE english_name = $1',[tamil_name ,transliterated_name,count],(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with english_name: ${english_name}`)
      }
    )
  }
  const deleteUser = (request, response) => {
    const english_name = (request.params.english_name)
  
    pool.query('DELETE FROM values WHERE english_name = $1', [english_name], (error, results) => {
      if (error) {                                                                                                                                                                                                                            
        throw error
      }
      response.status(200).send(`User deleted with english_name: ${english_name}`)
    })
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }