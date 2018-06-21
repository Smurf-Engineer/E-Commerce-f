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
  LabeledInput,
  RadioButton
} from './styledComponents'
import RadioGroup from 'antd/lib/radio/group'

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
    chest: chestSizeMS,
    waist: waistSizeMS,
    hips: hipsSizeMS,
    inseam: inseamSizeMS,
    shoulders: shouldersSizeMS,
    neck: neckSizeMS
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
  const msrmntSystemSelectedChanged =
    msrmntSystemSelected !== null &&
    msrmntSystemSelectedMS !== msrmntSystemSelected &&
    msrmntSystemSelected
  const msrmntGenderSelectedChaned =
    msrmntGenderSelected !== null &&
    msrmntGenderSelectedMS !== msrmntGenderSelected &&
    msrmntGenderSelected
  const weightChanged = weight !== null && String(weightMS) !== weight && weight
  const heightFirstChanged =
    heightFirst !== null && String(heightFirstMS) !== heightFirst && heightFirst
  const heightSecondChanged =
    heightSecond !== null &&
    String(heightSecondMS) !== heightSecond &&
    heightSecond
  const chestSizeChanged =
    chestSize !== null && String(chestSizeMS) !== chestSize && chestSize
  const waistSizeChanged =
    waistSize !== null && String(waistSizeMS) !== waistSize && waistSize
  const hipsSizeChanged =
    hipsSize !== null && String(hipsSizeMS) !== hipsSize && hipsSize
  const inseamSizeChanged =
    inseamSize !== null && String(inseamSizeMS) !== inseamSize && inseamSize
  const shouldersSizeChanged =
    shouldersSize !== null &&
    String(shouldersSizeMS) !== shouldersSize &&
    shouldersSize
  const neckSizeChanged =
    neckSize !== null && String(neckSizeMS) !== neckSize && neckSize
  const disabled =
    !msrmntSystemSelectedChanged &&
    !msrmntGenderSelectedChaned &&
    !weightChanged &&
    !heightFirstChanged &&
    !heightSecondChanged &&
    !chestSizeChanged &&
    !waistSizeChanged &&
    !hipsSizeChanged &&
    !inseamSizeChanged &&
    !shouldersSizeChanged &&
    !neckSizeChanged

  const metricSystemSelected =
    (msrmntSystemSelected || msrmntSystemSelectedMS) === 'metric'
  const weightUnit = metricSystemSelected ? 'kgs' : 'lbs'
  const lengthShortUnit = metricSystemSelected ? 'cm' : 'in'
  const lengthLongUnit = metricSystemSelected ? 'mts' : 'ft'

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
          style={{
            width: '20%',
            borderLeft: 0,
            borderRadius: 0
          }}
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
          value={chestSize !== null ? chestSize : chestSizeMS}
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
          value={waistSize !== null ? waistSize : waistSizeMS}
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
          value={hipsSize !== null ? hipsSize : hipsSizeMS}
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
          value={inseamSize !== null ? inseamSize : inseamSizeMS}
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
          value={shouldersSize !== null ? shouldersSize : shouldersSizeMS}
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
          value={neckSize !== null ? neckSize : neckSizeMS}
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
            value={msrmntSystemSelected || msrmntSystemSelectedMS || 'imperial'}
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
