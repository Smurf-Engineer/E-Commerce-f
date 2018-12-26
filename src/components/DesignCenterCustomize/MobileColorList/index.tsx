/**
 * MobileColorList Component - Created by eduardo on 21/12/18.
 */
import * as React from 'react'
import ReactDOM from 'react-dom'
import findIndex from 'lodash/findIndex'
import scrollIntoView from 'scroll-into-view'
import { Container, Color, Col, ColorSlider } from './styledComponents'
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
  private myRef: any

  componentDidMount() {
    const { selectedColor } = this.props
    if (selectedColor) {
      this.scrollColorList(selectedColor)
    }
  }

  scrollColorList(selectedColor: string) {
    const { stitching } = this.props
    const arrayColors = !stitching ? colors : stitchingColors

    const index = findIndex(arrayColors, ['value', selectedColor])

    const node = ReactDOM.findDOMNode(this.myRef) as HTMLElement

    scrollIntoView(node, {
      time: 0,
      align: {
        left: 0,
        leftOffset: -(index * 44)
      }
    })
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
      </Col>
    ))

    return (
      <Container>
        <ColorSlider
          ref={(color: any) => {
            this.myRef = color
          }}
          className={'aaa'}
          totalColors={arrayColors.length}
        >
          {colorsList}
        </ColorSlider>
      </Container>
    )
  }
}

export default MobileColorList
