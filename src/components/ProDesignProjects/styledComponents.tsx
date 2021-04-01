/**
 * Styled Components - Created by eduardoquintero on 17/12/20.
 */
import styled from 'styled-components'
import Badge from 'antd/lib/badge'
import { GRAY_DARK, GRAY_LIGHT, RED, RED_TRANSPARENT, WHITE, WHITE_TRANSPARENT } from '../../theme/colors'
import Icon from 'antd/lib/icon'
import { AVENIR_NEXT } from '../../theme/fonts'

interface ContainerProps {
  withoutPadding?: boolean
}

interface HeaderProps {
  textAlign?: string
  width?: string
}

interface CellProps {
  bold?: boolean
  width?: string
}

export const Container = styled.div`
  padding-bottom: 36px;
  width: 100%;
  margin-top: -64px;
  position: relative;
  @media (max-width: 768px) {
    margin-top: -14px;
  }
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 12px 0 12px -38px;
`

export const StyledBadge = styled(Badge)``

export const Subtitle = styled.div`
  max-width: 866px;
  width: 100%;
  margin-right: 28px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 32px;
  align-items: center;
  @media (max-width: 768px) {
    padding-left: 32px;
  }
  @media (max-width: 425px) {
    flex-flow: column;
    text-align: center;
  }
`

export const AddButton = styled.div`
  width: 100%;
  padding: 10px 6px;
  max-width: 128px;
  border: 2px solid ${RED};
  color: ${RED};
  transition: all .25s;
  @media (max-width: 425px) {
    margin-top: 28px;
  }
  &:hover {
    cursor: pointer;
    background: ${RED};
    color: ${WHITE};
  }
`

export const BackContainer = styled.div`
  display: none;
  align-items: center;
  margin-bottom: 24px;
  position: absolute;
  left: 18px;
  top: -48px;
  width: 76px;
  font-size: 14px;
  color: ${RED};
  @media (max-width: 768px) {
    display: flex;
  }
  &:hover {
    cursor: pointer;
  }
`

export const ScreenTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 34px;
  align-items: flex-end;
  padding-right: ${({ withoutPadding }: ContainerProps) =>
    withoutPadding ? '0' : '32px'};
  @media (min-width: 320px) and (max-width: 768px) {
    padding-right: 0;
    align-items: center;
  }
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom 24px;
`

export const Row = styled.tr``

export const Header = styled.th`
  border-bottom: 1px solid #818181;
  text-align: left;
  padding: 8px 0;
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 23px;
  width: ${({ width }: HeaderProps) => width ? width : 'auto'};
  text-align: ${({ textAlign }: HeaderProps) =>
    textAlign ? textAlign : 'start'};

  @media (min-width: 320px) and (max-width: 768px) {
    letter-spacing: 0.09px;
    font-size: 11px;
    line-height: 15px;
  }
`

export const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #e6e6e5;
  }
`

export const Cell = styled.td`
  border-bottom: 1px solid ${GRAY_LIGHT};
  text-align: left;
  padding: 4px 0;
  width: ${({ width }: HeaderProps) => width ? width : 'auto'};
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.1px;
  text-transform: capitalize;
  line-height: 35px;
  text-align: ${({ textAlign }: HeaderProps) =>
    textAlign ? textAlign : 'start'};
  font-weight: ${({ bold }: CellProps) => bold ? 'bold' : 'normal'};
  &.error {
    color: ${RED};
  }
  @media (max-width: 768px) {
    font-size: 11px;
  }
`

export const DeleteButton = styled(Icon)`
  font-size: 14px;
  display: block;
  z-index: 9;
  margin-right: 8px;
  max-width: 30px;
  width: 100%;
  transition: all .25s;
  padding: 8px 0px;
  border-radius: 50%;
  &:hover {
    color: ${WHITE};
    background: ${RED};
  }
`

export const LoadingContainer = styled.div`
  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
`

export const InfoSection = styled.div`
  display: flex;
  flex-flow: column;
  margin: 54px 0;
  height: 64px;
  font-style: italic;
  justify-content: space-between;
`

export const buttonStyle = {
  background: RED_TRANSPARENT,
  color: WHITE,
  border: 'none',
  boxShadow: 'none'
}

export const cancelButtonStyle = {
  background: WHITE,
  color: GRAY_DARK,
  borderColor: GRAY_LIGHT,
  boxShadow: 'none'
}