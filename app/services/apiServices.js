function serialize (obj) {
  var str = []
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}
const config = window._config

export async function get(url) {
  let {params, qvery, headers} = arguments[1] || {}
  var apiUrl = config.urls.base + url
  var options = {
    credentials: 'include'
  }
  var myHeaders = new Headers()

  myHeaders.append("X-Requested-With", "XMLHttpRequest")

  if (qvery) {
    apiUrl = apiUrl + "?" + serialize(qvery)
  }

  if (params) {
    options.body = serialize(params)
  }

  if (headers) {
    Object.keys(headers).forEach((key) => {
      myHeaders.append(key, headers[key])
    })
  }

  options.method = 'GET'
  options.headers = myHeaders

  return await _promise(apiUrl, options)
}

export async function post(url) {
  let {params, qvery, headers} = arguments[1] || {}
  var apiUrl = config.urls.base + url
  var options = {
    credentials: 'include'
  }
  var myHeaders = new Headers()

  myHeaders.append("X-Requested-With", "XMLHttpRequest")

  if (qvery) {
    apiUrl = apiUrl + "?" + serialize(qvery)
  }

  if (headers) {
    Object.keys(headers).forEach((key) => {
      myHeaders.append(key, headers[key])
    })
  }

  if (params) {
    if (headers && headers['content-type'] === 'multipart/form-data') {
      var formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key])
      })
      options.body = formData
    } else {
      options.body = serialize(params)
    }
  }

  options.method = 'POST'
  options.headers = myHeaders

  return await _promise(apiUrl, options)
}

export async function delate(url) {
  let {params, qvery, headers} = arguments[1] || {}
  var apiUrl = config.urls.base + url
  var options = {
    credentials: 'include'
  }
  var myHeaders = new Headers()

  myHeaders.append("X-Requested-With", "XMLHttpRequest")

  if (qvery) {
    apiUrl = apiUrl + "?" + serialize(qvery)
  }

  if (headers) {
    Object.keys(headers).forEach((key) => {
      myHeaders.append(key, headers[key])
    })
  }

  if (params) {
    options.body = serialize(params)
  }

  options.method = 'DELETE'
  options.headers = myHeaders
  options.body = serialize(params)

  return await _promise(apiUrl, options)
}

export async function put(url) {
  let {params, qvery, headers} = arguments[1] || {}
  var apiUrl = config.urls.base + url
  var options = {
    credentials: 'include'
  }
  var myHeaders = new Headers()

  myHeaders.append("X-Requested-With", "XMLHttpRequest")

  if (qvery) {
    apiUrl = apiUrl + "?" + serialize(qvery)
  }
  if (headers) {
    Object.keys(headers).forEach((key) => {
      myHeaders.append(key, headers[key])
    })
  }

  if (params) {
    options.body = serialize(params)
  }

  options.method = 'PUT'
  options.headers = myHeaders

  return await _promise(apiUrl, options)
}

export async function head(url) {
  let {params, qvery, headers} = arguments[1] || {}
  var apiUrl = config.urls.base + url
  var options = {
    credentials: 'include'
  }
  var myHeaders = new Headers()

  myHeaders.append("X-Requested-With", "XMLHttpRequest")

  if (qvery) {
    apiUrl = apiUrl + "?" + serialize(qvery)
  }

  if (headers) {
    Object.keys(headers).forEach((key) => {
      myHeaders.append(key, headers[key])
    })
  }

  if (params) {
    options.body = serialize(params)
  }

  options.method = 'HEAD'
  options.headers = myHeaders

  return await _promise(apiUrl, options)
}

var _promise = (apiUrl, options) => {
  return new Promise((resolve, reject) => {
    var request = (apiUrl, options) => {
      var apiUrl = apiUrl;
      var options = options;
      var reqConfig = new Request(apiUrl, options);
      fetch(reqConfig).then(response => {
        if (reqConfig.method === "GET" && response.status === 200 || reqConfig.method === "POST" && response.status === 201 || (reqConfig.method === "PUT" || reqConfig.method === "PATCH" || reqConfig.method === "DELETE") && response.status === 204) {
          response.text().then(formattedData => {
            formattedData
              ? resolve(JSON.parse(formattedData))
              : resolve()
          })
        }
        if (response.status === 503) {
          setTimeout(() => {
            request(apiUrl, options)
          }, response.headers.get('retry-after'))
        }
        if (response.status === 400 || response.status === 405 || response.status === 422) {
          console.error('Response: ', response)
          reject(response)
        }
        if (response.status === 401) {
          window.location.href = window.location.origin + _config.urls.login
        }
      }).catch((err) => {
        console.error('Fetch Error', err)
      })
    }
    request(apiUrl, options)
  })
}
