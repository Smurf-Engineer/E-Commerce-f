/**
 * HeaderOrdersTable Component - Created by miguelcanobbio on 16/07/18.
 */
import * as React from 'react'
import { Container, Icon, IconsContainer, Header } from './styledComponents'
import { sorts } from '../../../types/common'

interface Props {
  label: string
  sort: sorts
  id: string
  justifyContent?: string
  interactiveHeaders: boolean
  onSortClick: (id: string, sort: sorts) => void
}

const HeaderOrdersTable = ({
  id,
  label,
  sort,
  onSortClick,
  justifyContent,
  interactiveHeaders
}: Props) => {
  if (!interactiveHeaders) {
    const textAlign = justifyContent === 'flex-end' ? 'right' : 'left'
    return <Header {...{ textAlign }}>{label}</Header>
  }

  const handleOnClick = () => {
    const sortToApply = sort === 'asc' ? 'desc' : 'asc'
    onSortClick(id, sortToApply)
  }
  const colors = {
    asc: { upColor: '#5F6062', downColor: '#fff' },
    desc: { upColor: '#fff', downColor: '#5F6062' },
    none: { upColor: '#bebebe', downColor: '#bebebe' }
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
