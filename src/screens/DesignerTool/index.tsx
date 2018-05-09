/**
 * DesignerTool Screen - Created by david on 08/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import CustomizeTab from './DesignCenterCustomize'
import * as designerToolActions from './actions'
import { Container } from './styledComponents'

interface Props {
  colors: string[]
  styleColors: string[]
  colorBlock: number
  colorBlockHovered: number
  loadingModel: boolean
  files: string[]
  // Redux Actions
  setLoadingAction: (loading: boolean) => void
  setColorAction: (color: string) => void
  setColorBlockAction: (index: number) => void
  setHoverColorBlockAction: (index: number) => void
}

export class DesignerTool extends React.Component<Props, {}> {
  render() {
    const {
      colors,
      styleColors,
      colorBlock,
      colorBlockHovered,
      setLoadingAction,
      loadingModel,
      setColorAction,
      setColorBlockAction,
      setHoverColorBlockAction,
      files
    } = this.props
    return (
      <Container>
        <CustomizeTab
          {...{
            colors,
            styleColors,
            colorBlock,
            colorBlockHovered,
            loadingModel,
            files
          }}
          onLoadModel={setLoadingAction}
          onSelectColorBlock={setColorBlockAction}
          onHoverColorBlock={setHoverColorBlockAction}
          onSelectColor={setColorAction}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('designerTool').toJS()

const DesignerToolEnhance = compose(
  connect(mapStateToProps, { ...designerToolActions })
)(DesignerTool)

export default DesignerToolEnhance
