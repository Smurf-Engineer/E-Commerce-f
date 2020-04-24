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
  TitleName,
  StoreType
} from './styledComponents'

interface Props {
  image: string
  idStore?: string
  name?: string
  showNameStore?: boolean
  fixedDate?: boolean
  closed?: boolean
  cutOffDate?: string
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
  onDeleteClick,
  closed = false,
  fixedDate = false
}: Props) => {
  const closedMessage =
    fixedDate && closed ? formatMessage(messages.closedForOrder) : ''

  console.log('Fixed date ', fixedDate)
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
      {withEditButton && !closed && (
        <EditButton onClick={handleClickEdit}>
          {formatMessage(messages.editButtonLabel)}
        </EditButton>
      )}
      {withShareButton && !closed && (
        <ShareButton onClick={handleClickShare}>
          {formatMessage(messages.shareButtonLabel)}
        </ShareButton>
      )}
      {withDeleteButton && !closed && (
        <DeleteLabel onClick={handleClickDelete}>
          {formatMessage(messages.deleteButtonLabel)}
        </DeleteLabel>
      )}
    </ButtonsContainer>
  )

  return (
    <Container>
      <TeamStoreCard>
        <CardContent {...{ closedMessage }}>
          {image ? (
            <StyledImg src={image} onClick={onItemClick} />
          ) : (
            <TitleName onClick={onItemClick}>{name}</TitleName>
          )}
          {showNameStore && (
            <BottomContainer>
              <CardTitle>{name}</CardTitle>
              <StoreType>
                {formatMessage(messages[fixedDate ? 'batchOrder' : 'onDemand'])}
              </StoreType>
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
