import * as React from 'react'
import teamIconSelected from '../../assets/team_selected.svg'
import { ModalContainer, Title, Description, Strong, EditButton, BodyContent, PanelIcon } from './styledComponents'
import Modal from 'antd/lib/modal'

interface Props {
  title: string
  text: string
  center: string
  footer: string
  teamCollaboration: string
  returnHomeText: string
  onReturnPage: () => void
}

const SuccessModal = ({ title, text, center, footer, returnHomeText, onReturnPage, teamCollaboration }: Props) => {
  return <Modal
  visible={true}
  footer={null}
  closable={false}
  width={'600px'}
  wrapClassName="rounded-corner2"
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
        <Strong><PanelIcon src={teamIconSelected} />{teamCollaboration}</Strong>
      </Description>
      <Description>
        {footer}
      </Description>
      <EditButton onClick={onReturnPage}>
        {returnHomeText}
      </EditButton>
    </BodyContent>
  </ModalContainer>
</Modal>
}

export default SuccessModal
