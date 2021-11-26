/**
 * Styled Components - Created by david on 12/02/18.
 */
import styled from 'styled-components'
import { WHITE, AUBERGINE } from '../../theme/colors'

const HEADER_TOP_SIZE = 38
const HEADER_BOTTOM_SIZE = 72
const HEADER_MAX_SIZE = 110

export const Container = styled.div``

export const Text = styled.div`
  color: ${WHITE};
`

interface HeaderProps {
  hideTopHeader?: boolean
  hideBottomHeader?: boolean
}

const HEADER_HEIGHT = ({ hideTopHeader, hideBottomHeader }: HeaderProps) => {
  let height = HEADER_MAX_SIZE
  if (hideTopHeader) {
    height -= HEADER_TOP_SIZE
  }
  if (hideBottomHeader) {
    height -= HEADER_BOTTOM_SIZE
  }
  return height
}

export const Header = styled.div`
  background: ${WHITE};
  line-height: 0px;
  padding: 0px;
  z-index: 10;
  -webkit-transform: translate3d(0, 0, 0);
  @media (min-width: 992px) {
    height: ${HEADER_HEIGHT}px;
  }
  @media (max-width: 991px) {
    margin-bottom: ${({ hideTopHeader }: HeaderProps) =>
      hideTopHeader ? 0 : '70px'};
  }
`

export const Footer = styled.div`
  background: ${AUBERGINE};
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  padding: 24px 50px;

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 16px;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 24px;
  }
`

export const EditorWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ORANGE;

  .rdw-editor-wrapper {
    flex: 1;
  }
  .rdw-editor-main {
    display: flex;
    justify-content: center;
  }
`

export const EditorCloseButton = styled.span`
  cursor: pointer;
  font-size: 2rem;
  transform: rotate(45deg);
  padding-left: 1rem;
  padding-right: 1rem;
`
