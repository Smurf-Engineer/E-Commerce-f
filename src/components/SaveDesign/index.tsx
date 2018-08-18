/**
 * SaveDesign Component - Created by gustavomedina on 21/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import Checkbox from 'antd/lib/checkbox'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import uniq from 'lodash/uniq'
import messages from './messages'
import {
  Container,
  Title,
  Text,
  StyledInput,
  ButtonWrapper,
  Button,
  StyledSaveAs,
  CheckWrapper,
  InputWrapper
} from './styledComponents'
import {
  SaveDesignType,
  Product,
  DesignSaved,
  StitchingColor,
  CanvasType,
  DesignFiles
} from '../../types/common'
import { saveDesignName, saveDesignChanges } from './data'
import { BLUE, GRAY_DISABLE } from '../../theme/colors'

type DesignInput = {
  name?: string
  product_id?: string
  image?: string
  styleId?: number
  canvas?: string
  flatlock?: string
  flatlock_code?: string
  zipper_color?: string
  binding_color?: string
  bib_brace_color?: string
  designFiles?: DesignFiles
}

interface Data {
  id: number
  shortId: string
  name: string
  svg: string
  product: Product
}

interface Props {
  productId: string
  open: boolean
  designName: string
  savedDesignId: string
  colors: string[]
  checkedTerms: boolean
  design: SaveDesignType
  saveDesignLoading: boolean
  saveDesignChangesLoading: boolean
  stitchingColor: StitchingColor
  hasFlatlock: boolean
  hasZipper: boolean
  hasBinding: boolean
  hasBibBrace: boolean
  bindingColor: string
  zipperColor: string
  bibColor: string
  isUserAuthenticated: boolean
  canvas: CanvasType
  requestClose: () => void
  onDesignName: (name: string) => void
  formatMessage: (messageDescriptor: any, values?: {}) => string
  saveDesign: (variables: {}) => void
  saveDesignAs: (variables: {}) => void
  afterSaveDesign: (
    id: string,
    svg: string,
    design: DesignSaved
  ) => void | undefined
  setCheckedTerms: (checked: boolean) => void
  setSaveDesignLoading: (loading: boolean) => void
  setSaveDesignChangesLoading: (loading: boolean) => void
}

export class SaveDesign extends React.Component<Props, {}> {
  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { onDesignName } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    onDesignName(value)
  }

  handleSaveName = async (evt: React.MouseEvent<EventTarget>) => {
    const {
      productId,
      designName,
      colors,
      design,
      formatMessage,
      saveDesign,
      requestClose,
      afterSaveDesign,
      setSaveDesignLoading,
      hasFlatlock,
      hasZipper,
      hasBibBrace,
      hasBinding,
      stitchingColor,
      zipperColor,
      bindingColor,
      bibColor,
      isUserAuthenticated
    } = this.props

    if (!designName) {
      message.error(formatMessage(messages.invalidNameMessage))
      return
    }

    if (!isUserAuthenticated) {
      message.error(formatMessage(messages.invalidUser))
      return
    }

    const { designBase64, canvasJson, styleId } = design
    const designFiles = this.getDesignFiles()
    try {
      const designObj: DesignInput = {
        name: designName,
        product_id: productId,
        image: designBase64,
        styleId,
        canvas: canvasJson,
        designFiles
      }

      /* Accessory colors */
      if (hasFlatlock) {
        designObj.flatlock_code = stitchingColor.name
        designObj.flatlock = stitchingColor.value
      }
      if (hasZipper) {
        designObj.zipper_color = zipperColor
      }
      if (hasBinding) {
        designObj.binding_color = bindingColor
      }
      if (hasBibBrace) {
        designObj.bib_brace_color = bibColor
      }

      setSaveDesignLoading(true)
      const response = await saveDesign({
        variables: { design: designObj, colors }
      })
      const data: Data = get(response, 'data.saveDesign', false)
      setSaveDesignLoading(false)

      if (data) {
        const { shortId, svg } = data
        message.success(formatMessage(messages.saveSuccess, { designName }))
        afterSaveDesign(shortId, svg, data)
        requestClose()
      }
    } catch (error) {
      setSaveDesignLoading(false)
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    }
  }

  handleSaveChanges = async (evt: React.MouseEvent<EventTarget>) => {
    const {
      colors,
      productId,
      savedDesignId,
      formatMessage,
      saveDesignAs,
      requestClose,
      design,
      setSaveDesignChangesLoading,
      hasFlatlock,
      hasZipper,
      hasBibBrace,
      hasBinding,
      stitchingColor,
      zipperColor,
      bindingColor,
      bibColor,
      afterSaveDesign,
      designName
    } = this.props

    console.log('---------------------------')
    console.log(design)
    console.log('---------------------------')

    if (design) {
      return
    }

    const designFiles = this.getDesignFiles()
    const { designBase64, canvasJson, styleId } = design
    const designObj: DesignInput = {
      name: '',
      product_id: productId,
      image: designBase64,
      canvas: canvasJson,
      styleId,
      designFiles
    }

    try {
      /* Accessory colors  */
      if (hasFlatlock) {
        designObj.flatlock_code = stitchingColor.name
        designObj.flatlock = stitchingColor.value
      }
      if (hasZipper) {
        designObj.zipper_color = zipperColor
      }
      if (hasBinding) {
        designObj.binding_color = bindingColor
      }
      if (hasBibBrace) {
        designObj.bib_brace_color = bibColor
      }

      setSaveDesignChangesLoading(true)
      const response = await saveDesignAs({
        variables: { designId: savedDesignId, designObj, colors }
      })

      const data: Data = get(response, 'data.saveDesignAs', false)
      setSaveDesignChangesLoading(false)

      if (data) {
        const { svg } = data
        message.success(formatMessage(messages.saveSuccess, { designName }))
        afterSaveDesign(savedDesignId, svg, data)
        requestClose()
      }
    } catch (error) {
      setSaveDesignChangesLoading(false)
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    }
  }

  toggleChecked = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { setCheckedTerms } = this.props
    const { checked } = evt.target
    setCheckedTerms(checked)
  }

  getDesignFiles = () => {
    const {
      canvas: { image, path }
    } = this.props
    const files: number[] = []
    const svgs: number[] = []
    // tslint:disable:curly
    forEach(image, img => {
      const { fileId } = img
      if (fileId) files.push(fileId)
    })
    forEach(path, pth => {
      const { fileId } = pth
      if (fileId) svgs.push(fileId)
    })
    // tslint:enable:curly

    return {
      files: uniq(files),
      svgs: uniq(svgs)
    }
  }

  render() {
    const {
      open,
      formatMessage,
      designName,
      savedDesignId,
      checkedTerms,
      saveDesignLoading,
      saveDesignChangesLoading
    } = this.props

    const disabledSaveButton =
      !checkedTerms || !designName || saveDesignChangesLoading

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          maskClosable={true}
          width={'25%'}
          destroyOnClose={true}
          onCancel={this.handleCancel}
        >
          <Title>
            <FormattedMessage {...messages.modalTitle} />
          </Title>
          {!!savedDesignId ? (
            <StyledSaveAs>
              <Text>
                <FormattedMessage {...messages.modalSaveAsNewDesign} />
              </Text>
            </StyledSaveAs>
          ) : (
            <Text>
              <FormattedMessage {...messages.modalText} />
            </Text>
          )}
          <InputWrapper>
            <StyledInput
              id="saveDesignName"
              value={designName}
              placeholder={formatMessage(messages.placeholder)}
              onChange={this.handleInputChange}
              maxLength="15"
            />
          </InputWrapper>
          <CheckWrapper>
            <Checkbox onChange={this.toggleChecked}>
              {formatMessage(messages.checkCopyright)}
            </Checkbox>
          </CheckWrapper>
          {!!savedDesignId && (
            <ButtonWrapper color="">
              <Button
                type="ghost"
                disabled={!checkedTerms || saveDesignLoading}
                onClick={this.handleSaveChanges}
                loading={saveDesignChangesLoading}
              >
                {formatMessage(messages.saveChanges)}
              </Button>
            </ButtonWrapper>
          )}
          <ButtonWrapper color={disabledSaveButton ? GRAY_DISABLE : BLUE}>
            <Button
              type="primary"
              disabled={disabledSaveButton}
              onClick={this.handleSaveName}
              loading={saveDesignLoading}
            >
              {savedDesignId !== ''
                ? formatMessage(messages.modalSaveAsNewDesign)
                : formatMessage(messages.save)}
            </Button>
          </ButtonWrapper>
        </Modal>
      </Container>
    )
  }
}

const SaveDesignEnhance = compose(
  saveDesignName,
  saveDesignChanges
)(SaveDesign)
export default SaveDesignEnhance
