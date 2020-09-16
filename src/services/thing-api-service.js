import config from '../config'
import TokenService from '../services/token'

const ApiService = {
  getProjects() {
    return fetch(`${config.API_ENDPOINT}/projects`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getProject(id) {
    console.log(TokenService.getAuthToken())
    return fetch(`${config.API_ENDPOINT}/projects/${id}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getProjectNotes(projectId) {
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}/notes`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteNote(projectId) {
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}/notes`, {
      method: 'delete',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )

  }
  // postReview(thingId, text, rating) {
  //   return fetch(`${config.API_ENDPOINT}/reviews`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `bearer ${TokenService.getAuthToken()}`
  //     },
  //     body: JSON.stringify({
  //       thing_id: thingId,
  //       rating,
  //       text,
  //     }),
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // }
}

export default ApiService
