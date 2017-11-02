const _ = require('lodash')
const fs = require('fs')
const csv = fs.readFileSync(__dirname + '/datafile.csv', {encoding: 'utf8'})
// console.log('csv',  csv)
/*
.split('\n')
// headers seperate
// split the fields up on ","
.map(row => row.split(','))
/// then use _.zipObject on each row (w/ the column headers)
rows.join('\n')
*/

const rows = csv.split('\n')

const header = rows[0]
const headerRaw = header.split(',')
const col = headerRaw.map(_.camelCase)
col.join(',')

const data = rows.slice(1).map(r => {
return r.split(',').map(field => field.trim())
})
.filter(row => row.length > 7)

// console.log(col, data)

let clean_csv = data.map(fields => {
    return fields.join(',')
})
.join('\n')

console.log(col.join(',') + '\n' + clean_csv);
