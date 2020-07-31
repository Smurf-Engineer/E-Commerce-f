/**
 * MobileColorList Component - Created by eduardo on 21/12/18.
 */
import * as React from 'react'
import ReactDOM from 'react-dom'
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import Message from 'antd/lib/message'

import { Container, Color, Col, ColorSlider, Border } from './styledComponents'
import { StitchingColor, PredyedColor } from '../../../types/common'

interface Color {
  value: string
  name: string
}
interface Props {
  onSelectPredyed?: (color: PredyedColor) => void
  onSelectColor?: (color: string, name: string, index: number) => void
  onSelectStitchingColor?: (color: StitchingColor) => void
  stitching?: boolean
  isPredyed: boolean
  predyedColors: PredyedColor[]
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
    const { stitching, colorsList, isPredyed, predyedColors } = this.props
    let arrayColors: any = !stitching

    if (isPredyed) {
      arrayColors = predyedColors.map(({ code, name }) => ({
        value: code,
        name,
        label: name
      }))
    } else {
      try {
        arrayColors = JSON.parse(
          get(
            colorsList,
            !stitching ? 'colorsResult.colors' : 'colorsResult.stitchingColors',
            []
          )
        )
      } catch (e) {
        Message.error(e)
      }
    }

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
      predyedColors,
      isPredyed = false,
      onSelectColor = () => { },
      onSelectPredyed = () => { },
      onSelectStitchingColor = () => { },
      stitching = false,
      stitchingColor = { value: '', name: '' },
      selectedColor,
      colorsList
    } = this.props
    const setColor = (color: string, name: string, index: number) => () =>
      onSelectColor(color, name, index)
    const setStitchingColor = (color: StitchingColor) => () => {
      // tslint:disable-next-line:curly
      if (color.value !== stitchingColor.value) {
        if (isPredyed) {
          onSelectPredyed({ code: color.value, name: color.name })
        } else {
          onSelectStitchingColor(color)
        }
      }
    }
    let arrayColors: any
    if (isPredyed) {
      arrayColors = predyedColors.map(({ code, name }) => ({
        value: code,
        name,
        label: name
      }))
    } else {
      try {
        arrayColors = JSON.parse(
          get(
            colorsList,
            !stitching ? 'colorsResult.colors' : 'colorsResult.stitchingColors',
            []
          )
        )
      } catch (e) {
        Message.error(e)
      }
    }

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
          {arrayColors.length && colorList}
        </ColorSlider>
      </Container>
    )
  }
}

export default MobileColorList
