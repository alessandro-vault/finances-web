import http from '../lib/http'

const getOne = async (id : String) => {
  return await http.get(`/plans/${id}`, {
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5pdHkiLCJleHAiOjE2OTk4OTY3MDUsImlhdCI6MTY5NzMwNDcwNSwidXNlcklkIjoiOWQxNjY3YjQtMWEyMS00MzJlLTk5YTgtZTkyZjY1NDRiZWNjIn0.2EE6E5FmjI-ykh2kpKF_d3rQ7rFW-gFuAJXduWDhETk`
    }
  })
}

export {
    getOne
}