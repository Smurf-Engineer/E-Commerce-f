import config from './config'
import { LoadScripts } from './utils/scriptLoader'

export function initSlaask(info) {
  const { id, name, email, designId, userId } = info
  window._slaaskSettings = {
    identify: () => ({
      id,
      name: `${name}-${id}`,
      ticket: id,
      userId,
      email,
      designId
    }),
    options: {
      team_id: config.slaaskTeam
    },
    onInit: _slaask => {
      _slaask.on('ready', () => {
        _slaask.show()
      })
    },
    key: config.slaaskApiKey
  }
  LoadScripts([
    { url: 'https://cdn.slaask.com/chat_loader.js', scriptId: 'slaask' }
  ])
}

export function closeSlaask() {
  if (window._slaask) {
    window._slaask.destroy()
  }
}
