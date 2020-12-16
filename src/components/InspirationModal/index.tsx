import * as React from 'react'
import { ModalContainer, Image, Footer, EditButton, BodyContent, Name } from './styledComponents'
import Modal from 'antd/lib/modal'
import messages from './messages'
import { InspirationType, Message } from '../../types/common'

const INSPIRATION_SELECTEED_ITEMS = 'inspirationSelectedItems'

interface Props {
  expandedInspiration: InspirationType
  expandedInspirationOpen: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  onCloseInspiration: () => void
  onSelect: (inspirationId: number, listName: string) => void
}

const SuccessModal = ({
  expandedInspiration,
  expandedInspirationOpen,
  formatMessage,
  onCloseInspiration,
  onSelect
}: Props) => {
  const { image, name, id, selected } = expandedInspiration
  console.log('ID ', id)
  const onSelectItem = () => onSelect(id, INSPIRATION_SELECTEED_ITEMS)
  return <Modal
  visible={expandedInspirationOpen}
  footer={null}
  maskClosable={true}
  closable={false}
  width={'600px'}
  bodyStyle={{padding: 0}}
  onCancel={onCloseInspiration}
>
  <ModalContainer>
    <BodyContent>
      <Image src={image} />
      <Footer>
        <Name>
          {name}
        </Name>
        <EditButton onClick={!selected ? onSelectItem : null} disabled={selected}>
          {formatMessage(messages.select)}
        </EditButton>
      </Footer>
    </BodyContent>
  </ModalContainer>
</Modal>
}

export default SuccessModal
