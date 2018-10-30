/**
 * ProductCatalogFilterComponent Component - Created by cazarez on 28/02/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import AnimateHeight from 'react-animate-height'
import Checkbox from 'antd/lib/checkbox'
import {
  Container,
  Content,
  TitleContainer,
  Title,
  StyledImg,
  StyledDivider,
  ItemRow,
  AnimateHeightStyled
} from './styledComponents'
import uparrowIcon from '../../assets/uparrow.svg'
import downarrowIcon from '../../assets/downarrow.svg'

type Options = {
  name: string
  selected: boolean
}
interface Props {
  id?: string
  title: string
  options: Options[]
  showOptions: boolean
  activeFilters: {}
  toggleOptions: (evt: React.MouseEvent<HTMLImageElement>) => void
  selectOption: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

const ProductCatalogFilterComponent = ({
  id,
  title,
  options,
  showOptions,
  toggleOptions,
  selectOption,
  activeFilters
}: Props) => {
  const renderOptions = options.map((option, index) => (
    <ItemRow key={index}>
      <Checkbox
        checked={activeFilters[option.name]}
        onChange={selectOption}
        name={get(option, 'name')}
        value={id}
      >
        {get(option, 'name')}
      </Checkbox>
    </ItemRow>
  ))

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <StyledImg
          id={id || ''}
          src={showOptions ? uparrowIcon : downarrowIcon}
          onClick={toggleOptions}
        />
      </TitleContainer>
      <StyledDivider />
      <AnimateHeight
        duration={500}
        height={showOptions ? 'auto' : 0}
        style={AnimateHeightStyled}
      >
        <Content>{renderOptions}</Content>
      </AnimateHeight>
    </Container>
  )
}

export default ProductCatalogFilterComponent
