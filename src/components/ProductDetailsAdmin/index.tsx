/**
 * OrderDetailsAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import { Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Spin from 'antd/lib/spin'
import get from 'lodash/get'
import find from 'lodash/find'
import { graphql, compose } from 'react-apollo'
import messages from './messages'
import RowField from './RowField'
import { quantities, currenciesLabel } from './constants'
import Render3D from '../../components/Render3D'
import * as ProductDetailsAdminActions from './actions'
import { QueryProps, Product } from '../../types/common'
import { getProductQuery } from './data'
import {
  Container,
  ScreenTitle,
  BackLabel,
  BackText,
  Loader,
  HeaderRow,
  FormBody,
  BlueButton,
  RowImage,
  RenderBackground,
  Separator,
  ScreenSubTitle,
  Row,
  DetailsContainer,
  MainBody
} from './styledComponents'
interface Data extends QueryProps {
  product: Product
}

interface Props {
  productId: string
  data: Data
  goBack: (id: number) => void
  setProductAction: (product: Product) => void
  formatMessage: (messageDescriptor: any) => string
}

export class ProductDetailsAdmin extends React.Component<Props, {}> {
  state = {
    openedModel: false
  }
  componentDidUpdate(prevProps: Props) {
    const { data, setProductAction } = this.props
    if (data && data !== prevProps.data) {
      setProductAction(data.product)
    }
  }
  render() {
    const {
      formatMessage,
      data: { loading, product }
    } = this.props
    const { openedModel } = this.state
    const name = get(product, 'name', '')
    const mpn = get(product, 'mpn', '')
    const obj = get(product, 'obj', '')
    const mtl = get(product, 'mtl', '')
    const code = get(product, 'code', '')
    const shortDescription = get(product, 'shortDescription', '')
    const description = get(product, 'description', '')
    const yotpoId = get(product, 'yotpoId', '')
    let categories = get(product, 'sports', '')
    if (categories) {
      categories = categories.map((item: any) => item.name).join(', ')
    }
    let gendersArray = get(product, 'genders', '')
    let genders = gendersArray
    if (genders) {
      genders = genders.map((item: any) => item.name).join(', ')
    }
    let sizeRange = get(product, 'sizeRange', '')
    if (sizeRange) {
      sizeRange = sizeRange.map((item: any) => item.name).join(', ')
    }
    let fitStyles = get(product, 'fitStyles', '')
    if (fitStyles) {
      fitStyles = fitStyles.map((item: any) => item.name).join(', ')
    }
    let relatedTags = get(product, 'relatedProducts', '')
    if (relatedTags) {
      relatedTags = relatedTags.map((item: any) => item.yotpoId).join(', ')
    }
    let categoryName = get(product, 'category_name', '')
    const tags = get(product, 'tags', '')
    const active = get(product, 'active', '')
    const designCenter = get(product, 'design_center', '')
    const season = get(product, 'season', '')
    const materials = get(product, 'materials', '')
    const details = get(product, 'details', '')
    let USD = get(product, 'priceRange', [])
    if (USD) {
      USD = USD.filter(item => item.shortName === currenciesLabel.USD)
    }
    let GBP = get(product, 'priceRange', [])
    if (GBP) {
      GBP = GBP.filter(item => item.shortName === currenciesLabel.GBP)
    }
    let EUR = get(product, 'priceRange', [])
    if (EUR) {
      EUR = EUR.filter(item => item.shortName === currenciesLabel.EUR)
    }
    let CAD = get(product, 'priceRange', [])
    if (CAD) {
      CAD = CAD.filter(item => item.shortName === currenciesLabel.CAD)
    }
    let AUD = get(product, 'priceRange', [])
    if (AUD) {
      AUD = AUD.filter(item => item.shortName === currenciesLabel.AUD)
    }
    const currencies = [
      {
        label: currenciesLabel.USD,
        amounts: quantities.map(quantity =>
          find(USD, item => item.quantity === quantity)
        )
      },
      {
        label: currenciesLabel.GBP,
        amounts: quantities.map(quantity =>
          find(GBP, item => item.quantity === quantity)
        )
      },
      {
        label: currenciesLabel.EUR,
        amounts: quantities.map(quantity =>
          find(EUR, item => item.quantity === quantity)
        )
      },
      {
        label: currenciesLabel.CAD,
        amounts: quantities.map(quantity =>
          find(CAD, item => item.quantity === quantity)
        )
      },
      {
        label: currenciesLabel.AUD,
        amounts: quantities.map(quantity =>
          find(AUD, item => item.quantity === quantity)
        )
      }
    ]
    let productImages = get(product, 'pictures', '')
    if (productImages && gendersArray) {
      productImages = gendersArray.map((gender: any) => ({
        genderName: gender.name,
        genderBlockImages: productImages
          .filter((picture: any) => picture.gender_id === gender.id)
          .map((block: any) => {
            const images = []
            if (block.back_image) {
              images.push(block.back_image)
            }
            if (block.front_image) {
              images.push(block.front_image)
            }
            if (block.left_image) {
              images.push(block.left_image)
            }
            if (block.right_image) {
              images.push(block.right_image)
            }
            return images
          })
      }))
    }
    return (
      <Container>
        <BackLabel onClick={this.handleOnClickBack}>
          <Icon type="left" />
          <BackText>
            <FormattedMessage {...messages.backToProducts} />
          </BackText>
        </BackLabel>
        <MainBody>
          {!product && loading ? (
            <Loader>
              <Spin size="large" />
            </Loader>
          ) : (
            <DetailsContainer>
              <HeaderRow>
                <ScreenTitle>
                  {name}
                  <ScreenSubTitle>{mpn}</ScreenSubTitle>
                </ScreenTitle>
                <div>
                  <BlueButton size="large">
                    <FormattedMessage {...messages.editProduct} />
                  </BlueButton>
                  <Button size="large">
                    <FormattedMessage {...messages.openPublishingTool} />
                  </Button>
                </div>
              </HeaderRow>
              <FormBody>
                <Row>
                  <RowField
                    label={formatMessage(messages.productCode)}
                    value={code}
                  />
                  <RowField
                    label={formatMessage(messages.productDescription)}
                    value={shortDescription}
                  />
                  <RowField
                    label={formatMessage(messages.productModel)}
                    value={yotpoId}
                  />
                </Row>
                <Row>
                  <RowField
                    label={formatMessage(messages.categories)}
                    value={categories}
                  />
                  <RowField
                    label={formatMessage(messages.productCategories)}
                    value={categoryName}
                  />
                  <RowField
                    label={formatMessage(messages.relatedTags)}
                    subLabel={
                      <i>
                        <FormattedMessage {...messages.youMayLike} />
                      </i>
                    }
                    value={relatedTags}
                  />
                </Row>
                <Row>
                  <RowField
                    label={formatMessage(messages.searchTags)}
                    capitalize={true}
                    value={tags}
                  />
                  <RowField
                    label={formatMessage(messages.onStock)}
                    value={formatMessage(
                      active === 'true' ? messages.yes : messages.no
                    )}
                  />
                  <RowField
                    label={formatMessage(messages.designLab)}
                    value={formatMessage(
                      designCenter ? messages.yes : messages.no
                    )}
                  />
                </Row>
                <Row>
                  <RowField
                    label={formatMessage(messages.seasons)}
                    value={season}
                  />
                  <RowField
                    flex="2"
                    label={formatMessage(messages.gender)}
                    value={genders}
                  />
                </Row>
                <Separator>
                  <FormattedMessage {...messages.productInformation} />
                </Separator>
                <Row>
                  <RowField
                    value={formatMessage(messages.productDescription)}
                  />
                  <RowField flex="2" label={description} />
                </Row>
                <Row>
                  <RowField value={formatMessage(messages.specDetails)} />
                  <RowField flex="2" label={details} />
                </Row>
                <Row>
                  <RowField value={formatMessage(messages.materialInfo)} />
                  <RowField flex="2" label={materials} />
                </Row>
                <Separator>
                  <FormattedMessage {...messages.fitSizing} />
                </Separator>
                <Row>
                  <RowField
                    label={formatMessage(messages.fitStyles)}
                    value={fitStyles}
                  />
                  <RowField
                    flex="2"
                    label={formatMessage(messages.productSizes)}
                    value={sizeRange}
                  />
                </Row>
                <Separator>
                  <FormattedMessage {...messages.prices} />
                </Separator>
                <Row
                  margin="0 20px"
                  borderBottom="1px solid gray"
                  paddingBottom="12px"
                >
                  <RowField
                    textAlign="center"
                    value={formatMessage(messages.currency)}
                  />
                  <RowField
                    textAlign="center"
                    value={formatMessage(messages.personal)}
                  />
                  <RowField
                    textAlign="center"
                    value={formatMessage(messages.firstAmount)}
                  />
                  <RowField
                    textAlign="center"
                    value={formatMessage(messages.secondAmount)}
                  />
                  <RowField
                    textAlign="center"
                    value={formatMessage(messages.thirdAmount)}
                  />
                  <RowField
                    textAlign="center"
                    value={formatMessage(messages.fourthAmount)}
                  />
                  <RowField
                    textAlign="center"
                    value={formatMessage(messages.fifthAmount)}
                  />
                </Row>
                {currencies.map((currencyItem, index) => (
                  <Row
                    key={index}
                    margin="16px 20px"
                    borderBottom="1px solid gainsboro"
                    paddingBottom="12px"
                  >
                    <RowField textAlign="center" label={currencyItem.label} />
                    {currencyItem.amounts.map((amount, i) => (
                      <RowField
                        key={i}
                        textAlign="center"
                        label={amount ? `$${amount.price}` : ''}
                      />
                    ))}
                  </Row>
                ))}
                <Separator>
                  <FormattedMessage {...messages.productImages} />
                </Separator>
                {productImages.map((gender: any, index: number) => (
                  <div key={index}>
                    {gender.genderBlockImages.map(
                      (imageBlock: any, blockIndex: number) => (
                        <Row key={blockIndex}>
                          {imageBlock.map((image: string, subindex: number) => (
                            <RowField
                              key={subindex}
                              paddingTop={
                                blockIndex === 0 && subindex > 0 ? '23px' : '0'
                              }
                              label={
                                blockIndex === 0 && subindex === 0
                                  ? gender.genderName
                                  : ''
                              }
                            >
                              <RowImage src={image} />
                            </RowField>
                          ))}
                        </Row>
                      )
                    )}
                  </div>
                ))}
                <Separator>
                  <FormattedMessage {...messages.threeDModel} />
                </Separator>
                {obj && mtl ? (
                  <RenderBackground {...{ openedModel }}>
                    {openedModel ? (
                      <Render3D
                        customProduct={false}
                        designId={0}
                        isProduct={true}
                        {...{ product }}
                      />
                    ) : (
                      <Button onClick={this.handleOpenModel} size="large">
                        <FormattedMessage {...messages.openModel} />
                      </Button>
                    )}
                  </RenderBackground>
                ) : (
                  <FormattedMessage {...messages.modelNotFound} />
                )}
              </FormBody>
            </DetailsContainer>
          )}
        </MainBody>
      </Container>
    )
  }
  handleOpenModel = () => {
    this.setState({ openedModel: true })
  }
  handleOnClickBack = () => {
    const { goBack } = this.props
    goBack(0)
  }
}

interface OwnProps {
  productId?: string
}

const mapStateToProps = (state: any) => state.get('productDetailAdmin').toJS()

const ProductDetailsAdminEnhance = compose(
  connect(
    mapStateToProps,
    { ...ProductDetailsAdminActions }
  ),
  graphql(getProductQuery, {
    options: ({ productId: id }: OwnProps) => ({
      variables: { id }
    })
  })
)(ProductDetailsAdmin)

export default ProductDetailsAdminEnhance
