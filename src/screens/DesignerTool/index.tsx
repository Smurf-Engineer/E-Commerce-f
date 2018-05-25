/**
 * DesignerTool Screen - Created by david on 08/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import CustomizeTab from './DesignCenterCustomize'
import * as designerToolActions from './actions'
import * as designerToolApi from './api'
import { Container } from './styledComponents'
import { ModelConfig } from '../../types/common'

interface Props {
  colors: string[]
  styleColors: string[]
  areas: string[]
  colorBlock: number
  colorBlockHovered: number
  loadingModel: boolean
  uploadingFiles: boolean
  modelConfig: ModelConfig
  // Redux Actions
  setLoadingAction: (loading: boolean) => void
  setColorAction: (color: string) => void
  setColorBlockAction: (index: number) => void
  setHoverColorBlockAction: (index: number) => void
  uploadFilesAction: (files: any) => void
  uploadDesignAction: (files: any) => void
  setUploadingAction: (loading: boolean) => void
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
      uploadFilesAction,
      uploadDesignAction,
      uploadingFiles,
      modelConfig,
      areas
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
            uploadingFiles,
            areas
          }}
          files={modelConfig}
          onLoadModel={setLoadingAction}
          onSelectColorBlock={setColorBlockAction}
          onHoverColorBlock={setHoverColorBlockAction}
          onSelectColor={setColorAction}
          onUploadFiles={uploadFilesAction}
          onUploadDesign={uploadDesignAction}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('designerTool').toJS()

const DesignerToolEnhance = compose(
  connect(mapStateToProps, { ...designerToolActions, ...designerToolApi })
)(DesignerTool)

export default DesignerToolEnhance
