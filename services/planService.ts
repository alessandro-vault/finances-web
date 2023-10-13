import http from './shared/http'

const getOne = async (id : String) => {
  http.get(`/plans/${id}`, {
    headers: {
      'Authorization': ``
    }
  })
}
