import requestService from './request.service.js'

export const postValidateService = (body, url) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    mode: 'cors',
    body
  }
  return requestService(url, options)
}
