/**
 * Designs Screen - Created by david on 27/03/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import get from 'lodash/get'
import GoogleFontLoader from 'react-google-font-loader'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { getFonts } from './data'
import ThreeD from '../../components/Render3D'
import * as designsActions from './actions'
import { QueryProps, DesignSaved, Font } from '../../types/common'
// TODO: Commented all quickview related until confirm it won't be needed
// import quickView from '../../assets/quickview.svg'
import {
  Container
  // Row,
  // Model,
  // QuickView
} from './styledComponents'

interface Data extends QueryProps {
  design: DesignSaved
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  // openQuickViewAction: (index: number) => void
  loadingModel: boolean
  fontsData: any
  // Redux actions
  setLoadingAction: (loading: boolean) => void
}

export class Designs extends React.Component<Props, {}> {
  handleOnPressBack = () => {
    window.location.replace('/')
  }

  // handleOpenQuickView = () => {
  //   const {
  //     data: {
  //       design: { product }
  //     },
  //     openQuickViewAction: openQuickView
  //   } = this.props
  //   openQuickView(product.id)
  // }

  render() {
    const { location, fontsData } = this.props

    const { search } = location
    const queryParams = queryString.parse(search)
    const designId = queryParams.id || ''
    const fontList: Font[] = get(fontsData, 'fonts', [])
    const installedFonts = fontList.reduce<{ font: string }[]>(
      (fontObject, { active, family }) => {
        if (active) {
          fontObject.push({ font: family })
        }
        return fontObject
      },
      []
    )
    return (
      <Container>
        {/* <Row>
          <Model>{name}</Model>
          <QuickView onClick={this.handleOpenQuickView} src={quickView} />
        </Row>*/}
        {installedFonts.length ? (
          <GoogleFontLoader fonts={installedFonts} />
        ) : null}
        <ThreeD {...{ designId }} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('designs').toJS()

const DesignsEnhance = compose(
  injectIntl,
  getFonts,
  connect(
    mapStateToProps,
    { ...designsActions, openQuickViewAction }
  )
)(Designs)

export default DesignsEnhance
