/**
 * ProductInfo Component - Created by cazarez on 13/03/18.
 */
import * as React from 'react'
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
  titleWidth?: string
  titleColor?: string
  showContent: boolean
  richText?: boolean
  toggleView: (id: string) => void
  children?: React.ReactNode
}

const ProductInfo = ({
  id,
  title,
  titleWidth,
  titleColor,
  showContent,
  richText,
  toggleView,
  children
}: Props) => {
  const onToggleView = (evt: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { id: targetId }
    } = evt
    return toggleView(targetId)
  }
  return (
    <Container>
      <ProductInfoTitle {...{ id }} onClick={onToggleView}>
        {richText ? <Title {...{ titleWidth, titleColor }} dangerouslySetInnerHTML={{ __html: title }}/> :
          <Title {...{ titleWidth, titleColor }}>{title}</Title>
        }
        <UpDownArrow src={showContent ? upArrowIcon : downArrowIcon} />
      </ProductInfoTitle>
      <StyledDivider />
      <AnimateHeight duration={500} height={showContent ? 'auto' : 0}>
        <DescriptionContent>{children}</DescriptionContent>
      </AnimateHeight>
    </Container>
  )
}

export default ProductInfo
