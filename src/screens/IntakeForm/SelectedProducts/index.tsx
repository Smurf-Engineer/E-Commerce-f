import * as React from 'react'
import { Product } from '../../../types/common'
import get from 'lodash/get'
import upArrow from '../../../assets/uparrow.svg'
import downArrow from '../../../assets/downarrow.svg'
import TrashImg from '../../../assets/trash.svg'
import DuplicateImg from '../../../assets/duplicate.svg'
import {
  Container,
  Products,
  ProductThumbnail,
  Image,
  Bottom,
  Description,
  Trash,
  Title,
  Badge,
  Header,
  ActionsContainer,
  Arrow,
  HeaderMobile,
  DuplicateButton
} from './styledComponents'

interface Props {
  products: Product[]
  title: string
  fromIntakeForm: boolean
  changeQuantity: (key: number) => void
  handleDeleteProduct: (product: Product, checked: boolean, key?: number) => void
}

export class SelectedProducts extends React.Component<Props, {}> {  
  state = {
    open: false
  }
  toggleMenu = () => {
    this.setState({ open: !this.state.open })
  }
  render() {
    const {
      products = [], title, handleDeleteProduct, changeQuantity, fromIntakeForm
    } = this.props
    const { open } = this.state
    return (
      <Container total={products.length} {...{open}}>
        <Header>
          <Title>{title}</Title>
          <ActionsContainer>
            <Badge>{products.length}</Badge>
            <Arrow src={upArrow} onClick={this.toggleMenu} className={open ? 'open' : ''} />
          </ActionsContainer>
        </Header>
        <Products total={products.length} {...{open}}>
          {products.map((product: Product, key: number) => {
            const {
              images,
              name
            } = product
            const deleteProduct = () => handleDeleteProduct(product, false, key)
            const thumbnail = get(images[0], 'thumbnail')
            const imageSrc = thumbnail.length ? thumbnail : images[0].front
            const changeQuantityValue = () => changeQuantity(key)
            return (
              <ProductThumbnail {...{ key }}>
                <Image src={imageSrc} />
                <Bottom>
                  <Description>
                    {name}
                  </Description>
                  {fromIntakeForm && <DuplicateButton onClick={changeQuantityValue} src={DuplicateImg} />}
                  <Trash src={TrashImg} onClick={deleteProduct} />
                </Bottom>
              </ProductThumbnail>
            )}
          )}
        </Products>
        <HeaderMobile>
          <Title>{title}</Title>
          <ActionsContainer>
            <Badge>{products.length}</Badge>
            <Arrow src={downArrow} onClick={this.toggleMenu} className={open ? 'open' : ''} />
          </ActionsContainer>
        </HeaderMobile>
      </Container>
    )
  }
}

export default SelectedProducts
