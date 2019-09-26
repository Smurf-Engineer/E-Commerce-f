/**
 * UploadTab - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { withApollo, compose } from 'react-apollo'
import debounce from 'lodash/debounce'
import { getProducts } from './data'
import indexOf from 'lodash/indexOf'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'
import SingleDraggerWithLoading from '../../../components/SingleDraggerWithLoading'
import {
  Container,
  Header,
  SearchButton,
  SearchInput,
  Content,
  StyledSearch,
  Label,
  ButtonContainer,
  UploadContainer
} from './styledComponents'
import Icon from 'antd/lib/icon'
import {
  containsNumberAndLetters,
  getFileExtension
} from '../../../utils/utilsFiles'
import AntdMessage from 'antd/lib/message'
import messages from './messages'
import { Message, ProductSearchResult } from '../../../types/common'
import { SelectValue } from 'antd/lib/select'

interface Props {
  client: any
  productSearchResults: ProductSearchResult[]
  productCode: string
  formatMessage: (messageDescriptor: Message) => string
  setSearchProduct: (products: ProductSearchResult[]) => void
  setProductCode: (productCode: string) => void
  onUploadFile: (file: any) => void
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
      if (containsNumberAndLetters(parsedValue)) {
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
    const parsedValue = value.toString().replace(/ /g, '')
    const productCode = parsedValue.split('-').reverse()[0]
    setProductCode(productCode)
  }

  beforeUpload = (file: any) => {
    const { formatMessage, onUploadFile } = this.props
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = getFileExtension(name)
      if (indexOf(['.png'], (fileExtension as String).toLowerCase()) === -1) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      onUploadFile(file)
    }
    return false
  }

  render() {
    const { formatMessage, productSearchResults, productCode } = this.props
    return (
      <Container>
        <Header>{formatMessage(messages.title)}</Header>
        <Content>
          <Label>{formatMessage(messages.selectBase)}</Label>
          <StyledSearch
            onChange={this.debounceSearchProduct}
            dataSource={productSearchResults}
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
          {productCode && (
            <UploadContainer>
              <Label className={'uploadTitle'}>
                {formatMessage(messages.addDesignPNG)}
              </Label>
              <SingleDraggerWithLoading
                className="upload"
                loading={false}
                onSelectImage={this.beforeUpload}
                formatMessage={formatMessage}
                extensions={['.png']}
              >
                <Button>
                  <ButtonContainer>
                    <Icon type="upload" />
                    {formatMessage(messages.uploadDesign)}
                  </ButtonContainer>
                </Button>
              </SingleDraggerWithLoading>
            </UploadContainer>
          )}
        </Content>
      </Container>
    )
  }
}

const UploadTabEnhance = compose(withApollo)(UploadTab)

export default UploadTabEnhance
