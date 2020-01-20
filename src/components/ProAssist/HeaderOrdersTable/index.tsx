/**
 * UsersAdmin Component - Created by eduardoquintero on 16/01/20.
 */
import * as React from 'react'
import { Container, Icon, IconsContainer, Header } from './styledComponents'
import { sorts } from '../../../types/common'
import { GRAY_DARK, WHITE, GRAY } from '../../../theme/colors'

interface Props {
  label: string
  sort: sorts
  id: string
  justifyContent?: string
  onSortClick: (id: string, sort: sorts) => void
}

const colors = {
  asc: { upColor: GRAY_DARK, downColor: WHITE },
  desc: { upColor: WHITE, downColor: GRAY_DARK },
  none: { upColor: GRAY, downColor: GRAY }
}

const HeaderOrdersTable = ({
  id,
  label,
  sort,
  onSortClick,
  justifyContent
}: Props) => {
  const handleOnClick = () => {
    const sortToApply = sort === 'asc' ? 'desc' : 'asc'
    onSortClick(id, sortToApply)
  }
  const { upColor, downColor } = colors[sort]
  return (
    <Header>
      <Container {...{ justifyContent }}>
        {label}
        {id ? (
          <IconsContainer onClick={handleOnClick}>
            <Icon type="up" color={upColor} />
            <Icon type="down" color={downColor} />
          </IconsContainer>
        ) : null}
      </Container>
    </Header>
  )
}

export default HeaderOrdersTable
