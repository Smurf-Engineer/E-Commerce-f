/**
 * UploadTab - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
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
import { Message, ProductSearchResult, QueryProps } from '../../../types/common'
import { SelectValue } from 'antd/lib/select'
import get from 'lodash/get'

interface Data extends QueryProps {
  getProductSearch: ProductSearchResult[]
}
interface Props {
  client: any
  productSearchResults: ProductSearchResult[]
  productCode: string
  uploadingFile: boolean
  fileName: string
  productToSearch: string
  data: Data
  formatMessage: (messageDescriptor: Message) => string
  setProductCode: (productCode: string) => void
  onUploadFile: (file: any, name: string) => void
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
      onUploadFile(file, name)
    }
    return false
  }

  render() {
    const {
      formatMessage,
      productCode,
      uploadingFile,
      fileName,
      data
    } = this.props

    const searchCodesData = get(data, 'getProductSearch', [])
    const searchCodes = searchCodesData.map(
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
          {productCode && (
            <UploadContainer>
              <Label className={'uploadTitle'}>
                {formatMessage(messages.addDesignPNG)}
              </Label>
              <SingleDraggerWithLoading
                className="upload"
                loading={uploadingFile}
                onSelectImage={this.beforeUpload}
                formatMessage={formatMessage}
                extensions={['.png']}
                {...{ fileName }}
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
