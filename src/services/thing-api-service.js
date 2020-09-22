import config from '../config'
import TokenService from '../services/token'

const ApiService = {
  getProjects() {
    return fetch(`${config.API_ENDPOINT}/projects`, {
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
  getProject(id) {
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
  insertProject(project) {
    console.log(project)
    return fetch(`${config.API_ENDPOINT}/projects`, {
      method: 'POST',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  updateProject(id, project) {
    return fetch(`${config.API_ENDPOINT}/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :  ""
        
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
  insertNote(projectId, note) {
    console.log(note)
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )

  },
  deleteNote(projectId, note_id) {
    console.log(note_id)
    return fetch(`${config.API_ENDPOINT}/projects/${projectId}/notes`, {
      method: 'DELETE',
      body: JSON.stringify(note_id),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )

  }
}

export default ApiService
