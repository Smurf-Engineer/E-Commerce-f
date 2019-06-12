/**
 * HomepageAdminActions Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
import {
  getHomepageInfo,
  setMainHeaderMutation,
  setSecondaryHeaderMutation
} from './data'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import { FormattedMessage } from 'react-intl'
import * as HomepageAdminActions from './actions'
import { Sections } from './constants'
import * as homepageAdminApiActions from './api'
import MainHeader from './MainHeader'
import SecondaryHeader from './SecondaryHeader'
import { Container, ScreenTitle, SpinContainer } from './styledComponents'
import messages from './messages'

interface Props {
  history: any
  desktopImage: string
  mainHeader: any
  mainHeaderLoading: any
  secondaryHeaderLoading: any
  loaders: any
  dispatch: any
  secondaryHeader: any
  formatMessage: (messageDescriptor: any) => string
  homepageInfo: () => Promise<any>
  setMainHeader: (variables: {}) => Promise<any>
  setSecondaryHeader: (variables: {}) => Promise<any>
}

class HomepageAdmin extends React.Component<Props, {}> {
  async componentDidMount() {
    const { homepageInfo, dispatch } = this.props
    const { setLoadersAction, setHomepageInfoAction } = HomepageAdminActions
    try {
      dispatch(setLoadersAction(Sections.MAIN_CONTAINER, true))
      const response = await homepageInfo()

      dispatch(setHomepageInfoAction(response.data.getHomepageContent))
      dispatch(setLoadersAction(Sections.MAIN_CONTAINER, false))
    } catch (e) {
      console.error(e)
    }
  }
  handleOnUploadFile = async (
    file: any,
    section: string,
    imageType: string,
    index: number = -1
  ) => {
    const { dispatch } = this.props
    const { uploadFileAction } = homepageAdminApiActions
    dispatch(uploadFileAction(file, section, imageType, index))
  }
  handleOnSetUrl = (value: string) => {
    const { dispatch } = this.props
    const { setUrlAction } = HomepageAdminActions
    dispatch(setUrlAction(value))
  }
  handleOnSetUrlLists = (value: string, index: number) => {
    const { dispatch } = this.props
    const { setUrlListAction } = HomepageAdminActions
    dispatch(setUrlListAction(value, index))
  }
  handleOnSaveMainHeader = async () => {
    try {
      const { setMainHeader, mainHeader, dispatch } = this.props
      const { setLoadersAction } = HomepageAdminActions
      dispatch(setLoadersAction(Sections.MAIN_HEADER, true))
      const response = await setMainHeader({
        variables: {
          headerImage: mainHeader.desktopImage,
          headerImageMobile: mainHeader.mobileImage,
          headerImageLink: mainHeader.url
        }
      })
      message.success(get(response, 'data.setMainHeader.message', ''))
      dispatch(setLoadersAction(Sections.MAIN_HEADER, false))
    } catch (e) {
      message.error(e.message)
    }
  }
  handleOnSaveSecondaryHeader = async () => {
    try {
      const { setSecondaryHeader, dispatch, secondaryHeader } = this.props
      const { setLoadersAction } = HomepageAdminActions
      dispatch(setLoadersAction(Sections.SECONDARY_HEADER, true))
      const homepageImages = secondaryHeader.map((item: any) => ({
        id: item.id,
        image: item.desktopImage,
        image_mobile: item.mobileImage,
        link: item.url
      }))
      const response = await setSecondaryHeader({
        variables: {
          homepageImages
        }
      })
      message.success(get(response, 'data.setSecondaryHeader.message', ''))
      dispatch(setLoadersAction(Sections.SECONDARY_HEADER, false))
    } catch (e) {
      message.error(e.message)
    }
  }
  render() {
    const {
      formatMessage,
      desktopImage,
      mainHeader,
      mainHeaderLoading,
      secondaryHeaderLoading,
      loaders: {
        mainLoader,
        mainHeader: mainHeaderLoader,
        secondaryHeader: secondaryHeaderLoader
      },
      secondaryHeader
    } = this.props

    return mainLoader ? (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    ) : (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <MainHeader
          onUploadFile={this.handleOnUploadFile}
          setUrl={this.handleOnSetUrl}
          onSaveHeader={this.handleOnSaveMainHeader}
          saving={mainHeaderLoader}
          {...{
            desktopImage,
            formatMessage,
            mainHeader,
            loading: mainHeaderLoading,
            mainHeaderLoader
          }}
        />
        <SecondaryHeader
          onUploadFile={this.handleOnUploadFile}
          setUrl={this.handleOnSetUrlLists}
          onSaveHeader={this.handleOnSaveSecondaryHeader}
          saving={secondaryHeaderLoader}
          {...{
            desktopImage,
            formatMessage,
            loading: secondaryHeaderLoading,
            secondaryHeader
          }}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('homepageAdmin').toJS()
const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const HomepageAdminEnhance = compose(
  getHomepageInfo,
  setMainHeaderMutation,
  setSecondaryHeaderMutation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomepageAdmin)

export default HomepageAdminEnhance
