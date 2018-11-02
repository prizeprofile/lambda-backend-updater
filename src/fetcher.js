const axios = require('axios')

module.exports = async () => {
  const h = new Date().getHours()
  const page = Math.abs(h - (12 * (h >= 12)))

  const url = `${process.env.COMPETITIONS_URL}?page=${page}&size=100`

  const { data } = await axios.get(url)

  return data.content.map((c) => ({
    id: c.id,
    entry_methods: c.entry_methods,
    entrants: c.entrants,
    resource_id: c.resource_id,
    source_id: 0
  }))
}
