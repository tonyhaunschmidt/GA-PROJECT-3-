const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('faceCook-token')
}

export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  console.log(token)
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}


export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp
}