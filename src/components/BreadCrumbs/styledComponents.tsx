/**
 * Styled Components - Created by Jesús Apodaca on 31/10/19.
 */
import styled from 'styled-components'
import Breadcrumb from 'antd/lib/breadcrumb'
import Icon from 'antd/lib/icon'
import { RED } from '../../theme/colors'

interface ItemProps {
  selected?: boolean
}

export const Container = styled(Breadcrumb)`
  padding: 16px 16px 12px 34px;
  @media (max-width: 780px) {
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 0;
    margin: 12px 8px;
  }
`

export const BreadItem = styled(Breadcrumb.Item)``

export const BreadIcon = styled(Icon)`
  margin-right: 8px;
`

export const BreadLabel = styled.span`
  color: ${({ selected }: ItemProps) => (selected ? RED : 'auto')};
`
