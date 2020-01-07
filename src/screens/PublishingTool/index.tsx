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
import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import message from 'antd/lib/message'
import * as publishingToolActions from './actions'
import * as publishingToolApi from './api'
import Tab from '../../components/Tab'
import ThemeModal from '../../components/ThemeModal'
import DesignModal from '../../components/DesignModal'
import { deleteThemeMutation, deleteStyleMutation } from './data'
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
  Tabs
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import {
  Theme,
  MessagePayload,
  ModelConfig,
  DesignObject,
  ModelDesign
} from '../../types/common'
import { SETTINGS_TAB, Sections } from './constants'

const { confirm } = Modal
interface Props {
  intl: InjectedIntl
  productToSearch: string
  productCode: string
  selectedTheme: number
  editableTheme: Theme | null
  currentTab: number
  currentPage: number
  designModalOpen: boolean
  designName: string
  uploading: boolean
  selectedDesign: number
  onSelectTab: (index: number) => void
  setProductCodeAction: (value: string) => void
  onChangeThemeAction: (id: number, section: string) => void
  setThemeToEditAction: (theme: Theme | null) => void
  updateThemeNameAction: (name: string) => void
  deleteTheme: (variables: {}) => Promise<MessagePayload>
  setCurrentPageAction: (page: number) => void
  toggleAddDesignAction: () => void
  updateDesignNameAction: (value: string) => void
  uploadDesignAction: (areas: any, config: any) => void
  setModelAction: (
    config: ModelConfig,
    colorIdeas: DesignObject[],
    design: ModelDesign
  ) => void
  deleteStyle: (variables: {}) => Promise<MessagePayload>
  unselectAction: (section: string) => void
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
      intl: { formatMessage },
      selectedTheme,
      unselectAction
    } = this.props
    confirm({
      title: formatMessage(messages.deleteConfirmation),
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
          if (selectedTheme === id) {
            unselectAction(Sections.Theme)
          }
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }
  handleOnDeleteDesign = async (id: number) => {
    const {
      intl: { formatMessage },
      unselectAction
    } = this.props
    confirm({
      title: formatMessage(messages.deleteConfirmation),
      content: formatMessage(messages.deleteDesign),
      onOk: async () => {
        try {
          const {
            deleteStyle,
            productCode,
            selectedTheme,
            selectedDesign
          } = this.props
          await deleteStyle({
            variables: { id },
            update: (store: any) => {
              const data = store.readQuery({
                query: getProductFromCode,
                variables: { code: productCode }
              })
              const themes = get(data, 'product.themes', [])
              const themeIndex = findIndex(
                themes,
                ({ id: themeId }) => themeId === selectedTheme
              )
              const { styles } = themes[themeIndex]
              const updatedStyles = remove(
                styles,
                ({ id: styleId }) => styleId !== id
              )
              set(data, `product.themes[${themeIndex}].styles`, updatedStyles)
              store.writeQuery({
                query: getProductFromCode,
                data,
                variables: { code: productCode }
              })
            }
          })
          if (selectedDesign === id) {
            unselectAction(Sections.Design)
          }
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
      currentTab,
      setCurrentPageAction,
      currentPage,
      toggleAddDesignAction,
      designModalOpen,
      designName,
      updateDesignNameAction,
      uploadDesignAction,
      uploading,
      selectedDesign,
      setModelAction
    } = this.props
    const { formatMessage } = intl
    const handleOnSelectTab = (index: number) => () => onSelectTab(index)

    const tabs = steps.map((step, index) => {
      return (
        <Tab
          {...{ index }}
          key={index}
          activeOnClick={currentTab > SETTINGS_TAB}
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
          <Tabs>{tabs}</Tabs>
          <View />
        </TopMenu>
        <Layout>
          <Themes
            {...{
              formatMessage,
              productCode,
              selectedTheme,
              currentPage,
              selectedDesign
            }}
            setProductCode={setProductCodeAction}
            onChangeTheme={onChangeThemeAction}
            onEditTheme={setThemeToEditAction}
            onDeleteTheme={this.handleOnDeleteTheme}
            onDeleteDesign={this.handleOnDeleteDesign}
            goToPage={setCurrentPageAction}
            toggleAddDesign={toggleAddDesignAction}
            onLoadDesign={setModelAction}
          />
        </Layout>
        <ThemeModal
          {...{ productCode, formatMessage }}
          theme={editableTheme}
          onCancel={this.handleOnCancel}
          onUpdateName={updateThemeNameAction}
        />
        <DesignModal
          {...{ productCode, formatMessage, uploading }}
          onCancel={toggleAddDesignAction}
          onUpdateName={updateDesignNameAction}
          open={designModalOpen}
          name={designName}
          onSave={uploadDesignAction}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('publishingTool').toJS()

const PublishingToolEnhance = compose(
  withApollo,
  injectIntl,
  graphql(deleteThemeMutation, { name: 'deleteTheme' }),
  graphql(deleteStyleMutation, { name: 'deleteStyle' }),
  connect(mapStateToProps, {
    ...publishingToolActions,
    ...publishingToolApi
  })
)(PublishingTool)

export default PublishingToolEnhance
