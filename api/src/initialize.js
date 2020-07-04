export const initializeDatabase = (driver) => {
  const initCypher = `CALL apoc.schema.assert({}, {User: ["name", "email"], Project: ["name"], Product: ["name"], Release: ["name"], Story: ["summary"]})`

  const executeQuery = (driver) => {
    const session = driver.session()
    return session
      .writeTransaction((tx) => tx.run(initCypher))
      .then()
      .finally(() => session.close())
  }

  executeQuery(driver).catch((error) => console.error(error))
}
