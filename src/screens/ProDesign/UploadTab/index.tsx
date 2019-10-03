/**
 * UploadTab - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import debounce from 'lodash/debounce'
import { getProducts } from './data'
import {
  Container,
  Header,
  SearchButton,
  SearchInput,
  Content,
  StyledSearch,
  Label
} from './styledComponents'
import Icon from 'antd/lib/icon'
import { containsNumberAndLetters } from '../../../utils/utilsFiles'
import AntdMessage from 'antd/lib/message'
import messages from './messages'
import { Message, ProductSearchResult, QueryProps } from '../../../types/common'
import { SelectValue } from 'antd/lib/select'

interface Data extends QueryProps {
  getProductSearch: ProductSearchResult[]
}
interface Props {
  client: any
  productToSearch: string
  data: Data
  formatMessage: (messageDescriptor: Message) => string
  setProductCode: (productCode: string) => void
  setProductToSearch: (value: string) => void
}

export class UploadTab extends React.Component<Props, {}> {
  debounceSearchProduct = debounce(value => this.handleOnChange(value), 300)

  handleOnChange = async (value: SelectValue) => {
    const { setProductToSearch } = this.props
    try {
      const parsedValue = value.toString()
      if (containsNumberAndLetters(parsedValue)) {
        setProductToSearch(parsedValue.trim())
      }
    } catch (error) {
      AntdMessage.error(error.message)
    }
  }

  handleOnSelect = async (value: SelectValue) => {
    const { setProductCode } = this.props
    const parsedValue = value.toString().replace(/ /g, '')
    const productCode = parsedValue.split('-').reverse()[0]
    setProductCode(productCode)
  }

  render() {
    const { formatMessage, data } = this.props
    const searchCodes =
      data &&
      !data.loading &&
      data.getProductSearch.map(
        (item: ProductSearchResult) => `${item.name} - ${item.code}`
      )
    return (
      <Container>
        <Header>{formatMessage(messages.title)}</Header>
        <Content>
          <Label>{formatMessage(messages.selectBase)}</Label>
          <StyledSearch
            onChange={this.debounceSearchProduct}
            dataSource={searchCodes}
            onSelect={this.handleOnSelect}
            placeholder={formatMessage(messages.productCode)}
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

type OwnProps = {
  productToSearch?: string
}

const UploadTabEnhance = compose(
  graphql<Data>(getProducts, {
    options: (ownprops: OwnProps) => {
      const { productToSearch } = ownprops
      return {
        variables: {
          pattern: productToSearch
        },
        skip: !productToSearch,
        fetchPolicy: 'network-only'
      }
    }
  })
)(UploadTab)

export default UploadTabEnhance
