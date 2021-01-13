/**
 * Styled Components - Created by eduardoquintero on 23/11/20.
 */
import styled from 'styled-components'
import { WHITE, RED, TRANSPARENT, GRAY_LIGHTEST, GRAY, GRAY_LIGHT } from '../../../theme/colors'
import Checkbox from 'antd/lib/checkbox'
import InfiniteScroll from 'react-infinite-scroller'

interface StyleProps {
  isSelected?: boolean
  selectedIndex?: number
}

export const Container = styled.div`
  width: 100%;
  background-color: ${WHITE};
  display: flex;
  flex-direction: column;
  padding-right: 2px;
  overflow: hidden;
`

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 70%;
  align-self: center;
  @media (max-width: 768px) {
    width: 97%;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  height: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`

export const ImageContainer = styled.div`
  position: relative;
  border: 3px solid;
  border-color: ${({ isSelected }: StyleProps) => (isSelected ? RED : TRANSPARENT)};
  &::after {
    content: "${({ selectedIndex }: StyleProps) => selectedIndex}";
    color: ${WHITE};
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background: ${RED};
    right: 5px;
    top: 5px;
    display: ${({ selectedIndex }: StyleProps) => selectedIndex ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
  }
`

export const Expand = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  &:hover {
    cursor: pointer;
  }
`

export const TagsContainer = styled.div`
  width: 60%;
  justify-self: center;
  display: inline-flex;
  align-self: center;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const SearchTagStyle = {
  width: '70%',
  borderRadius: '0'
}

export const TagPicker = styled.div`
  background: ${GRAY_LIGHTEST};
  padding: 10px;
  border-radius: 20px;
  min-width: 110px;
  text-align: center;
  transition: background-color 0.3s ease;
  margin: 10px 10px 0 0;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
    background: ${GRAY_LIGHT};
  }
  &.selected {
    background: ${GRAY};
  }
`

export const TagPickers = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`

export const Filters = styled.div`
  align-self: center;
  display: flex;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    display: block;
  }
`

export const Label = styled.div`
  margin-right: 10px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`

export const Checkboxes = styled.div`
  @media (max-width: 768px) {
    display: flex;
  }
`

export const CheckboxLabel = styled.div`
  display: inline-block;
`

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin-top: 35px;
`

export const StyledCheckbox = styled(Checkbox)`
@media (max-width: 768px) {
  display: flex;
  font-size: 13px;
}
`