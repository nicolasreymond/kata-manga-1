const fs = require('fs')
const { loadData, appendData, storeData } = require('./lib/utils.js')

if (!fs.existsSync('./mal_token.json')) {
  console.error('Please run ./mal_token.sh')
  process.exit(1)
}

const limit = process.argv[2] || 100
const { getTopMangas } = require('./lib/top.js')
const { genSQL } = require('./lib/sqlgen.js')
const init = async (limit) => {
  let filenameSQL = `./data/KataManga_structure_and_data.sql`
  await getTopMangas(limit)
  genSQL(limit)
  schemaSQL = loadData(`./data/init/structure.sql`)
  storeData(schemaSQL, filenameSQL)
  dataSQL = loadData(`./data/tmp/data_top${limit}.sql`)
  appendData(dataSQL, filenameSQL)
  dataSQL = loadData(`./data/init/constraints.sql`)
  appendData(dataSQL, filenameSQL)
}

init(limit)
