/**
 * TeamStoreItem Component - Created by cazarez on 11/04/18.
 */
import * as React from 'react'
import messages from './messages'
import MediaQuery from 'react-responsive'
import {
  Container,
  TeamStoreCard,
  CardContent,
  StyledImg,
  CardTitle,
  ShareButton,
  EditButton,
  ButtonsContainer,
  DeleteLabel,
  BottomContainer,
  TitleName
} from './styledComponents'

interface Props {
  image: string
  idStore?: string
  name?: string
  showNameStore?: boolean
  withShareButton?: boolean
  withEditButton?: boolean
  withDeleteButton?: boolean
  formatMessage: (messageDescriptor: any) => string
  openShareModalAction?: (id?: string) => void
  onItemClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
}

const TeamStoreItem = ({
  idStore,
  image,
  name,
  formatMessage,
  openShareModalAction,
  showNameStore = false,
  withEditButton = false,
  withShareButton = false,
  withDeleteButton = false,
  onItemClick,
  onEditClick,
  onDeleteClick
}: Props) => {
  const handleClickShare = () => {
    if (openShareModalAction) {
      openShareModalAction(idStore)
    }
  }
  const handleClickEdit = () => {
    if (onEditClick) {
      onEditClick()
    }
  }
  const handleClickDelete = () => {
    if (onDeleteClick) {
      onDeleteClick()
    }
  }

  const buttons = (
    <ButtonsContainer>
      {withEditButton && (
        <EditButton onClick={handleClickEdit}>
          {formatMessage(messages.editButtonLabel)}
        </EditButton>
      )}
      {withShareButton && (
        <ShareButton onClick={handleClickShare}>
          {formatMessage(messages.shareButtonLabel)}
        </ShareButton>
      )}
      {withDeleteButton && (
        <DeleteLabel onClick={handleClickDelete}>
          {formatMessage(messages.deleteButtonLabel)}
        </DeleteLabel>
      )}
    </ButtonsContainer>
  )

  return (
    <Container>
      <TeamStoreCard>
        <CardContent>
          {image ? (
            <StyledImg src={image} onClick={onItemClick} />
          ) : (
            <TitleName>{name}</TitleName>
          )}
          {showNameStore && (
            <BottomContainer>
              <CardTitle onClick={!image ? onItemClick : () => {}}>
                {name}
              </CardTitle>
              <MediaQuery minWidth={480}>{buttons}</MediaQuery>
            </BottomContainer>
          )}
        </CardContent>
      </TeamStoreCard>
      <MediaQuery maxWidth={480}>{buttons}</MediaQuery>
    </Container>
  )
}

export default TeamStoreItem
