/**
 * MeasurementsForm Component - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Row,
  Column,
  InputTitleContainer,
  Label,
  StyledInput
} from './styledComponents'
import RadioGroup from 'antd/lib/radio/group'
import RadioButton from 'antd/lib/radio/radioButton'

interface Props {
  msrmntSystemSelected: string
  msrmntGenderSelected: string
  weight: string
  heightFirst: string
  heightSecond: string
  chestSize: string
  waistSize: string
  hipsSize: string
  inseamSize: string
  shouldersSize: string
  neckSize: string
  formatMessage: (messageDescriptor: any) => string
  handleOnMsrmntSystemChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  handleOnMsrmntGenderChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const MeasurementsForm = ({
  msrmntSystemSelected,
  msrmntGenderSelected,
  weight,
  heightFirst,
  heightSecond,
  chestSize,
  waistSize,
  hipsSize,
  inseamSize,
  shouldersSize,
  neckSize,
  formatMessage,
  handleOnMsrmntSystemChange,
  handleOnMsrmntGenderChange,
  handleInputChange
}: Props) => {
  return (
    <Container>
      <Row>
        <Column inputhWidth={'31%'}>
          <RadioGroup
            value={msrmntSystemSelected}
            onChange={handleOnMsrmntSystemChange}
          >
            <RadioButton value="metric">
              {formatMessage(messages.metric)}
            </RadioButton>
            <RadioButton value="imperial">
              {formatMessage(messages.imperial)}
            </RadioButton>
          </RadioGroup>
        </Column>
        <Column inputhWidth={'31%'}>
          <RadioGroup
            value={msrmntGenderSelected}
            onChange={handleOnMsrmntGenderChange}
          >
            <RadioButton value="man">{formatMessage(messages.man)}</RadioButton>
            <RadioButton value="woman">
              {formatMessage(messages.woman)}
            </RadioButton>
          </RadioGroup>
        </Column>
        <Column inputhWidth={'31%'} />
      </Row>
      <Row>
        <Column inputhWidth={'48%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.weight)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="weight"
            value={weight}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
        <Column inputhWidth={'48%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.height)}</Label>
          </InputTitleContainer>
          <Row marginBottom={'0'}>
            <Column inputhWidth={'48%'}>
              <StyledInput
                id="heightFirst"
                value={heightFirst}
                onChange={handleInputChange}
                maxLength="50"
              />
            </Column>
            <Column inputhWidth={'48%'}>
              <StyledInput
                id="heightSecond"
                value={heightSecond}
                onChange={handleInputChange}
                maxLength="50"
              />
            </Column>
          </Row>
        </Column>
      </Row>
      <Row>
        <Column inputhWidth={'31%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.chest)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="chestSize"
            value={chestSize}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
        <Column inputhWidth={'31%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.waist)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="waistSize"
            value={waistSize}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
        <Column inputhWidth={'31%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.hips)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="hipsSize"
            value={hipsSize}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
      </Row>
      <Row>
        <Column inputhWidth={'31%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.inseam)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="inseamSize"
            value={inseamSize}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
        <Column inputhWidth={'31%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.shoulders)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="shouldersSize"
            value={shouldersSize}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
        <Column inputhWidth={'31%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.neck)}</Label>
          </InputTitleContainer>
          <StyledInput
            id="neckSize"
            value={neckSize}
            onChange={handleInputChange}
            maxLength="50"
          />
        </Column>
      </Row>
    </Container>
  )
}

export default MeasurementsForm
