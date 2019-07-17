/**
 * AdminTable Component - Created by eduardoquintero on 15/07/19.
 */
import * as React from 'react'
import { Container, Icon, IconsContainer, Header } from './styledComponents'
import { sorts } from '../types/common'

interface Props {
  label: string
  sort?: sorts
  id: string
  justifyContent?: string
  interactiveHeaders: boolean
  onSortClick: (id: string, sort: sorts) => void
}

const colors = {
  asc: { upColor: '#5F6062', downColor: '#fff' },
  desc: { upColor: '#fff', downColor: '#5F6062' },
  none: { upColor: '#bebebe', downColor: '#bebebe' }
}

const InternalsTable = ({
  id,
  label,
  sort = 'none',
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

export default InternalsTable
