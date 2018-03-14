/**
 * ProductInfo Component - Created by cazarez on 13/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import AnimateHeight from 'react-animate-height'
import {
  Container,
  Title,
  ProductInfoTitle,
  UpDownArrow,
  StyledDivider,
  DescriptionContent
} from './styledComponents'
import downArrowIcon from '../../assets/downarrow.svg'
import upArrowIcon from '../../assets/uparrow.svg'

interface Props {
  id?: string | undefined
  title: string
  showContent: boolean
  toggleView: (id: string) => void
  children?: React.ReactNode
}

const ProductInfo = ({
  id,
  title,
  showContent,
  toggleView,
  children
}: Props) => {
  const onToggleView = (evt: React.MouseEvent<HTMLImageElement>) => {
    const { currentTarget: { id: targetId } } = evt
    return toggleView(targetId)
  }
  return (
    <Container>
      <ProductInfoTitle>
        <Title>{title}</Title>
        <UpDownArrow
          src={showContent ? upArrowIcon : downArrowIcon}
          onClick={onToggleView}
          id={id}
        />
      </ProductInfoTitle>
      <StyledDivider />
      <AnimateHeight duration={500} height={showContent ? 'auto' : 0}>
        <DescriptionContent>{children}</DescriptionContent>
      </AnimateHeight>
    </Container>
  )
}

export default ProductInfo
