type ScriptObjType = {
  url: string
  scriptId: string
  attr?: any
  isAsync: boolean
  publicKey: any
  callback?: () => {}
}
export const LoadScripts = async (scriptObjects: ScriptObjType[], cb?: any) => {
  let counter = 0
  scriptObjects.forEach(({ scriptId, url, isAsync, publicKey }) => {
    console.log('Loaded ,', publicKey)
    const isLoaded = document.getElementById(scriptId)
    if (!!!isLoaded) {
      const script = createScript(url, scriptId, isAsync, publicKey)
      script.addEventListener('load', () => {
        counter++
        if (counter === scriptObjects.length && cb) {
          cb()
        }
      })

      document.body.appendChild(script)
    }
  })
}

const createScript = (src: string, id: string, isAsync = false, publicKey: string) => {
  const script = document.createElement('script')
  script.src = src
  script.id = id
  script.async = isAsync
  script.type = 'text/javascript'
  console.log(publicKey)
  script['data-public-key'] = publicKey
  return script
}
