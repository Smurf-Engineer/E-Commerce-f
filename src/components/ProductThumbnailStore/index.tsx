/**
 * ProductThumbnail Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { withRouter } from 'react-router'
import { compose } from 'react-apollo'
import {
  Container,
  Footer,
  Type,
  Description,
  InfoContainer,
  Date
} from './styledComponents'
import Image from './ProductImage'

interface Props {
  id: number
  name: string
  date: string
  type?: string
  image?: string
  wide?: boolean
  description?: string
  checked: boolean
  disabled: boolean
  withCheckbox: boolean
  onSelectItem?: (id: number, checked: boolean) => void
}

class ProductThumbnail extends React.Component<Props, {}> {
  handleOnPressSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    const { id, onSelectItem } = this.props
    if (onSelectItem) {
      onSelectItem(id, checked)
    }
  }

  render() {
    const {
      name,
      type,
      description,
      image,
      date,
      withCheckbox = true,
      wide,
      checked,
      disabled
    } = this.props

    return (
      <Container {...{ wide, withCheckbox }}>
        <Image
          {...{ image, checked, disabled, withCheckbox }}
          onChange={this.handleOnPressSelect}
        />
        <Footer>
          <Type>{name}</Type>
          <Description>{`${type} ${description}`}</Description>
          <InfoContainer>
            <Date>{date}</Date>
          </InfoContainer>
        </Footer>
      </Container>
    )
  }
}

export default compose(withRouter)(ProductThumbnail)
