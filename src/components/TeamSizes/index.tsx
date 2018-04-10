/**
 * TeamSizes Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import Button from '../ButtonShadow'
import { Size } from '../../types/common'
import { Container } from './styledComponents'

const sizes: Size[] = [
  {
    id: 1,
    range: '2-5'
  },
  {
    id: 2,
    range: '6-24'
  },
  {
    id: 3,
    range: '25-49'
  },
  {
    id: 4,
    range: '50-99'
  },
  {
    id: 5,
    range: '100+'
  }
]

interface Props {
  currentSelected: number
  onSelectRange: (id: number, range: string) => void
}

const TeamSizes = ({ currentSelected, onSelectRange }: Props) => {
  const ranges = sizes.map(({ id, range }) => (
    <Button
      key={id}
      label={range}
      selected={id === currentSelected}
      onClick={() => onSelectRange(id, range)}
    />
  ))
  return <Container>{ranges}</Container>
}

export default TeamSizes
