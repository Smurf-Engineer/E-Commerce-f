import * as React from 'react'
import { Product } from '../../../types/common'
import get from 'lodash/get'
import upArrow from '../../../assets/uparrow.svg'
import TrashImg from '../../../assets/trash.svg'
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
  Arrow
} from './styledComponents'

interface Props {
  products: Product[]
  title: string
  handleDeleteProduct: (product: Product, checked: boolean) => void
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
      products = [], title, handleDeleteProduct
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
          {products.map((product: Product) => {
            const {
              images,
              name,
              id
            } = product
            const deleteProduct = () => handleDeleteProduct(product, false)
            const thumbnail = get(images[0], 'thumbnail')
            const imageSrc = thumbnail.length ? thumbnail : images[0].front
            return (<ProductThumbnail key={id}>
                  <Image src={imageSrc} />
                  <Bottom>
                    <Description>
                      {name}
                    </Description>
                    <Trash src={TrashImg} onClick={deleteProduct} />
                    </Bottom>
              </ProductThumbnail>)})}
        </Products>
      </Container>
    )
  }
}

export default SelectedProducts
