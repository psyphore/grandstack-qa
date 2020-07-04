import { readFileSync } from 'fs'
import { join } from 'path'

export const typeDefs = readFileSync(
  join(__dirname, process.env.GRAPHQL_SCHEMA)
).toString('utf-8')
