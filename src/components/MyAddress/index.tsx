/**
 * MyAddress Component - Created by cazarez on 10/05/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Text,
  ItalicText,
  StyledCheckbox,
  StyledButton,
  EditButton,
  SecondaryButtons,
  CardContainer,
  CardText,
  MapsDiv,
  DataDiv,
  CircleIcon,
  TitleDiv,
  ValueDiv,
  PinIcon,
  ButtonIcon,
  StyledCheckboxMulti,
  MultiButtonsDiv,
  SecondaryButtonsMulti,
  StyledButtonMulti,
  EditButtonMulti,
  EditButtonWrapper
} from './styledComponents'

interface Props {
  name: string
  street: string
  apartment?: string
  city: string
  zipCode: string
  country: string
  phone?: string
  shipping?: boolean
  simple?: boolean
  defaultBilling?: boolean
  defaultShipping?: boolean
  addressIndex?: number
  isSelected?: boolean
  showSecondaryButtons?: boolean
  hideBottomButtons?: boolean
  multiButtons?: boolean
  small?: boolean
  formatMessage: (messageDescriptor: any) => string
  selectAddressAction?: (index: number) => void
  showAddressFormAction?: (show: boolean) => void
  showConfirmDeleteAction?: (index: number) => void
}

const MyAddress = ({
  name,
  street,
  apartment,
  city,
  zipCode,
  country,
  defaultBilling,
  defaultShipping,
  shipping,
  simple,
  addressIndex,
  phone,
  multiButtons,
  formatMessage,
  showSecondaryButtons,
  hideBottomButtons,
  small,
  isSelected = false,
  selectAddressAction = () => { },
  showAddressFormAction = () => { },
  showConfirmDeleteAction = () => { }
}: Props) => {
  const handleOnEdit = () => {
    showAddressFormAction(true, addressIndex)
  }
  const handleOnDelete = () => {
    showConfirmDeleteAction(addressIndex as number)
  }
  const handleOnSelectAddress = () => {
    selectAddressAction(addressIndex as number)
  }
  let buttons = !showSecondaryButtons ? (
    <EditButtonWrapper>
      <StyledCheckbox {...{ small }} checked={isSelected} onChange={handleOnSelectAddress}>
        {formatMessage(messages.useThisAddress)}
      </StyledCheckbox>
      <EditButton onClick={handleOnEdit}>
        <ButtonIcon type="edit" />
      </EditButton>
    </EditButtonWrapper>
  ) : (
      <SecondaryButtons>
        <StyledButton onClick={handleOnDelete}>
          <ButtonIcon type="delete" />{formatMessage(messages.delete)}
        </StyledButton>
        <EditButton onClick={handleOnEdit}>
          <ButtonIcon type="edit" />{formatMessage(messages.edit)}
        </EditButton>
      </SecondaryButtons>
    )
  if (multiButtons) {
    buttons = <MultiButtonsDiv>
      <SecondaryButtonsMulti>
        <StyledButtonMulti onClick={handleOnDelete}>
          <ButtonIcon type="delete" />{formatMessage(messages.delete)}
        </StyledButtonMulti>
        <EditButtonMulti onClick={handleOnEdit}>
          <ButtonIcon type="edit" />{formatMessage(messages.edit)}
        </EditButtonMulti>
      </SecondaryButtonsMulti>
      <StyledCheckboxMulti {...{ small }} checked={isSelected} onChange={handleOnSelectAddress}>
        {formatMessage(messages.useThisAddress)}
      </StyledCheckboxMulti>
      </MultiButtonsDiv>
  }
  let footerMessageText
  if (defaultBilling && defaultShipping) {
    footerMessageText = messages.defaultBillingAndShipping
  } else if (defaultBilling) {
    footerMessageText = messages.defaultBilling
  } else if (defaultShipping) {
    footerMessageText = messages.defaultShipping
  }
  const footerMessage =
    showSecondaryButtons && footerMessageText ? (
      <ItalicText><PinIcon theme="filled" type="pushpin" />{formatMessage(footerMessageText)}</ItalicText>
    ) : null

  // tslint:disable-next-line: max-line-length
  const shippingAddressName = street ? encodeURIComponent(`${street} ${zipCode} ${city} ${country}`) : ''
  // tslint:disable-next-line: max-line-length
  const shippingAddressMap = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${shippingAddressName}&t=&z=14&ie=UTF8&iwloc=B&output=embed`

  return (small || simple) ?
    <Container {...{ showSecondaryButtons, isSelected, small, simple }}>
      <Text>{name}</Text>
      <Text>{street}</Text>
      {apartment && <Text>{apartment}</Text>}
      <Text>{city}</Text>
      <Text>{zipCode}</Text>
      <Text>{country}</Text>
      {!!phone && <Text>{phone}</Text>}
      {footerMessage}
      {!hideBottomButtons ? buttons : null}
    </Container>
  : 
  <CardContainer {...{ showSecondaryButtons, isSelected, small, shipping }}>
    <MapsDiv>
      <iframe
        width="100%"
        height={shipping && !isSelected ? '0' : '200'}
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        style={{ transition: 'all .25s' }}
        allowfullscreen={true}
        src={shippingAddressMap}
      />
    </MapsDiv>
    <DataDiv>
      <CircleIcon theme="filled"  type="environment"/>
      <CardText>
        <TitleDiv>
          {formatMessage(messages.name)}
        </TitleDiv>
        <ValueDiv>
          {name}
        </ValueDiv>
      </CardText>
      <CardText>
        <TitleDiv>
          {formatMessage(messages.street)}
        </TitleDiv>
        <ValueDiv>
          {street}
        </ValueDiv>
      </CardText>
      {apartment && 
        <CardText>
          <TitleDiv>
            {formatMessage(messages.apartment)}
          </TitleDiv>
          <ValueDiv>
            {apartment}
          </ValueDiv>
        </CardText>
      }
      <CardText>
        <TitleDiv>
          {formatMessage(messages.city)}
        </TitleDiv>
        <ValueDiv>
          {city}
        </ValueDiv>
      </CardText>
      <CardText>
        <TitleDiv>
          {formatMessage(messages.zipCode)}
        </TitleDiv>
        <ValueDiv>
          {zipCode}
        </ValueDiv>
      </CardText>
      <CardText>
        <TitleDiv>
          {formatMessage(messages.country)}
        </TitleDiv>
        <ValueDiv>
          {country}
        </ValueDiv>
      </CardText>
      {!!phone &&
        <CardText>
          <TitleDiv>
            {formatMessage(messages.phone)}
          </TitleDiv>
          <ValueDiv>
            {phone}
          </ValueDiv>
        </CardText>
      }
      {footerMessage}
      {!hideBottomButtons ? buttons : null}
    </DataDiv>
  </CardContainer>
}

export default MyAddress
