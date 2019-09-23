/**
 * ProDesign Screen - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as proDesignActions from './actions'
import colorIcon from '../../assets/color_white.svg'
import uploadIcon from '../../assets/upload_white.svg'
import messages from './messages'
import AntdTabs from 'antd/lib/tabs'
import Tab from './Tab'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
import {
  Container,
  Header,
  Logo,
  Title,
  BackIcon,
  BackButton,
  Back,
  TopMenu,
  Layout
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import UploadTab from './UploadTab'
import ColorTab from './ColorTab'
import { UPLOAD, COLOR } from './constants'

const { TabPane } = AntdTabs

interface Props {
  intl: InjectedIntl
  selectedKey: string
  onTabClickAction: (selectedKey: string) => void
}
export class ProDesign extends React.Component<Props, {}> {
  handleOnPressBack = () => {
    window.location.replace('/admin')
  }
  render() {
    const { intl, onTabClickAction, selectedKey } = this.props
    const { formatMessage } = intl
    const tabs = (
      <AntdTabs activeKey={selectedKey} onTabClick={onTabClickAction}>
        <TabPane tab={<Tab label={UPLOAD} icon={uploadIcon} />} key={UPLOAD}>
          <UploadTab />
        </TabPane>
        <TabPane tab={<Tab label={COLOR} icon={colorIcon} />} key={COLOR}>
          <ColorTab />
        </TabPane>
      </AntdTabs>
    )
    return (
      <Container>
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
        <Layout>{tabs}</Layout>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const proDesign = state.get('proDesign').toJS()
  return {
    ...proDesign
  }
}

const ProDesignEnhance = compose(
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
    {
      ...proDesignActions
    }
  )
)(ProDesign)

export default ProDesignEnhance
