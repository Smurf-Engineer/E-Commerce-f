/**
 * HomepageAdminActions Component - Created by eduardoquintero on 30/05/19.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
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
  client: any
  mainHeader: any
  mainHeaderLoading: any
  secondaryHeaderLoading: any
  loaders: any
  dispatch: any
  secondaryHeader: any
  formatMessage: (messageDescriptor: any) => string
  setMainHeader: (variables: {}) => Promise<any>
  setSecondaryHeader: (variables: {}) => Promise<any>
  setLoadersAction: (section: string, loading: boolean) => void
  setHomepageInfoAction: (data: any) => void
  setUrlAction: (value: string) => void
  setUrlListAction: (value: string, index: number) => void
  uploadFileAction: (
    file: any,
    section: string,
    imageType: string,
    index: number
  ) => void
}

class HomepageAdmin extends React.Component<Props, {}> {
  async componentDidMount() {
    const {
      client: { query },
      setLoadersAction,
      setHomepageInfoAction
    } = this.props
    try {
      setLoadersAction(Sections.MAIN_CONTAINER, true)
      const response = await query({
        query: getHomepageInfo,
        variables: {},
        fetchPolicy: 'network-only'
      })

      setHomepageInfoAction(response.data.getHomepageContent)
      setLoadersAction(Sections.MAIN_CONTAINER, false)
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
    const { uploadFileAction } = this.props
    uploadFileAction(file, section, imageType, index)
  }
  handleOnSaveMainHeader = async () => {
    try {
      const { setMainHeader, mainHeader, setLoadersAction } = this.props
      setLoadersAction(Sections.MAIN_HEADER, true)
      const response = await setMainHeader({
        variables: {
          headerImage: mainHeader.desktopImage,
          headerImageMobile: mainHeader.mobileImage,
          headerImageLink: mainHeader.url
        }
      })
      message.success(get(response, 'data.setMainHeader.message', ''))
      setLoadersAction(Sections.MAIN_HEADER, false)
    } catch (e) {
      message.error(e.message)
    }
  }
  handleOnSaveSecondaryHeader = async () => {
    try {
      const {
        setSecondaryHeader,
        secondaryHeader,
        setLoadersAction
      } = this.props
      setLoadersAction(Sections.SECONDARY_HEADER, true)
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
      setLoadersAction(Sections.SECONDARY_HEADER, false)
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
      secondaryHeader,
      setUrlAction,
      setUrlListAction
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
          setUrl={setUrlAction}
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
          setUrl={setUrlListAction}
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
const mapDispatchToProps = { ...HomepageAdminActions, homepageAdminApiActions }

const HomepageAdminEnhance = compose(
  withApollo,
  setMainHeaderMutation,
  setSecondaryHeaderMutation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomepageAdmin)

export default HomepageAdminEnhance
