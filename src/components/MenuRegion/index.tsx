/**
 * MenuRegion Component - Created by david on 20/02/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import Menu from './Menu'
import caFlag from '../../assets/CA.svg'
import { Container, TopText, Region, overStyle } from './styledComponents'

interface Props {
  onChangeLocation: (locale: string) => void
}

interface State {
  currentRegion: number
}

class MenuRegion extends React.PureComponent<Props, State> {
  state = {
    currentRegion: 0
  }
  handleOnSelectRegion = ({ key }: any) => this.setState({ currentRegion: key })
  render() {
    const { currentRegion } = this.state
    return (
      <Popover
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        content={
          <Menu
            {...{ currentRegion }}
            onSelectRegion={this.handleOnSelectRegion}
          />
        }
      >
        <Region>
          <img src={caFlag} />
          <TopText>$USD</TopText>
        </Region>
      </Popover>
    )
  }
}

export default MenuRegion
