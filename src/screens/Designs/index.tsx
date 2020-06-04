/**
 * Designs Screen - Created by david on 27/03/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import get from 'lodash/get'
import GoogleFontLoader from 'react-google-font-loader'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { getFonts } from './data'
import ThreeD from '../../components/Render3D'
import { restoreUserSession } from '../../components/MainLayout/api'
import * as designsActions from './actions'
import { QueryProps, DesignSaved, Font, UserType } from '../../types/common'
// TODO: Commented all quickview related until confirm it won't be needed
// import quickView from '../../assets/quickview.svg'
import { Container } from './styledComponents'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'

interface Data extends QueryProps {
  design: DesignSaved
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  client: any
  user: UserType
  // openQuickViewAction: (index: number) => void
  loadingModel: boolean
  fontsData: any
  phone: boolean
  // Redux actions
  restoreUserSessionAction: (client: any) => void
  setLoadingAction: (loading: boolean) => void
}

export class Designs extends React.Component<Props, {}> {
  componentWillMount() {
    const { user, client } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSessionAction } = this.props
      restoreUserSessionAction(client)
    }
  }
  async componentDidMount() {
    await LoadScripts(threeDScripts, this.handleModelLoaded)
  }
  handleModelLoaded = () => {
    const { setLoadingAction } = this.props
    setLoadingAction(false)
  }
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
    const { location, fontsData, loadingModel, user } = this.props
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
        {!loadingModel && (
          <ThreeD
            {...{ designId }}
            detailed={user && user.administrator}
            asImage={true}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const designs = state.get('designs').toJS()
  const responsive = state.get('responsive').toJS()
  const app = state.get('app').toJS()
  return {
    ...app,
    ...designs,
    ...responsive
  }
}
const DesignsEnhance = compose(
  injectIntl,
  getFonts,
  withApollo,
  connect(mapStateToProps, {
    ...designsActions,
    openQuickViewAction,
    restoreUserSessionAction: restoreUserSession
  })
)(Designs)

export default DesignsEnhance
