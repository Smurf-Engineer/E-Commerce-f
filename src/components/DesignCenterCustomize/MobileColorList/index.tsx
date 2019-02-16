/**
 * MobileColorList Component - Created by eduardo on 21/12/18.
 */
import * as React from 'react'
import ReactDOM from 'react-dom'
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import { Container, Color, Col, ColorSlider, Border } from './styledComponents'
import { StitchingColor } from '../../../types/common'

interface Color {
  value: string
  name: string
}
interface Props {
  onSelectColor?: (color: string, name: string, index: number) => void
  onSelectStitchingColor?: (color: StitchingColor) => void
  stitching?: boolean
  selectedColor?: string
  stitchingColor?: StitchingColor
  disableTooltip?: boolean
  colorsList: any
}

class MobileColorList extends React.PureComponent<Props> {
  private colorRef: any

  componentDidMount() {
    const { selectedColor, stitchingColor } = this.props
    if (selectedColor) {
      this.scrollColorList(selectedColor)
    }
    if (stitchingColor) {
      this.scrollColorList(stitchingColor.value)
    }
  }

  scrollColorList(selectedColor: string) {
    const { stitching, colorsList } = this.props
    const arrayColors: any = !stitching
      ? JSON.parse(get(colorsList, 'colorsResult.colors', []))
      : JSON.parse(get(colorsList, 'colorsResult.stitchingColors', []))
    const index = findIndex(arrayColors, ['value', selectedColor])
    const node = ReactDOM.findDOMNode(this.colorRef) as HTMLElement
    node.scrollLeft = index * 48
  }
  componentWillReceiveProps(nextProps: any) {
    const { selectedColor, stitching, stitchingColor } = this.props
    if (!stitching && selectedColor !== nextProps.selectedColor) {
      this.scrollColorList(nextProps.selectedColor)
    }
    if (stitching && stitchingColor !== nextProps.stitchingColor) {
      this.scrollColorList(nextProps.stitchingColor.value)
    }
  }

  render() {
    const {
      onSelectColor = () => {},
      onSelectStitchingColor = () => {},
      stitching = false,
      stitchingColor = { value: '', name: '' },
      selectedColor,
      colorsList
    } = this.props
    const setColor = (color: string, name: string, index: number) => () =>
      onSelectColor(color, name, index)
    const setStitchingColor = (color: StitchingColor) => () => {
      // tslint:disable-next-line:curly
      if (color.value !== stitchingColor.value) onSelectStitchingColor(color)
    }
    const arrayColors: any = !stitching
      ? JSON.parse(get(colorsList, 'colorsResult.colors', []))
      : JSON.parse(get(colorsList, 'colorsResult.stitchingColors', []))
    const colorList = arrayColors.map(
      ({ value, name }: Color, index: number) => (
        <Col key={index}>
          <Border
            selected={value === stitchingColor.value || selectedColor === value}
          >
            <Color
              id={value}
              selected={
                value === stitchingColor.value || selectedColor === value
              }
              color={value}
              onClick={
                stitching
                  ? setStitchingColor({ name, value })
                  : setColor(value, name, index)
              }
            />
          </Border>
        </Col>
      )
    )

    return (
      <Container>
        <ColorSlider
          ref={(color: any) => {
            this.colorRef = color
          }}
          totalWidth={arrayColors.length * 44 + 12}
        >
          {colorList}
        </ColorSlider>
      </Container>
    )
  }
}

export default MobileColorList
