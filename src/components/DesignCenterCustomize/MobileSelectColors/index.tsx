/**
 * MobileSelectColors Component - Created by eduardo on 20/12/18.
 */
import * as React from 'react'
import messages from './messages'
import MobileAccessoryColor from '../MobileAccessoryColor'
import Tabs from 'antd/lib/tabs'
import MobileColorList from '../MobileColorList'
import {
  Container,
  Label,
  TabArea,
  ColorOval,
  TabContainer,
  Row,
  Divider,
  StyledTabs
} from './styledComponents'
import { AccessoryColors } from '../../../screens/DesignCenter/constants'
import {
  StitchingColor,
  AccesoryColor,
  Product,
  Message,
  Index
} from '../../../types/common'

interface Props {
  colors: string[]
  colorBlock?: number
  stitchingColor?: StitchingColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bibColor?: AccesoryColor
  product?: Product
  colorsList: any
  selectedPredyed: string
  onSelectPredyed: (predyedColor: string) => void
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string, name: string) => void
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  formatMessage: (messageDescriptor: Message, params?: Index) => string
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
}
const TabPane = Tabs.TabPane

class MobileSelectColors extends React.PureComponent<Props> {
  componentDidMount() {
    const { colorBlock, onSelectColorBlock } = this.props
    if (colorBlock === -1) {
      onSelectColorBlock(0)
    }
  }

  render() {
    const {
      formatMessage,
      colors,
      colorBlock = -1,
      onSelectColor,
      stitchingColor,
      selectedPredyed,
      product,
      onSelectStitchingColor,
      onSelectPredyed,
      bibColor,
      onAccessoryColorSelected,
      bindingColor,
      zipperColor,
      colorsList
    } = this.props
    const hasStitching = !!product && !!product.flatlock
    const hasZipper = !!product && !!product.zipper
    const hasBinding = !!product && !!product.binding
    const hasBibBrace = !!product && !!product.bibBrace
    const hasBranding = !!product && !!product.branding
    const colorButtons = colors.map((color, index) => {
      return (
        <TabPane
          style={{ margin: 0 }}
          tab={
            <TabContainer>
              <ColorOval currentColor={color} />
              <TabArea>
                {formatMessage(messages.area, { index: index + 1 })}
              </TabArea>
            </TabContainer>
          }
          key={`${index}`}
        />
      )
    })
    return (
      <Container>
        <Label>{formatMessage({ ...messages.selectColors })}</Label>
        <StyledTabs
          size="small"
          onChange={this.handleOnTabChange}
          defaultActiveKey={`${colorBlock}` || '0'}
        >
          {colorButtons}
        </StyledTabs>
        <MobileColorList
          selectedColor={colorBlock !== -1 ? colors[colorBlock] : colors[0]}
          {...{ onSelectColor, colorsList }}
        />
        <Divider />
        {hasStitching && (
          <Row>
            <Label>{formatMessage({ ...messages.stitching })}</Label>
            <MobileColorList
              {...{ stitchingColor, onSelectStitchingColor, colorsList }}
              stitching={true}
            />
          </Row>
        )}
        {hasBranding && (
          <Row>
            <Label>{formatMessage({ ...messages.predyed })}</Label>
            <MobileAccessoryColor
              id={AccessoryColors.Predyed}
              colorSelected={selectedPredyed}
              onAccessoryColorSelected={onSelectPredyed}
            />
          </Row>
        )}
        {hasBinding && (
          <Row>
            <Label>{formatMessage({ ...messages.binding })}</Label>
            <MobileAccessoryColor
              id={AccessoryColors.Binding}
              colorSelected={bindingColor}
              {...{ onAccessoryColorSelected }}
            />
          </Row>
        )}
        {hasBibBrace && (
          <Row>
            <Label>{formatMessage({ ...messages.bibBrace })}</Label>
            <MobileAccessoryColor
              id={AccessoryColors.Bib}
              colorSelected={bibColor}
              {...{ onAccessoryColorSelected }}
            />
          </Row>
        )}
        {hasZipper && (
          <Row>
            <Label>{formatMessage({ ...messages.zipper })}</Label>
            <MobileAccessoryColor
              id={AccessoryColors.Zipper}
              colorSelected={zipperColor}
              {...{ onAccessoryColorSelected }}
            />
          </Row>
        )}
      </Container>
    )
  }
  handleOnTabChange = (activeKey: string) => {
    const { onSelectColorBlock } = this.props
    onSelectColorBlock(Number(activeKey))
  }
}

export default MobileSelectColors
