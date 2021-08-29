type ScriptObjType = {
  url: string
  scriptId: string
  attr?: any
  async?: boolean
  callback?: () => {}
}
export const LoadScripts = async (scriptObjects: ScriptObjType[], cb?: any) => {
  let counter = 0
  scriptObjects.forEach(({ scriptId, url, async }) => {
    const isLoaded = document.getElementById(scriptId)
    if (!!!isLoaded) {
      const script = createScript(url, scriptId, async)
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

const createScript = (src: string, id: string, async = false) => {
  const script = document.createElement('script')
  script.src = src
  script.id = id
  script.async = async
  script.type = 'text/javascript'
  return script
}
