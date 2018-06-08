/**
 * Styled Components - Created by cazarez on 13/03/18.
 */
interface TitleProps {
  titleWidth?: string
  titleColor?: string
}

import styled from 'styled-components'
import Divider from 'antd/lib/divider'

export const Container = styled.div`
  margin-bottom: 10px;
`

export const Title = styled.div`
  width: ${({ titleWidth }: TitleProps) =>
    titleWidth ? titleWidth : '411.45px'};
  color: ${({ titleColor }: TitleProps) =>
    titleColor ? titleColor : '#5f6062'};
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const ProductInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;

  width: auto;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const UpDownArrow = styled.img`
  &:hover {
    cursor: pointer;
  }
`

export const StyledDivider = styled(Divider)`
  margin: 10px 0;
  border-bottom: 1px solid #bebebe;
`
export const DescriptionContent = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 0px;
  transition: visibility 0s, opacity 0.5s linear;
`
