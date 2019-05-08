/**
 * Upload Tools
 */

import config from '../../../config/index'
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems'
export const getVideos = async () => {
  try {
    const response = await fetch(
      `${baseURL}?part=snippet%2CcontentDetails&playlistId=${
        config.youtubeId
      }&key=AIzaSyA6QH7tHRZxXqLXH7HWBtX_gkJC56KSmSQ`,
      {
        method: 'GET'
      }
    )
    const videos = await response.json()
    return videos.items
  } catch (e) {
    console.log(e.Message)
  }
}
