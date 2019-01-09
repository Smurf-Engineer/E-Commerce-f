/**
 * FooterThumbnailLocker Component - Created by david on 06/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Checkbox from 'antd/lib/checkbox'
import messages from './messages'
import {
  Footer,
  Type,
  Description,
  Bottom,
  Label,
  Delete,
  Private,
  Rename
} from './styledComponents'

interface Props {
  id: string
  name: string
  description: string
  date: string
  isPrivate: boolean
  addToCartButton: React.ReactNode
  onPressPrivate: (id: string, isPrivate: boolean) => void
  onPressDelete: (id: string, name: string) => void
  formatMessage: (messageDescriptor: any) => string
  onPressRename: (id: string, name: string) => void
}

let showCartButton = false
if (typeof window !== 'undefined') {
  showCartButton = window.matchMedia('(max-width: 768px)').matches
}

const FooterThumbnailLocker = ({
  id,
  name,
  description,
  date,
  onPressPrivate,
  onPressDelete,
  formatMessage,
  isPrivate,
  addToCartButton,
  onPressRename
}: Props) => {
  const handleOnPressPrivate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked }
    } = event
    onPressPrivate(id, checked)
  }
  const handleOnPressDelete = () => onPressDelete(id, name)
  const handleOnPressRename = () => onPressRename(id, name)
  return (
    <Footer>
      <Type>
        {name}
      </Type>
      <Description>{description}</Description>
      <Label>{date}</Label>
      <Bottom>
        <Checkbox checked={isPrivate} onChange={handleOnPressPrivate}>
          <Private>{formatMessage(messages.private)}</Private>
        </Checkbox>
        <Rename onClick={handleOnPressRename}>
          <FormattedMessage {...messages.rename} />
        </Rename>
        <Delete onClick={handleOnPressDelete}>
          <FormattedMessage {...messages.delete} />
        </Delete>
      </Bottom>
      {showCartButton && addToCartButton}
    </Footer>
  )
}

export default FooterThumbnailLocker
