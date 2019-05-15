/**
 * Tutorials Tools
 */

import config from '../../../config/index'
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems'
export const getVideos = async (setVideos: (videos: object[]) => void) => {
  try {
    const response = await fetch(
      `${baseURL}?part=snippet%2CcontentDetails&playlistId=${
        config.youtubeId
      }&key=${config.youtubeKey}`,
      {
        method: 'GET'
      }
    )
    const videos = await response.json()
    setVideos(videos.items)
  } catch (e) {
    console.error(e.Message)
  }
}
