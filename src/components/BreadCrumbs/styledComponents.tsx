/**
 * Styled Components - Created by Jesús Apodaca on 31/10/19.
 */
import styled from 'styled-components'
import Breadcrumb from 'antd/lib/breadcrumb'
import Icon from 'antd/lib/icon'
import { BLACK, BLUE } from '../../theme/colors'

interface ItemProps {
  selected?: boolean
}

export const Container = styled(Breadcrumb)`
  padding: 16px 16px 12px 34px;
  @media (max-width: 780px) {
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 12px 8px;
  }
  & > span:nth-last-child(2) > a {
    color: ${BLUE} !important;
  }
`

export const BreadItem = styled(Breadcrumb.Item)``

export const BreadIcon = styled(Icon)`
  margin-right: 8px;
`

export const BreadLabel = styled.span`
  color: ${({ selected }: ItemProps) => (selected ? BLACK : 'auto')};
  font-weight: ${({ selected }: ItemProps) => (selected ? 'bold' : 'normal')};
`
