import { v1 as neo4j } from 'neo4j-driver'
import { fromEnv } from 'neode'

// https://github.com/adam-cowley/neode
// https://medium.com/neo4j/interacting-with-neo4j-in-nodejs-using-the-neode-object-mapper-3d99cb324546

export const getContext = (secrets) => {
  const {
    driver,
    auth: { basic },
  } = neo4j
  return driver(
    secrets.NEO4J_URI,
    basic(secrets.NEO4J_USERNAME, secrets.NEO4J_PASSWORD)
  )
}

export const getInstance = () => {
  const instance = fromEnv()
  instance.setEnterprise(true)
  console.log(instance)
  return instance
}

export const neo4jValidation = () => {
  if (typeof process.env.NEO4J_PASSWORD === 'undefined') {
    console.warn(
      'WARNING: process.env.NEO4J_PASSWORD is not defined. Check README.md for more information'
    )
  }
  if (typeof process.env.NEO4J_URI === 'undefined') {
    console.warn(
      'WARNING: process.env.NEO4J_URI is not defined. Check README.md for more information'
    )
  }
  if (typeof process.env.NEO4J_USERNAME === 'undefined') {
    console.warn(
      'WARNING: process.env.NEO4J_USERNAME is not defined. Check README.md for more information'
    )
  }
}

export const processSession = (session, query, param, label, many = true) => {
  return session.run(query, param).then((result) => {
    session.close()
    let content = result.records.map((record) => {
      var props = record.get(label)
      return props && props.properties ? props.properties : props
    })
    return many ? content : content[0]
  })
}

export const processSessionTrx = (
  session,
  query,
  param,
  label,
  many = true
) => {
  let retryCount = 0
  const writeTxPromise = session.writeTransaction((tx) => {
    if (retryCount === 0) {
      console.log('Executing query for the first time')
    } else {
      console.log(`Retrying query: ${retryCount}`)
    }
    retryCount++
    return tx.run(query, param)
  })

  return writeTxPromise.then((result) => {
    session.close()
    let content = result.records.map((record) => {
      var props = record.get(label)
      return props.properties ? props.properties : props
    })
    return many ? content : content[0]
  })
}

export const processSessionWithMultipleLabels = (
  session,
  query,
  param,
  [...label]
) => {
  return session.run(query, param).then((result) => {
    session.close()
    let res = []
    let content = result.records.map((record) => {
      let coll = label.map((l) => {
        var props = record.get(l)
        return props.properties ? props.properties : props
      })
      return coll
    })
    res = [...content]
    return res
  })
}
