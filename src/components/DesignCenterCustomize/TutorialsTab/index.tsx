/**
 * UploadTab Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import Modal from '../../Common/JakrooModal'
import Spin from 'antd/lib/spin'
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
interface State {
  videos: object[]
  videoId: string
  videoName: string
  open: boolean
  loading: boolean
}
class TutorialsTab extends React.PureComponent<{}, State> {
  state = {
    loading: true,
    open: false,
    videoId: '',
    videoName: '',
    videos: []
  }
  async componentDidMount() {
    const videos = await getVideos()
    this.setState({ videos, loading: false })
  }
  handleClickClose = () => {
    this.setState({ open: false, videoId: '', videoName: '' })
  }
  handleClickOpen = (videoId: string, videoName: string) => () => {
    this.setState({ open: true, videoId, videoName })
  }
  render() {
    const { loading, videos, open, videoId, videoName } = this.state
    return (
      <Container>
        {loading && !videos.length ? (
          <Loading>
            <Spin />
          </Loading>
        ) : (
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
                Open in modal
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
