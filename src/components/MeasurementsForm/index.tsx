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
  StyledInput,
  StyledButton,
  InputGroup,
  LabeledInput
} from './styledComponents'
import RadioGroup from 'antd/lib/radio/group'
import RadioButton from 'antd/lib/radio/radioButton'
import { MeasurementSettings } from '../../types/common'

interface Props {
  isMobile: boolean
  measurementSettings: MeasurementSettings
  loading: boolean
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
  onSaveMeasurementsSettings: () => void
}

const MeasurementsForm = ({
  isMobile,
  measurementSettings: {
    msrmntSystemSelected: msrmntSystemSelectedMS,
    msrmntGenderSelected: msrmntGenderSelectedMS,
    weight: weightMS,
    heightFirst: heightFirstMS,
    heightSecond: heightSecondMS,
    chest: chestMS,
    waist: waistMS,
    hips: hipsMS,
    inseam: inseamMS,
    shoulders: shouldersMS,
    neck: neckMS
  },
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
  loading,
  formatMessage,
  handleOnMsrmntSystemChange,
  handleOnMsrmntGenderChange,
  handleInputChange,
  onSaveMeasurementsSettings
}: Props) => {
  const disabled =
    (msrmntSystemSelected !== null && !msrmntSystemSelected) ||
    !msrmntSystemSelectedMS ||
    (msrmntGenderSelected !== null && !msrmntGenderSelected) ||
    !msrmntGenderSelectedMS ||
    (weight !== null && !weight) ||
    !weightMS ||
    (heightFirst !== null && !heightFirst) ||
    !heightFirstMS ||
    (heightSecond !== null && !heightSecond) ||
    !heightSecondMS ||
    (chestSize !== null && !chestSize) ||
    !chestMS ||
    (waistSize !== null && !waistSize) ||
    !waistMS ||
    (hipsSize !== null && !hipsSize) ||
    !hipsMS ||
    (inseamSize !== null && !inseamSize) ||
    !inseamMS ||
    (shouldersSize !== null && !shouldersSize) ||
    !shouldersMS ||
    (neckSize !== null && !neckSize) ||
    !neckMS

  const metricSistemSelected =
    (msrmntSystemSelected || msrmntSystemSelectedMS) === 'metric'
  const weightUnit = metricSistemSelected ? 'kgs' : 'lbs'
  const lengthShortUnit = metricSistemSelected ? 'cm' : 'in'
  const lengthLongUnit = metricSistemSelected ? 'mts' : 'ft'

  const weightComponent = (
    <Column inputhWidth={!isMobile ? '48%' : '75%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.weight)}</Label>
      </InputTitleContainer>
      <InputGroup compact={true}>
        <StyledInput
          style={{ width: '80%', borderRadius: 0 }}
          id="weight"
          value={weight !== null ? weight : weightMS}
          onChange={handleInputChange}
          maxLength="50"
        />
        <LabeledInput
          style={{ width: '20%', borderLeft: 0, borderRadius: 0 }}
          placeholder={weightUnit}
          disabled={true}
        />
      </InputGroup>
    </Column>
  )
  const heightComponent = (
    <Column inputhWidth={!isMobile ? '48%' : '75%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.height)}</Label>
      </InputTitleContainer>
      <Row marginBottom={'0'}>
        <Column inputhWidth={'48%'}>
          <InputGroup compact={true}>
            <StyledInput
              style={{ width: '60%', borderRadius: 0 }}
              id="heightFirst"
              value={heightFirst !== null ? heightFirst : heightFirstMS}
              onChange={handleInputChange}
              maxLength="50"
            />
            <LabeledInput
              style={{ width: '40%', borderLeft: 0, borderRadius: 0 }}
              placeholder={lengthLongUnit}
              disabled={true}
            />
          </InputGroup>
        </Column>
        <Column inputhWidth={'48%'}>
          <InputGroup compact={true}>
            <StyledInput
              style={{ width: '60%', borderRadius: 0 }}
              id="heightSecond"
              value={heightSecond !== null ? heightSecond : heightSecondMS}
              onChange={handleInputChange}
              maxLength="50"
            />
            <LabeledInput
              style={{ width: '40%', borderLeft: 0, borderRadius: 0 }}
              placeholder={lengthShortUnit}
              disabled={true}
            />
          </InputGroup>
        </Column>
      </Row>
    </Column>
  )
  const chestComponent = (
    <Column inputhWidth={!isMobile ? '31%' : '48%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.chest)}</Label>
      </InputTitleContainer>
      <InputGroup compact={true}>
        <StyledInput
          style={{ width: '70%', borderRadius: 0 }}
          id="chestSize"
          value={chestSize !== null ? chestSize : chestMS}
          onChange={handleInputChange}
          maxLength="50"
        />
        <LabeledInput
          style={{ width: '30%', borderLeft: 0, borderRadius: 0 }}
          placeholder={lengthShortUnit}
          disabled={true}
        />
      </InputGroup>
    </Column>
  )

  const waistComponent = (
    <Column inputhWidth={!isMobile ? '31%' : '48%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.waist)}</Label>
      </InputTitleContainer>
      <InputGroup compact={true}>
        <StyledInput
          style={{ width: '70%', borderRadius: 0 }}
          id="waistSize"
          value={waistSize !== null ? waistSize : waistMS}
          onChange={handleInputChange}
          maxLength="50"
        />
        <LabeledInput
          style={{ width: '30%', borderLeft: 0, borderRadius: 0 }}
          placeholder={lengthShortUnit}
          disabled={true}
        />
      </InputGroup>
    </Column>
  )

  const hipsComponent = (
    <Column inputhWidth={!isMobile ? '31%' : '48%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.hips)}</Label>
      </InputTitleContainer>
      <InputGroup compact={true}>
        <StyledInput
          style={{ width: '70%', borderRadius: 0 }}
          id="hipsSize"
          value={hipsSize !== null ? hipsSize : hipsMS}
          onChange={handleInputChange}
          maxLength="50"
        />
        <LabeledInput
          style={{ width: '30%', borderLeft: 0, borderRadius: 0 }}
          placeholder={lengthShortUnit}
          disabled={true}
        />
      </InputGroup>
    </Column>
  )

  const inseamComponent = (
    <Column inputhWidth={!isMobile ? '31%' : '48%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.inseam)}</Label>
      </InputTitleContainer>
      <InputGroup compact={true}>
        <StyledInput
          style={{ width: '70%', borderRadius: 0 }}
          id="inseamSize"
          value={inseamSize !== null ? inseamSize : inseamMS}
          onChange={handleInputChange}
          maxLength="50"
        />
        <LabeledInput
          style={{ width: '30%', borderLeft: 0, borderRadius: 0 }}
          placeholder={lengthShortUnit}
          disabled={true}
        />
      </InputGroup>
    </Column>
  )

  const shouldersComponent = (
    <Column inputhWidth={!isMobile ? '31%' : '48%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.shoulders)}</Label>
      </InputTitleContainer>
      <InputGroup compact={true}>
        <StyledInput
          style={{ width: '70%', borderRadius: 0 }}
          id="shouldersSize"
          value={shouldersSize !== null ? shouldersSize : shouldersMS}
          onChange={handleInputChange}
          maxLength="50"
        />
        <LabeledInput
          style={{ width: '30%', borderLeft: 0, borderRadius: 0 }}
          placeholder={lengthShortUnit}
          disabled={true}
        />
      </InputGroup>
    </Column>
  )

  const neckComponent = (
    <Column inputhWidth={!isMobile ? '31%' : '48%'}>
      <InputTitleContainer>
        <Label>{formatMessage(messages.neck)}</Label>
      </InputTitleContainer>
      <InputGroup compact={true}>
        <StyledInput
          style={{ width: '70%', borderRadius: 0 }}
          id="neckSize"
          value={neckSize !== null ? neckSize : neckMS}
          onChange={handleInputChange}
          maxLength="50"
        />
        <LabeledInput
          style={{ width: '30%', borderLeft: 0, borderRadius: 0 }}
          placeholder={lengthShortUnit}
          disabled={true}
        />
      </InputGroup>
    </Column>
  )

  return (
    <Container>
      <Row>
        <Column inputhWidth={!isMobile ? '31%' : '48%'}>
          <RadioGroup
            value={msrmntSystemSelected || msrmntSystemSelectedMS || 'metric'}
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
        <Column inputhWidth={!isMobile ? '31%' : '48%'}>
          <RadioGroup
            value={msrmntGenderSelected || msrmntGenderSelectedMS || 'man'}
            onChange={handleOnMsrmntGenderChange}
          >
            <RadioButton value="man">{formatMessage(messages.man)}</RadioButton>
            <RadioButton value="woman">
              {formatMessage(messages.woman)}
            </RadioButton>
          </RadioGroup>
        </Column>
        {!isMobile ? <Column inputhWidth={'31%'} /> : null}
      </Row>
      {!isMobile ? (
        <div>
          <Row>
            {weightComponent}
            {heightComponent}
          </Row>
          <Row>
            {chestComponent}
            {waistComponent}
            {hipsComponent}
          </Row>
          <Row>
            {inseamComponent}
            {shouldersComponent}
            {neckComponent}
          </Row>
        </div>
      ) : (
        <div>
          <Row>{weightComponent}</Row>
          <Row>{heightComponent}</Row>
          <Row>
            {chestComponent}
            {waistComponent}
          </Row>
          <Row>
            {hipsComponent}
            {inseamComponent}
          </Row>
          <Row>
            {shouldersComponent}
            {neckComponent}
          </Row>
        </div>
      )}
      <Row>
        <Column inputhWidth={!isMobile ? '27%' : '48%'}>
          <StyledButton
            {...{ loading, disabled }}
            type="primary"
            onClick={onSaveMeasurementsSettings}
          >
            {formatMessage(messages.save)}
          </StyledButton>
        </Column>
      </Row>
    </Container>
  )
}

export default MeasurementsForm
