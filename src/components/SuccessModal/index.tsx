import * as React from 'react'
import { ModalContainer, Title, Description, Strong, EditButton, BodyContent } from './styledComponents'
import Modal from 'antd/lib/modal'

interface Props {
  title: string
  text: string
  center: string
  footer: string
  returnHomeText: string
  onReturnPage: () => void
}

const SuccessModal = ({ title, text, center, footer, returnHomeText, onReturnPage }: Props) => {
  return <Modal
  visible={true}
  footer={null}
  closable={false}
  width={'600px'}
  bodyStyle={{padding: 0}}
>
  <ModalContainer>
    <Title>
      {title}
    </Title>
    <BodyContent>
      <Description>
        {text}
      </Description>
      <Description>
        {center}
      </Description>
      <Description>
        <Strong>{footer}</Strong>
      </Description>
      <EditButton onClick={onReturnPage}>
        {returnHomeText}
      </EditButton>
    </BodyContent>
  </ModalContainer>
</Modal>
}

export default SuccessModal
