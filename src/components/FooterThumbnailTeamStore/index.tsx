/**
 * FooterThumbnailTeamStore Component - Created by gustavomedina on 12/04/18.
 */
import * as React from 'react'
// import { FormattedMessage } from 'react-intl'
import Checkbox from 'antd/lib/checkbox'
// import messages from './messages'
import {
  Footer,
  Type,
  Description,
  Bottom,
  Label,
  Delete,
  Private
} from './styledComponents'

interface Props {
  id: number
  name: string
  description: string
  date: string
  onPressPrivate: (id: number, isPrivate: boolean) => void
  onPressDelete: (id: number) => void
}

const FooterThumbnailLocker = ({
  id,
  name,
  description,
  date,
  onPressPrivate,
  onPressDelete
}: Props) => {
  const handleOnPressPrivate = (e: any) => {
    onPressPrivate(id, e.target.checked)
  }
  const handleOnPressDelete = () => onPressDelete(id)
  return (
    <Footer>
      <Type>{name}</Type>
      <Description>{description}</Description>
      <Label>{date}</Label>
      <Bottom>
        <Checkbox onChange={handleOnPressPrivate}>
          {/*TODO: Move to messages*/}
          <Private>Private</Private>
        </Checkbox>
        <Delete onClick={handleOnPressDelete} />
      </Bottom>
    </Footer>
  )
}

export default FooterThumbnailLocker
