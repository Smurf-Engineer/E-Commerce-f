/**
 * OrderDetailsAdmin Component - Created by eduardoquintero on 07/05/19.
 */
import * as React from 'react'
import { Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'
import Spin from 'antd/lib/spin'
import get from 'lodash/get'
import find from 'lodash/find'
import queryString from 'query-string'
import { graphql, compose } from 'react-apollo'
import messages from './messages'
import RowField from './RowField'
import ProductImageBox from './ProductImage'
import { quantities, currenciesLabel } from './constants'
import Render3D from '../../components/Render3D'
import * as ProductDetailsAdminActions from './actions'
import {
  QueryProps,
  Product,
  GenderType,
  ProductPicture,
  BlockProduct,
  ProductImage,
  ProductColors
} from '../../types/common'
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
  RenderBackground,
  Separator,
  ScreenSubTitle,
  Row,
  DetailsContainer,
  MainBody,
  EditModel,
  Buttons,
  ModelSection
} from './styledComponents'
interface Data extends QueryProps {
  product: Product
}

interface Props {
  data: Data
  history: any
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
    const {
      name,
      mpn,
      obj,
      mtl,
      code,
      shortDescription,
      description,
      yotpoId,
      colors,
      pictures,
      sports,
      genders: gendersProduct,
      sizeRange: sizeRangeProduct,
      fitStyles: fitStylesProduct,
      relatedProducts: relatedTagsProduct,
      categoryName,
      tags,
      active,
      designCenter,
      season,
      materials,
      details,
      priceRange
    }: Product = product || {}
    let categories = sports
    if (categories) {
      categories = categories.map((item: any) => item.name).join(', ')
    }
    let genders = gendersProduct
    if (genders) {
      genders = genders.map((item: any) => item.name).join(', ')
    }
    let sizeRange = sizeRangeProduct
    if (sizeRange) {
      sizeRange = sizeRange.map((item: any) => item.name).join(', ')
    }
    let fitStyles = fitStylesProduct
    if (fitStyles) {
      fitStyles = fitStyles.map((item: any) => item.name).join(', ')
    }
    let relatedTags = relatedTagsProduct
    if (relatedTags) {
      relatedTags = relatedTags.map((item: any) => item.yotpoId).join(', ')
    }
    let USD = priceRange
    if (USD) {
      USD = USD.filter(item => item.shortName === currenciesLabel.USD)
    }
    let GBP = priceRange
    if (GBP) {
      GBP = GBP.filter(item => item.shortName === currenciesLabel.GBP)
    }
    let EUR = priceRange
    if (EUR) {
      EUR = EUR.filter(item => item.shortName === currenciesLabel.EUR)
    }
    let CAD = priceRange
    if (CAD) {
      CAD = CAD.filter(item => item.shortName === currenciesLabel.CAD)
    }
    let AUD = priceRange
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
    const arrayType = designCenter ? gendersProduct : colors
    let productImages
    if (pictures && arrayType) {
      productImages = arrayType.map((item: GenderType | ProductColors) => ({
        genderName: item.name,
        genderBlockImages: pictures.reduce(
          (arr: BlockProduct[], block: ProductPicture) => {
            if ((designCenter ? block.gender_id : block.color_id) === item.id) {
              arr.push([
                block.back_image,
                block.front_image,
                block.left_image,
                block.right_image
              ])
            }
            return arr
            // tslint:disable-next-line: align
          },
          []
        )
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
                  <BlueButton onClick={this.handleOnClickEdit} size="large">
                    <FormattedMessage {...messages.editProduct} />
                  </BlueButton>
                  {designCenter && (
                    <Button onClick={this.handlePublishing} size="large">
                      <FormattedMessage {...messages.openPublishingTool} />
                    </Button>
                  )}
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
                    value={formatMessage(active ? messages.yes : messages.no)}
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
                    marginRight="8px"
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
                    marginRight="8px"
                    value={formatMessage(messages.productDescription)}
                  />
                  <RowField flex="2" label={description} />
                </Row>
                <Row>
                  <RowField
                    marginRight="8px"
                    value={formatMessage(messages.specDetails)}
                  />
                  <RowField flex="2" label={details} />
                </Row>
                <Row>
                  <RowField
                    marginRight="8px"
                    value={formatMessage(messages.materialInfo)}
                  />
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
                    {currencyItem.amounts.map((amount, subindex) => (
                      <RowField
                        key={subindex}
                        textAlign="center"
                        label={amount ? `$${amount.price}` : ''}
                      />
                    ))}
                  </Row>
                ))}
                <Separator>
                  <FormattedMessage {...messages.productImages} />
                </Separator>
                {productImages &&
                  productImages.map((picture: ProductImage, index: number) => (
                    <ProductImageBox key={index} {...{ picture }} />
                  ))}
                {designCenter && (
                  <ModelSection>
                    <Separator>
                      <FormattedMessage {...messages.threeDModel} />
                    </Separator>
                    <Buttons>
                      {!openedModel && obj && mtl && (
                        <Button onClick={this.handleOpenModel} size="large">
                          <FormattedMessage {...messages.openModel} />
                        </Button>
                      )}
                      <EditModel type="ghost" onClick={this.editModels}>
                        <FormattedMessage {...messages.editModel} />
                      </EditModel>
                    </Buttons>
                    {obj && mtl ? (
                      <RenderBackground {...{ openedModel }}>
                        {openedModel && (
                          <Render3D
                            customProduct={false}
                            designId={0}
                            isProduct={true}
                            {...{ product }}
                          />
                        )}
                      </RenderBackground>
                    ) : (
                      <FormattedMessage {...messages.modelNotFound} />
                    )}
                  </ModelSection>
                )}
              </FormBody>
            </DetailsContainer>
          )}
        </MainBody>
      </Container>
    )
  }
  handlePublishing = () => {
    const { data, history } = this.props
    const code = get(data, 'product.code', '')
    if (code) {
      history.push(`/admin/publishing-tool?code=${code}`)
    }
  }
  editModels = () => {
    const {
      history,
      location: { search }
    } = this.props
    const { id } = queryString.parse(search)
    history.push(`/admin/add-models?id=${id}`)
  }
  handleOpenModel = () => {
    this.setState({ openedModel: true })
  }
  handleOnClickBack = () => {
    const { history } = this.props
    history.push('/admin/products')
  }
  handleOnClickEdit = () => {
    const {
      history,
      location: { search }
    } = this.props
    const { id } = queryString.parse(search)
    history.push(`/admin/products/form/${id}`)
  }
}

interface OwnProps {
  location?: any
}

const mapStateToProps = (state: any) => state.get('productDetailAdmin').toJS()

const ProductDetailsAdminEnhance = compose(
  withRouter,
  connect(mapStateToProps, { ...ProductDetailsAdminActions }),
  graphql(getProductQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      return {
        variables: { id: queryParams.id }
      }
    }
  })
)(ProductDetailsAdmin)

export default ProductDetailsAdminEnhance
