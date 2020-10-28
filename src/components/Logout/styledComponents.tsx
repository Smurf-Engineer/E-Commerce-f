/**
 * Styled Components - Created by cazarez on 27/02/18.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'
import MenuAntd from 'antd/lib/menu'
import Popover from 'antd/lib/popover'
import { RED, GRAY_DARK, GRAY_LIGHT, GRAY_LIGHTEST } from '../../theme/colors'

const { SubMenu } = MenuAntd

interface DivProps {
  withBorder?: boolean
  bold?: boolean
}

export const Container = styled.div`
  align-items: center;
  display: flex;
  border-bottom: 1px solid ${GRAY_LIGHT};
`

export const Text = styled.div`
  color: ${GRAY_DARK};
  cursor: pointer;
  font-size: 14px;
  @media (max-width: 991px) {
    align-items: center;
    color: ${GRAY_DARK};
    display: flex;
    font-weight: 600;
    height: 40px;
    margin: 2px 0;
  }
`

export const Icon = styled(icon)`
  color: ${RED};
  margin-right: 4px;
  font-size: 15px;
  font-weight: 600;
`

export const PopoverStyled = styled(Popover)``

export const Item = styled(MenuAntd.Item)`
  width: 100%;
  padding: ${({ withBorder }: DivProps) => withBorder ? `0 6px !important` : '0 18px !important'};
  font-weight: ${({ bold }: DivProps) => bold ? `bold` : 'normal'};
  text-transform: ${({ withBorder, bold }: DivProps) => withBorder || bold ? `uppercase` : 'capitalize'};
  border-bottom: ${({ withBorder }: DivProps) => withBorder ? `1px solid ${GRAY_LIGHTEST}` : 'none'};
`

export const TitleItem = styled(MenuAntd.Item)`
  width: 100%;
  padding: 0 6px !important;
  text-align: center;
  font-weight: bold;
  font-size: 14px !important;
  text-transform: uppercase;
  border-bottom: 1px solid ${GRAY_LIGHTEST};
`

export const UserIcon = styled(Icon)``

export const StyledSubMenu = styled(SubMenu)`
  border-bottom: 1px solid ${GRAY_LIGHTEST};
  .ant-menu-submenu-title {
    padding: 0 2px 0 6px !important;
    width: 100%;
  }
  .ant-menu-submenu-arrow {
    right: 12px;
  }
`

export const RightIcon = styled(icon)`
  flex: 1;
  text-align: right;
  padding-right: 16px;
  font-size: 12px;
  color: ${RED};
`

export const LeftIcon = styled(icon)`
  padding: 0 28px 0 8px;
  font-size: 12px;
  color: ${RED};
`

export const menuStyle = { width: '100%' }

export const overStyle = {
  maxWidth: '292px',
  width: '100%'
}

export const OverviewStyle = { border: 'none' }

export const titleStyle = {
  marginBottom: 0
}