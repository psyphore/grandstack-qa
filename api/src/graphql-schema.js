import { readFileSync } from 'fs'
import { join } from 'path'

export const typeDefs = readFileSync(
  join(__dirname, process.env.GRAPHQL_SCHEMA)
).toString('utf-8')

// const allTypesDefs = process.env.GRAPHQL_SCHEMAS.map(
//   schema => readFileSync(join(__dirname, schema)).toString('utf-8')
// )
