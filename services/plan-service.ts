import http from '../lib/http'

const getOne = async (id : String) => {
  return await http.get(`/plans/${id}`, {
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5pdHkiLCJleHAiOjE2OTk5MTA5NDMsImlhdCI6MTY5NzMxODk0MywidXNlcklkIjoiYjg3MjZmYmMtYzA0Yi00YjViLThlMTctZGU4YjBiODJjODExIn0.TsT12GF4yHmIL3a1EElpi2PH9-umyOlAvk05FNpJd_I`
    }
  })
}

export {
    getOne
}
