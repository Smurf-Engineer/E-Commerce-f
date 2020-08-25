/**
 * ColorTab - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'

import { Container, Header, Arrow, TabContent, Column, Label, StyledSelect, dropDownStyles } from './styledComponents'
import messages from './messages'
import { withApollo, compose, graphql, QueryProps } from 'react-apollo'
import SwipeableViews from 'react-swipeable-views'
import Spin from 'antd/lib/spin'
import Select from 'antd/lib/select'
import { GetColorsQuery, getPredyedColors } from './data'
import AccessoryColor from '../../../components/DesignCenterCustomize/AccessoryColor'
import ColorList from '../../../components/DesignCenterCustomize/ColorList'
import { AccessoryColors as AccessoryColorsConstants } from '../../../screens/DesignCenter/constants'
import {
  Message,
  Colors,
  StitchingColor,
  ColorAccessories,
  Product,
  PredyedColor
} from '../../../types/common'
import { STITCHING_SECTION, MAIN_SECTION } from '../constants'
import get from 'lodash/get'

const { Option } = Select

interface PredyedData extends QueryProps {
  getPredyedColors: PredyedColor[]
}

interface ColorsData extends QueryProps {
  colorsResult: Colors
}

interface Props {
  index: number
  data: ColorsData
  predyedData: PredyedData
  colorAccessories: ColorAccessories
  product: Product
  formatMessage: (messageDescriptor: Message) => string
  goToColorSection: (index: number) => void
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  onSelectColor: (color: string, id: string) => void
}

export class ColorTab extends React.Component<Props, {}> {
  goToStitching = () => {
    const { goToColorSection } = this.props
    goToColorSection(STITCHING_SECTION)
  }
  handleOnBack = () => {
    const { goToColorSection } = this.props
    goToColorSection(MAIN_SECTION)
  }
  selectPredyed = (value: string) => {
    const { onSelectColor } = this.props
    onSelectColor(value, AccessoryColorsConstants.Predyed)
  }
  render() {
    const {
      formatMessage,
      index,
      predyedData,
      data,
      onSelectStitchingColor,
      colorAccessories: {
        stitchingName,
        stitching,
        bibColor,
        zipperColor,
        bindingColor,
        predyed
      },
      product,
      onSelectColor
    } = this.props
    const isFirstTab = index === MAIN_SECTION
    const predyedColors = get(predyedData, 'getPredyedColors', [])
    return (
      <Container>
        {product ? (
          <TabContent>
            <Header>
              {!isFirstTab && (
                <Arrow type={'left'} onClick={this.handleOnBack} />
              )}
              {formatMessage(isFirstTab ? messages.title : messages.stitching)}
            </Header>
            <SwipeableViews disabled={true} {...{ index }}>
              <div>
                {product.flatlock && (
                  <AccessoryColor
                    name={formatMessage(messages.stitching)}
                    goToStitching={this.goToStitching}
                    stitchingColor={{ name: stitchingName, value: stitching }}
                  />
                )}
                {product.bibBrace && (
                  <AccessoryColor
                    id={AccessoryColorsConstants.Bib}
                    name="Bib Brace Color"
                    colorSelected={bibColor}
                    allowSelection={true}
                    onAccessoryColorSelected={onSelectColor}
                  />
                )}
                {product.zipper && (
                  <AccessoryColor
                    id={AccessoryColorsConstants.Zipper}
                    name="Zipper Color"
                    colorSelected={zipperColor}
                    allowSelection={
                      !!product.zipper &&
                      !!product.zipper.white &&
                      !!product.zipper.black
                    }
                    onAccessoryColorSelected={onSelectColor}
                  />
                )}
                {product.binding && (
                  <AccessoryColor
                    id={AccessoryColorsConstants.Binding}
                    name="Binding Color"
                    colorSelected={bindingColor}
                    allowSelection={true}
                    onAccessoryColorSelected={onSelectColor}
                  />
                )}
                {product.branding && (
                  <Column>
                    <Label>{formatMessage(messages.predyed)}</Label>
                    <StyledSelect
                      onSelect={this.selectPredyed}
                      defaultValue={predyed}
                      dropdownStyle={dropDownStyles}
                    >
                      {predyedColors.map(({ name }: PredyedColor) => (
                        <Option key={name} value={name}>
                          {name}
                        </Option>
                      ))}
                    </StyledSelect>
                  </Column>
                )}
              </div>
              {data && !data.loading ? (
                <ColorList
                  stitching={true}
                  stitchingColor={{ name: stitchingName, value: stitching }}
                  {...{
                    onSelectStitchingColor,
                    colorsList: data,
                    formatMessage
                  }}
                />
              ) : (
                  <Spin />
                )}
            </SwipeableViews>
          </TabContent>
        ) : (
            formatMessage(messages.noProductSelected)
          )}
      </Container>
    )
  }
}

const ColorTabEnhance = compose(
  withApollo,
  graphql<ColorsData>(GetColorsQuery),
  graphql<PredyedData>(getPredyedColors, {
    options: {
      fetchPolicy: 'network-only'
    },
    name: 'predyedData'
  }),
)(ColorTab)

export default ColorTabEnhance
