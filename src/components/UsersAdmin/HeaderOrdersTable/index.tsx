/**
 * UsersAdmin Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import { Container, Icon, IconsContainer, Header } from './styledComponents'
import { sorts } from '../../../types/common'

interface Props {
  label: string
  sort: sorts
  id: string
  justifyContent?: string
  onSortClick: (id: string, sort: sorts) => void
}

const colors = {
  asc: { upColor: '#5F6062', downColor: '#fff' },
  desc: { upColor: '#fff', downColor: '#5F6062' },
  none: { upColor: '#bebebe', downColor: '#bebebe' }
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
