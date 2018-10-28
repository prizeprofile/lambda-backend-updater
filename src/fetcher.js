const axios = require('axios')

module.exports = async () => {
  const page = new Date().getHours()

  const url = `${process.env.COMPETITIONS_URL}?page=${0}`

  const { data } = await axios.get(url)

  return data.content.map((c) => ({
    id: c.id,
    entry_methods: c.entry_methods,
    entrants: c.entrants,
    resource_id: c.resource_id,
    source_id: 0
  }))
}
