/**
 * Styled Components - Created by eduardoquintero on 23/11/20.
 */
import styled from 'styled-components'
import { WHITE, RED, TRANSPARENT } from '../../../theme/colors'
import InfiniteScroll from 'react-infinite-scroller'

interface StyleProps {
  isSelected?: boolean
  selectedIndex?: number
}

export const Container = styled.div`
  width: 100%;
  background-color: ${WHITE};
  display: flex;
  padding-right: 2px;
  overflow: hidden;
`

export const StyledInfiniteScroll = styled(InfiniteScroll)`
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
`
