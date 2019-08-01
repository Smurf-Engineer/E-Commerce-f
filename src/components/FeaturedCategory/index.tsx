/**
 * FeaturedCategory Component - Created by cazarez on 25/05/18.
 */
import * as React from 'react'

import { Container, Text, StyledImg, Category } from './styledComponents'
import { ProductTiles } from '../../types/common'

interface Props {
  history: any
  browserName?: string
  productTiles: ProductTiles[]
}

// TODO: EVERYTHING HARDCODED FOR THE MOMENT CHANGE  LATER
class FeaturedCategory extends React.PureComponent<Props, {}> {
  render() {
    const { browserName, productTiles = [] } = this.props
    const tiles = productTiles.map(
      ({ id, image, title, contentTile }: ProductTiles) => {
        if (image) {
          return (
            <Category key={id}>
              <StyledImg
                id={contentTile}
                src={image}
                onClick={this.handleClick}
              />
              <Text>{title}</Text>
            </Category>
          )
        }
        return
      }
    )
    return <Container {...{ browserName }}>{tiles}</Container>
  }

  handleClick = (evt: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const { history } = this.props
    history.push(`/product-catalogue?contentTile=${evt.currentTarget.id}`)
  }
}

export default FeaturedCategory
