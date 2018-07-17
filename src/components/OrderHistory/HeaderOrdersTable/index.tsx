/**
 * HeaderOrdersTable Component - Created by miguelcanobbio on 16/07/18.
 */
import * as React from 'react'
import { Container, Icon, IconsContainer } from './styledComponents'
import { sorts } from '../../../types/common'

interface Props {
  label: string
  sort: sorts
  id: string
  justifyContent?: string
  onSortClick: (id: string, sort: sorts) => void
}

const HeaderOrdersTable = ({
  id,
  label,
  sort,
  onSortClick,
  justifyContent
}: Props) => {
  console.log(sort)
  const handleOnClick = () => {
    const sortToApply = sort === 'asc' ? 'desc' : 'asc'
    onSortClick(id, sortToApply)
  }
  let upColor
  let downColor
  switch (sort) {
    case 'asc':
      upColor = '#5F6062'
      downColor = '#fff'
      break
    case 'desc':
      upColor = '#fff'
      downColor = '#5F6062'
      break
    default:
      upColor = '#bebebe'
      downColor = '#bebebe'
      break
  }
  return (
    <Container {...{ justifyContent }}>
      {label}
      {id ? (
        <IconsContainer onClick={handleOnClick}>
          <Icon type="up" style={{ color: upColor }} />
          <Icon type="down" style={{ color: downColor }} />
        </IconsContainer>
      ) : null}
    </Container>
  )
}

export default HeaderOrdersTable
