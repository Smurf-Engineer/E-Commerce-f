import config from './config'
import { LoadScripts } from './utils/scriptLoader'

export function initSlaask(info) {
  const { id, name, lastName, email, userId, userCode } = info
  window._slaaskSettings = {
    identify: () => ({
      id,
      name: `JV2-PRO ASSIST-${id}`,
      ticket: id,
      userId,
      email,
      'User #': `JV2-${userCode}`,
      'User Locker': `${config.baseUrl}admin/users/${userId}`,
      'First Name': name,
      'Last Name': lastName
    }),
    options: {
      team_id: config.slaaskTeam,
      pulse: true
    },
    onInit: _slaask => {
      _slaask.on('ready', () => {
        _slaask.show()
      })
    },
    key: config.slaaskApiKey
  }
  if (window._slaask) {
    window._slaask.identifyContact()
  } else {
    LoadScripts([
      { url: 'https://cdn.slaask.com/chat_loader.js', scriptId: 'slaask' }
    ])
  }
}

export function closeSlaask() {
  if (window._slaask) {
    window._slaask.destroy()
  }
}
