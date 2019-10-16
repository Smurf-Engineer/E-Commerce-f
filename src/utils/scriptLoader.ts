type ScriptObjType = {
  url: string
  scriptId: string
  attr?: any
  callback?: () => {}
}
export const LoadScripts = async (scriptObjects: ScriptObjType[], cb?: any) => {
  let counter = 0
  scriptObjects.forEach(({ scriptId, url }) => {
    const isLoaded = document.getElementById(scriptId)
    if (!!!isLoaded) {
      const script = createScript(url, scriptId)
      console.log(script)
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

const createScript = (src: string, id: string) => {
  const script = document.createElement('script')
  script.src = src
  script.id = id
  script.async = false
  script.type = 'text/javascript'
  return script
}
