/**
 * HomepageAdminActions Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
import { getHomepageInfo, setMainHeaderMutation } from './data'
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
  dekstopImage: string
  mainHeader: any
  loading: any
  loaders: any
  dispatch: any
  formatMessage: (messageDescriptor: any) => string
  uploadFileAction: (file: any, section: string, imageType: string) => void
  homepageInfo: () => Promise<any>
  setMainHeader: (variables: {}) => Promise<any>
}

class HomepageAdmin extends React.Component<Props, {}> {
  async componentDidMount() {
    const { homepageInfo, dispatch } = this.props
    const { setLoadersAction, setHomepageInfoAction } = HomepageAdminActions
    try {
      dispatch(setLoadersAction(Sections.MAIN_CONTAINER, true))
      const response = await homepageInfo()
      // const data = get(response, 'data.getHomepageContent', {})

      dispatch(setHomepageInfoAction(response.data.getHomepageContent))
      dispatch(setLoadersAction(Sections.MAIN_CONTAINER, false))
    } catch (e) {
      console.error(e)
    }
  }
  handleOnUploadFile = async (
    file: any,
    section: string,
    imageType: string
  ) => {
    const { dispatch } = this.props
    const { uploadFileAction } = homepageAdminApiActions
    dispatch(uploadFileAction(file, section, imageType))
  }
  handleOnSetUrl = (value: string) => {
    const { dispatch } = this.props
    const { setUrlAction } = HomepageAdminActions
    dispatch(setUrlAction(value))
  }
  handleOnSaveMainHeader = async () => {
    try {
      const { setMainHeader, mainHeader, dispatch } = this.props
      const { setLoadersAction } = HomepageAdminActions
      dispatch(setLoadersAction(Sections.MAIN_HEADER, true))
      const response = await setMainHeader({
        variables: {
          headerImage: mainHeader.dekstopImage,
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
  render() {
    const {
      formatMessage,
      dekstopImage,
      mainHeader,
      loading,
      loaders: { mainLoader, mainHeader: mainHeaderLoader }
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
            dekstopImage,
            formatMessage,
            mainHeader,
            loading,
            mainHeaderLoader
          }}
        />
        <SecondaryHeader
          onUploadFile={this.handleOnUploadFile}
          setUrl={this.handleOnSetUrl}
          onSaveHeader={this.handleOnSaveMainHeader}
          saving={mainHeaderLoader}
          {...{
            dekstopImage,
            formatMessage,
            mainHeader,
            loading,
            mainHeaderLoader
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomepageAdmin)

export default HomepageAdminEnhance
