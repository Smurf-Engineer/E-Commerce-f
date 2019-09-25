/**
 * ProDesign Screen - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as proDesignActions from './actions'
import colorIcon from '../../assets/color_white.svg'
import uploadIcon from '../../assets/upload_white.svg'
import Render3D from '../../components/Render3D'
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
  Layout,
  StyledTabs,
  Render3DContainer
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import UploadTab from './UploadTab'
import ColorTab from './ColorTab'
import { UPLOAD, COLOR } from './constants'
import { ProductSearchResult } from '../../types/common'

const { TabPane } = AntdTabs

interface Props {
  intl: InjectedIntl
  selectedKey: string
  productSearchResults: ProductSearchResult[]
  onTabClickAction: (selectedKey: string) => void
  setSearchProductAction: (product: ProductSearchResult[]) => void
  setProductCodeAction: (productCode: string) => void
}
export class ProDesign extends React.Component<Props, {}> {
  render3D: any
  handleOnPressBack = () => {
    window.location.replace('/admin')
  }
  render() {
    const {
      intl,
      onTabClickAction,
      selectedKey,
      setSearchProductAction,
      productSearchResults,
      setProductCodeAction
    } = this.props
    const { formatMessage } = intl
    const tabs = (
      <StyledTabs activeKey={selectedKey} onTabClick={onTabClickAction}>
        <TabPane tab={<Tab label={UPLOAD} icon={uploadIcon} />} key={UPLOAD}>
          <UploadTab
            {...{ formatMessage, productSearchResults }}
            setSearchProduct={setSearchProductAction}
            setProductCode={setProductCodeAction}
          />
        </TabPane>
        <TabPane tab={<Tab label={COLOR} icon={colorIcon} />} key={COLOR}>
          <ColorTab {...{ formatMessage }} />
        </TabPane>
      </StyledTabs>
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
        <Layout>
          {tabs}
          <Render3DContainer>
            <Render3D
              loading={false}
              designId={'B1ISp0PPS'}
              isProduct={false}
              ref={(render3D: any) => (this.render3D = render3D)}
            />
          </Render3DContainer>
        </Layout>
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
