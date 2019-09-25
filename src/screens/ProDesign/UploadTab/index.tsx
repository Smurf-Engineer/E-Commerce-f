/**
 * UploadTab - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { withApollo, compose } from 'react-apollo'
import debounce from 'lodash/debounce'
import { getProducts } from './data'
import {
  Container,
  Header,
  SearchButton,
  SearchInput,
  Content,
  StyledSearch
} from './styledComponents'
import Icon from 'antd/lib/icon'
import { containsNumber } from '../../../utils/utilsFiles'
import AntdMessage from 'antd/lib/message'
import messages from './messages'
import { Message, ProductSearchResult } from '../../../types/common'
import { SelectValue } from 'antd/lib/select'

interface Props {
  client: any
  productSearchResults: ProductSearchResult[]
  formatMessage: (messageDescriptor: Message) => string
  setSearchProduct: (products: ProductSearchResult[]) => void
  setProductCode: (productCode: string) => void
}

export class UploadTab extends React.Component<Props, {}> {
  debounceSearchProduct = debounce(value => this.handleOnChange(value), 300)

  handleOnChange = async (value: SelectValue) => {
    const {
      client: { query },
      setSearchProduct
    } = this.props
    try {
      const parsedValue = value.toString()
      if (parsedValue.length > 1 && !containsNumber(parsedValue)) {
        const { data } = await query({
          query: getProducts,
          variables: { pattern: parsedValue.trim() },
          fetchPolicy: 'network-only'
        })

        const searchCodes = data.getProductSearch.map(
          (item: ProductSearchResult) => `${item.name} - ${item.code}`
        )
        setSearchProduct(searchCodes)
      }
    } catch (error) {
      AntdMessage.error(error.message)
    }
  }

  handleOnSelect = async (value: SelectValue) => {
    const { setProductCode } = this.props
    const parsedValue = value.toString()
    const productCode = parsedValue
      .trim()
      .split('-')
      .reverse()[0]
    setProductCode(productCode)
  }

  render() {
    const { formatMessage, productSearchResults } = this.props
    return (
      <Container>
        <Header>{formatMessage(messages.title)}</Header>
        <Content>
          <StyledSearch
            onChange={this.debounceSearchProduct}
            dataSource={productSearchResults}
            onSelect={this.handleOnSelect}
          >
            <SearchInput
              suffix={
                <SearchButton className="search-btn" size="large" type="ghost">
                  <Icon type="search" />
                </SearchButton>
              }
            />
          </StyledSearch>
        </Content>
      </Container>
    )
  }
}

const UploadTabEnhance = compose(withApollo)(UploadTab)

export default UploadTabEnhance
