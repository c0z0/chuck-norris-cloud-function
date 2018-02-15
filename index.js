require('@google-cloud/debug-agent').start({ allowExpressions: true })
require('isomorphic-fetch')

function getUrl(query) {
  if (query.lastName && query.firstName)
    return `http://api.icndb.com/jokes/random?lastName=${
      query.lastName
    }&firstName=${query.firstName}`
  if (query.lastName)
    return `http://api.icndb.com/jokes/random?lastName=${query.lastName}`
  if (query.firstName)
    return `http://api.icndb.com/jokes/random?firstName=${query.firstName}`
  return 'http://api.icndb.com/jokes/random'
}

module.exports.chuckNorrisJoke = (req, res) => {
  return Promise.resolve().then(() => {
    const url = getUrl(req.query)
    fetch(url).then(apiRes => {
      if (!apiRes.ok) {
        console.error(`Fetch failded: ${apiRes.status}, ${apiRes.body}`)
        return res.status(500).send('Something went wrong...')
      }
      apiRes.json().then(data => {
        return res.status(200).send(data.value.joke)
      })
    })
  })
}
