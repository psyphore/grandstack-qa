const url = 'http://localhost:4001/graphql'
module.exports = {
  client: {
    service: {
      name: 'GRANDstack',
      url: url,
      skipSSLValidation: true,
    },
  },
}
