/**
 * TutorialsTab Component - Created by Apodaca on 05/07/19.
 */
import * as React from 'react'
import Modal from '../../Common/JakrooModal'
import Spin from 'antd/lib/spin'
import messages from './messages'
import {
  Container,
  VideoContainer,
  Loading,
  Title,
  ModalSpan,
  VideoFrame
} from './styledComponents'
import get from 'lodash/get'
import { getVideos } from './api'
import { YoutubePlaylistItemType } from '../../../types/common'
interface Props {
  formatMessage: (messageDescriptor: any) => string
  videos: YoutubePlaylistItemType[]
  tutorialPlaylist: string
  setVideos: (videos: object[]) => void
}
interface State {
  videoId: string
  videoName: string
  open: boolean
  loading: boolean
}
class TutorialsTab extends React.PureComponent<Props, State> {
  state = {
    loading: true,
    open: false,
    videoId: '',
    videoName: ''
  }
  async componentDidMount() {
    const { setVideos, tutorialPlaylist } = this.props
    try {
      getVideos(tutorialPlaylist, setVideos)
    } catch (e) {
      console.error(e)
    }
  }
  componentWillReceiveProps() {
    this.setState({ loading: false })
  }
  handleClickClose = () => {
    this.setState({ open: false, videoId: '', videoName: '' })
  }
  handleClickOpen = (videoId: string, videoName: string) => () => {
    this.setState({ open: true, videoId, videoName })
  }
  render() {
    const { formatMessage, videos } = this.props
    const { loading, open, videoId, videoName } = this.state
    return (
      <Container>
        {loading && !videos.length ? (
          <Loading>
            <Spin />
          </Loading>
        ) : (
          videos &&
          videos.map((video, index) => (
            <VideoContainer key={index}>
              <VideoFrame
                frameBorder="0"
                height="200"
                data-allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                data-allowfullscreen={true}
                src={`https://www.youtube.com/embed/${get(
                  video,
                  'contentDetails.videoId',
                  'defaultUrl'
                )}?modestbranding=1`}
              />
              <Title>{`${index + 1}- ${get(
                video,
                'snippet.title',
                'Default title'
              )}`}</Title>
              <ModalSpan
                onClick={this.handleClickOpen(
                  get(video, 'contentDetails.videoId', 'defaultUrl'),
                  get(video, 'snippet.title', 'Default title')
                )}
              >
                {formatMessage(messages.expand)}
              </ModalSpan>
            </VideoContainer>
          ))
        )}
        <Modal
          {...{ open, requestClose: this.handleClickClose }}
          width={'70%'}
          withLogo={false}
          title={videoName}
        >
          {videoId ? (
            <VideoFrame
              frameBorder="0"
              height="500"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              data-allowfullscreen={true}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`}
            />
          ) : (
            <Loading>
              <Spin />
            </Loading>
          )}
        </Modal>
      </Container>
    )
  }
}

export default TutorialsTab
