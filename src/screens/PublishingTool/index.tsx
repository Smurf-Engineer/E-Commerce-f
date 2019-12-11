/**
 * PublishingTool Screen - Created by eduardoquintero on 02/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import * as publishingToolActions from './actions'
import Tab from '../../components/Tab'
import Theme from './Theme'
import messages from './messages'
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
  Layout,
  View,
  NavbarTabs
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'

interface Props {
  intl: InjectedIntl
  productToSearch: string
  productCode: string
  selectedTheme: number
  onSelectTab: (index: number) => void
  setProductCodeAction: (value: string) => void
  onChangeThemeAction: (id: number) => void
}

const steps = ['theme', 'designCustomization']

export class PublishingTool extends React.Component<Props, {}> {
  render3D: any
  async componentDidMount() {
    await LoadScripts(threeDScripts)
  }
  handleOnPressBack = () => {
    window.location.replace('/admin')
  }

  render() {
    const {
      intl,
      onSelectTab,
      productCode,
      setProductCodeAction,
      onChangeThemeAction,
      selectedTheme
    } = this.props
    const { formatMessage } = intl
    const handleOnSelectTab = (index: number) => () => onSelectTab(index)
    const tabs = steps.map((step, index) => {
      return (
        <Tab
          {...{ index }}
          key={index}
          activeOnClick={true}
          selected={false}
          onSelectTab={handleOnSelectTab(index)}
          totalItems={steps.length}
        >
          <FormattedMessage {...messages[step]} />
        </Tab>
      )
    })

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
          <NavbarTabs>{tabs}</NavbarTabs>
          <View />
        </TopMenu>
        <Layout>
          <Theme
            {...{ formatMessage, productCode, selectedTheme }}
            setProductCode={setProductCodeAction}
            onChangeTheme={onChangeThemeAction}
          />
        </Layout>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const publishingTool = state.get('publishingTool').toJS()
  return {
    ...publishingTool
  }
}

const PublishingToolEnhance = compose(
  withApollo,
  injectIntl,
  connect(mapStateToProps, {
    ...publishingToolActions
  })
)(PublishingTool)

export default PublishingToolEnhance
