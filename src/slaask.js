import config from './config'
import { LoadScripts } from './utils/scriptLoader'

export async function initSlaask(info) {
  const { id, name, email, designid } = info
  window._slaaskSettings = {
    identify: () => ({
      id,
      name,
      email,
      designid
    }),
    options: {
      team_id: 56518
    },
    onInit: _slaask => {
      _slaask.on('ready', () => {
        _slaask.show()
      })
    },
    key: config.slaaskApiKey
  }
  await LoadScripts([
    { url: 'https://cdn.slaask.com/chat_loader.js', scriptId: 'slaask' }
  ])
}

export function closeSlaask() {
  if (window._slaask) {
    window._slaask.destroy()
  }
}
