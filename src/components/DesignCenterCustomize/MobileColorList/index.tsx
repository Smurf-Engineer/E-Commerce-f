/**
 * MobileColorList Component - Created by eduardo on 21/12/18.
 */
import * as React from 'react'
import ReactDOM from 'react-dom'
import findIndex from 'lodash/findIndex'

import { Container, Color, Col, ColorSlider, Border } from './styledComponents'
import colors from './colors'
import stitchingColors from './stitchingColors'
import { StitchingColor } from '../../../types/common'

interface Props {
  onSelectColor?: (color: string, name: string, index: number) => void
  onSelectStitchingColor?: (color: StitchingColor) => void
  stitching?: boolean
  selectedColor?: string
  stitchingColor?: StitchingColor
  disableTooltip?: boolean
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
    const { stitching } = this.props
    const arrayColors = !stitching ? colors : stitchingColors
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
      selectedColor
    } = this.props
    const setColor = (color: string, name: string, index: number) => () =>
      onSelectColor(color, name, index)
    const setStitchingColor = (color: StitchingColor) => () => {
      // tslint:disable-next-line:curly
      if (color.value !== stitchingColor.value) onSelectStitchingColor(color)
    }
    const arrayColors = !stitching ? colors : stitchingColors
    const colorsList = arrayColors.map(({ value, name }, index) => (
      <Col key={index}>
        <Border
          selected={value === stitchingColor.value || selectedColor === value}
        >
          <Color
            id={value}
            selected={value === stitchingColor.value || selectedColor === value}
            color={value}
            onClick={
              stitching
                ? setStitchingColor({ name, value })
                : setColor(value, name, index)
            }
          />
        </Border>
      </Col>
    ))

    return (
      <Container>
        <ColorSlider
          ref={(color: any) => {
            this.colorRef = color
          }}
          totalWidth={arrayColors.length * 44 + 12}
        >
          {colorsList}
        </ColorSlider>
      </Container>
    )
  }
}

export default MobileColorList
