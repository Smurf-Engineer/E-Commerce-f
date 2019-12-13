/**
 * DesignTools Screen - Created by Jesús Apodaca on 04/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import message from 'antd/lib/message'
import * as publishingToolActions from './actions'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, withApollo, graphql } from 'react-apollo'
import { saveDesignConfigMutation } from './data'
import messages from './messages'
import { connect } from 'react-redux'
import {
  Container,
  Header,
  Logo,
  Title,
  BackIcon,
  BackButton,
  Back,
  TopMenu,
  Layout,
  SaveContainer,
  SaveButton,
  Loading
} from './styledComponents'
import { History } from 'history'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import { Font } from '../../types/common'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'

interface Props {
  intl: InjectedIntl
  history: History
  loading: boolean
  onResetReducer: () => void
  saveDesignConfig: (variables: {}) => Promise<any>
  setUploadingAction: (isLoading: boolean) => void
}
export class DesignTools extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { onResetReducer } = this.props
    onResetReducer()
  }
  handleOnPressBack = () => {
    window.location.replace('/admin')
  }
  saveSettings = async () => {
    const { saveDesignConfig, history, setUploadingAction } = this.props
    try {
      setUploadingAction(true)
      // Check if the added symbols by the user are not in the hidden list
      const symbolsToAdd: string[] = []

      // Check and separate the fonts updates
      // Note: This is to have a separated list for the updates and then a list for the to-add
      const fontsToUpdate: Font[] = []

      // Create the to-add fonts list only for those that are true
      const fontsToAdd: string[] = []

      // Create the hidden symbols list
      const symbolsToHide: string[] = []
      const colorsObject = {
        colors: '',
        stitching: ''
      }
      const response = await saveDesignConfig({
        variables: {
          colors: colorsObject,
          symbolsToHide,
          symbolsToAdd,
          fontsToUpdate,
          fontsToAdd
        }
      })
      message.success(get(response, 'data.saveDesignConfig.message', ''))
      history.push('/admin')
    } catch (error) {
      setUploadingAction(false)
      message.error(error.message)
    }
  }
  render() {
    const { intl, loading } = this.props
    const { formatMessage } = intl

    return (
      <Container>
        <Helmet title={formatMessage(messages.title)} />
        <Header>
          <Logo src={logo} />
          <Title>{formatMessage(messages.title)}</Title>
        </Header>
        <TopMenu>
          <BackButton onClick={this.handleOnPressBack}>
            <BackIcon src={backIcon} />
            <Back>{formatMessage(messages.back)}</Back>
          </BackButton>
        </TopMenu>
        <Loading active={loading}>
          <Spin size="large" />
        </Loading>
        <Layout>
          <SaveContainer>
            <SaveButton onClick={this.saveSettings}>
              {formatMessage(messages.update)}
            </SaveButton>
            <Logo src={logo} />
          </SaveContainer>
        </Layout>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const publishingTool = state.get('designTools').toJS()
  return {
    ...publishingTool
  }
}

const DesignToolsEnhance = compose(
  withApollo,
  injectIntl,
  graphql(saveDesignConfigMutation, { name: 'saveDesignConfig' }),
  connect(mapStateToProps, {
    ...publishingToolActions
  })
)(DesignTools)

export default DesignToolsEnhance
