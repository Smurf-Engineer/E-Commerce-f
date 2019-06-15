/**
 * FeaturedCategory Component - Created by cazarez on 25/05/18.
 */
import * as React from 'react'

import { Container, Text, StyledImg, Category } from './styledComponents'

interface Props {
  history: any
  browserName?: string
  productTiles: any
}

// TODO: EVERYTHING HARDCODED FOR THE MOMENT CHANGE  LATER
class FeaturedCategory extends React.PureComponent<Props, {}> {
  render() {
    const { browserName, productTiles } = this.props
    const tiles = productTiles.map(({ id, image, title, contentTile }: any) => {
      return (
        <Category key={id}>
          <StyledImg id={contentTile} src={image} onClick={this.handleClick} />
          <Text>{title}</Text>
        </Category>
      )
    })
    return <Container {...{ browserName }}>{tiles}</Container>
  }

  handleClick = (evt: any) => {
    const { history } = this.props
    history.push(`/product-catalogue?contentTile=${evt.target.id}`)
  }
}

export default FeaturedCategory
