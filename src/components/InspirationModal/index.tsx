import * as React from 'react'
import { ModalContainer, Image, Footer, EditButton, BodyContent, TagsContainer, Tag } from './styledComponents'
import Modal from 'antd/lib/modal'
import includes from 'lodash/includes'
import messages from './messages'
import { InspirationType, Message } from '../../types/common'

const INSPIRATION_SELECTEED_ITEMS = 'inspirationSelectedItems'

interface Props {
  expandedInspiration: InspirationType
  expandedInspirationOpen: boolean
  selectedTags: string[]
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  onCloseInspiration: () => void
  onSelect: (inspirationId: number, listName: string) => void
  addTag: (value: string) => void
  removeTag: (value: string) => void
}

const SuccessModal = ({
  expandedInspiration,
  expandedInspirationOpen,
  selectedTags,
  formatMessage,
  onCloseInspiration,
  onSelect,
  addTag,
  removeTag
}: Props) => {
  const { image, id, selected, tags = [] } = expandedInspiration
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
        <TagsContainer>
          {tags.map((tag) => {
            const isSelected = includes(selectedTags, tag)
            const selectTag = () => isSelected ? removeTag(tag) : addTag(tag)
            return (
              <Tag key={tag} onClick={selectTag} className={isSelected ? 'selected' : ''}>
                {tag}
              </Tag>)
          })
        }
        </TagsContainer>
        <EditButton onClick={!selected ? onSelectItem : null} disabled={selected}>
          {formatMessage(messages.select)}
        </EditButton>
      </Footer>
    </BodyContent>
  </ModalContainer>
</Modal>
}

export default SuccessModal
