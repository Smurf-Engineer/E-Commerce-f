/**
 * PublishingTool Screen - Created by eduardoquintero on 02/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import Modal from 'antd/lib/modal'
import set from 'lodash/set'
import remove from 'lodash/remove'
import get from 'lodash/get'
import message from 'antd/lib/message'
import * as publishingToolActions from './actions'
import Tab from '../../components/Tab'
import ThemeModal from '../../components/ThemeModal'
import { deleteThemeMutation } from './data'
import { getProductFromCode } from './Themes/data'
import Themes from './Themes'
import messages from './messages'
import { connect } from 'react-redux'
import { compose, withApollo, graphql } from 'react-apollo'
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
import { Theme, MessagePayload } from '../../types/common'

const { confirm } = Modal
interface Props {
  intl: InjectedIntl
  productToSearch: string
  productCode: string
  selectedTheme: number
  editableTheme: Theme | null
  currentTab: number
  onSelectTab: (index: number) => void
  setProductCodeAction: (value: string) => void
  onChangeThemeAction: (id: number) => void
  setThemeToEditAction: (theme: Theme | null) => void
  updateThemeNameAction: (name: string) => void
  deleteTheme: (variables: {}) => Promise<MessagePayload>
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
  handleOnCancel = () => {
    const { setThemeToEditAction } = this.props
    setThemeToEditAction(null)
  }
  handleOnDeleteTheme = (id: number) => {
    const {
      intl: { formatMessage }
    } = this.props
    confirm({
      title: formatMessage(messages.deleteThemeTitle),
      content: formatMessage(messages.deleteTheme),
      onOk: async () => {
        try {
          const { deleteTheme, productCode } = this.props
          await deleteTheme({
            variables: { id },
            update: (store: any) => {
              const data = store.readQuery({
                query: getProductFromCode,
                variables: { code: productCode }
              })
              const themes = get(data, 'product.themes', [])
              const updatedThemes = remove(
                themes,
                ({ id: themeId }) => themeId !== id
              )
              set(data, 'product.themes', updatedThemes)
              store.writeQuery({
                query: getProductFromCode,
                data,
                variables: { code: productCode }
              })
            }
          })
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }

  render() {
    const {
      intl,
      onSelectTab,
      productCode,
      setProductCodeAction,
      onChangeThemeAction,
      selectedTheme,
      setThemeToEditAction,
      editableTheme,
      updateThemeNameAction,
      currentTab
    } = this.props
    const { formatMessage } = intl
    const handleOnSelectTab = (index: number) => () => onSelectTab(index)

    const tabs = steps.map((step, index) => {
      return (
        <Tab
          {...{ index }}
          key={index}
          activeOnClick={true}
          selected={currentTab === index}
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
          <Themes
            {...{ formatMessage, productCode, selectedTheme }}
            setProductCode={setProductCodeAction}
            onChangeTheme={onChangeThemeAction}
            onEditTheme={setThemeToEditAction}
            onDeleteTheme={this.handleOnDeleteTheme}
          />
        </Layout>
        <ThemeModal
          {...{ productCode, formatMessage }}
          theme={editableTheme}
          onCancel={this.handleOnCancel}
          onUpdateName={updateThemeNameAction}
        />
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
  graphql(deleteThemeMutation, { name: 'deleteTheme' }),
  connect(mapStateToProps, {
    ...publishingToolActions
  })
)(PublishingTool)

export default PublishingToolEnhance
