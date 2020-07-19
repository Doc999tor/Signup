import requestService from '../../components-lib/request.service.js'

export const postService = (url, body) => {
  const mainUrl = _config.urls.base + url
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body
  }
  return requestService(mainUrl, options)
}
