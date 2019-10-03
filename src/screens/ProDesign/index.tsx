/**
 * ProDesign Screen - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as proDesignActions from './actions'
import colorIcon from '../../assets/color_white.svg'
import get from 'lodash/get'
import uploadIcon from '../../assets/upload_white.svg'
import Render3D from '../../components/Render3D'
import { GetProductsByIdQuery } from './data'
import messages from './messages'
import AntdTabs from 'antd/lib/tabs'
import Tab from './Tab'
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
  StyledTabs,
  Render3DContainer
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import UploadTab from './UploadTab'
import ColorTab from './ColorTab'
import { UPLOAD, COLOR } from './constants'
import { Product, QueryProps } from '../../types/common'

const { TabPane } = AntdTabs

interface ProductTypes extends Product {
  intendedUse: string
  temperatures: string
  materials: string
}

interface Data extends QueryProps {
  productFromCode: ProductTypes
  match: object
}
interface Props {
  intl: InjectedIntl
  selectedKey: string
  data: Data
  productCode: string
  productToSearch: string
  onTabClickAction: (selectedKey: string) => void
  setProductCodeAction: (productCode: string) => void
  setProductToSearchAction: (value: string) => void
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
      setProductCodeAction,
      data,
      setProductToSearchAction,
      productToSearch
    } = this.props
    const { formatMessage } = intl
    const product = get(data, 'productFromCode')
    const loading = get(data, 'loading')

    const tabs = (
      <StyledTabs activeKey={selectedKey} onTabClick={onTabClickAction}>
        <TabPane tab={<Tab label={UPLOAD} icon={uploadIcon} />} key={UPLOAD}>
          <UploadTab
            {...{ formatMessage, productToSearch }}
            setProductCode={setProductCodeAction}
            setProductToSearch={setProductToSearchAction}
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
            {product && !loading && (
              <Render3D
                customProduct={true}
                isProduct={true}
                designId={0}
                {...{ product }}
                ref={(render3D: any) => (this.render3D = render3D)}
              />
            )}
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

type OwnProps = {
  productCode?: string
}

const ProDesignEnhance = compose(
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
    {
      ...proDesignActions
    }
  ),
  graphql<Data>(GetProductsByIdQuery, {
    options: (ownprops: OwnProps) => {
      const { productCode } = ownprops
      return {
        variables: {
          code: productCode
        },
        skip: !productCode,
        fetchPolicy: 'network-only'
      }
    }
  })
)(ProDesign)

export default ProDesignEnhance
