/**
 * DesignSearch Screen - Created by miguelcanobbio on 15/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Search from 'antd/lib/input/Search'
// import Spin from 'antd/lib/spin'
import * as designSearchActions from './actions'
import messages from './messages'
import {
  Container,
  Header,
  LogoIcon,
  DesignerLink,
  Content,
  Title,
  ContentHeader,
  Subtitle
  // LoadingContainer
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import OrderFiles from './OrderFiles'
import { OrderSearchResult } from '../../types/common'

interface Props {
  history: any
}

const dummyProduct: OrderSearchResult = {
  productCode: 'JV2-01-002-01',
  image:
    'https://storage.googleapis.com/jakroo-storage/product_images/fondo/product-img-fondo-01-front.png',
  status: 'ACTIVE ORDER',
  svgUrl:
    'https://storage.googleapis.com/jakroo-storage/my_files_folder_test/S17BSSLmX/a9f606543354e-converted5.png',
  assets: [
    {
      name: 'Logo.png',
      fileUrl:
        'https://storage.googleapis.com/jakroo-storage/my_files_folder_test/S17BSSLmX/ala_lei_ai_vector_2.png'
    },
    {
      name: 'Sponsorlogo.svg',
      fileUrl:
        'https://storage.googleapis.com/jakroo-storage/my_files_folder_test/S17BSSLmX/ala_lei_ai_vector_2.png'
    },
    {
      name: 'Sponsor123.svg',
      fileUrl:
        'https://storage.googleapis.com/jakroo-storage/my_files_folder_test/S17BSSLmX/ala_lei_ai_vector_2.png'
    },
    {
      name: 'Back.svg',
      fileUrl:
        'https://storage.googleapis.com/jakroo-storage/my_files_folder_test/S17BSSLmX/ala_lei_ai_vector_2.png'
    },
    {
      name: 'Square.svg',
      fileUrl:
        'https://storage.googleapis.com/jakroo-storage/my_files_folder_test/S17BSSLmX/ala_lei_ai_vector_2.png'
    },
    {
      name: 'Cellphone.svg',
      fileUrl:
        'https://storage.googleapis.com/jakroo-storage/my_files_folder_test/S17BSSLmX/ala_lei_ai_vector_2.png'
    }
  ]
}

export class DesignSearch extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <Header>
          <ContentHeader>
            <LogoIcon src={logo} />
            <DesignerLink onClick={this.goToDesignerTool}>
              <FormattedMessage {...messages.designerTool} />
            </DesignerLink>
          </ContentHeader>
        </Header>
        <Content>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Subtitle>
            <FormattedMessage {...messages.addCode} />
          </Subtitle>
          <Search
            placeholder="Product Code"
            onSearch={this.handleOnSearch}
            enterButton={true}
            size="large"
          />
          {/* <LoadingContainer>
            <Spin />
          </LoadingContainer> */}
          <OrderFiles order={dummyProduct} />
        </Content>
      </Container>
    )
  }

  goToDesignerTool = () => {
    const { history } = this.props
    history.push('designer-tool')
  }

  handleOnSearch = (value: string) => {
    // TODO: execute query
  }
}

const mapStateToProps = (state: any) => state.get('designSearch').toJS()

const DesignSearchEnhance = compose(
  connect(
    mapStateToProps,
    { ...designSearchActions }
  )
)(DesignSearch)

export default DesignSearchEnhance
