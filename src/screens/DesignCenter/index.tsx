/**
 * DesignCenter Screen - Created by david on 23/02/18.
 */
import * as React from 'react'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { RouteComponentProps } from 'react-router-dom'
import { ReducersObject } from '../../store/rootReducer'
import Layout from '../../components/MainLayout'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import * as designCenterActions from './actions'
import Header from '../../components/DesignCenterHeader'
import Tabs from '../../components/DesignCenterTabs'
import Info from '../../components/DesignCenterInfo'
import Grid from '../../components/DesignCenterGrid'
import Customize from '../../components/DesignCenterCustomize'
import { Container, Text } from './styledComponents'
import { Theme } from '../../types/common'
import messages from './messages'

// TODO: DUMMIE DATA
const themes: Theme[] = [
  {
    id: 1,
    name: 'Patriotic / Armed Forces',
    picture:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Patriotic_arm%20forces.svg'
  },
  {
    id: 2,
    name: 'Animal Prints',
    picture:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/AnimalPrint.svg'
  },
  {
    id: 3,
    name: 'Geometric',
    picture:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Geometric.svg'
  },
  {
    id: 4,
    name: 'Vintage / Retro',
    picture:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Vintage_Retro.svg'
  },
  {
    id: 5,
    name: 'Oraganic',
    picture:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Organic.svg'
  },
  {
    id: 6,
    name: 'Natural / Floral / Scenic',
    picture:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Natural_floral.svg'
  },
  {
    id: 7,
    name: 'Bohemian / Tribal',
    picture:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Bohemian_tribal.svg'
  },
  {
    id: 8,
    name: 'Grunge',
    picture:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Grunge.svg'
  },
  {
    id: 9,
    name: 'Funky',
    picture:
      'https://storage.googleapis.com/jakroo-storage/Assets_themes/Funky.svg'
  }
]

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  currentTab: number
  setCurrentTabAction: (index: number) => void
  openQuickViewAction: (index: number) => void
}

export class DesignCenter extends React.Component<Props, {}> {
  handleOpenQuickView = () => {
    const { openQuickViewAction: openQuickView } = this.props
    // TODO: This id it's the same of the product
    openQuickView(1)
  }

  handleOnPressBack = () => {
    const { history } = this.props
    history.replace('/')
  }

  handleOnSelectTab = (index: number) => {
    const { setCurrentTabAction } = this.props
    setCurrentTabAction(index)
  }

  render() {
    const { intl, history, currentTab } = this.props
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <Header onPressBack={this.handleOnPressBack} />
          <Tabs {...{ currentTab }} onSelectTab={this.handleOnSelectTab} />
          <SwipeableViews index={currentTab}>
            <div key="theme">
              <Info
                label="theme"
                model="NOVA"
                onPressQuickView={this.handleOpenQuickView}
              />
              <Grid {...{ themes }} />
            </div>
            <div key="style">
              <Info
                label="style"
                model="NOVA"
                onPressQuickView={this.handleOpenQuickView}
              />
              <div>Style</div>
            </div>
            <Customize />
            <div key="preview">
              <div>Preview</div>
            </div>
          </SwipeableViews>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = ({ designCenter }: ReducersObject) =>
  designCenter.toJS()

const DesignCenterEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...designCenterActions, openQuickViewAction })
)(DesignCenter)

export default DesignCenterEnhance
