/**
 * SaveDesign Component - Created by gustavomedina on 21/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import Checkbox from 'antd/lib/checkbox'
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
  StitchingColor,
  CanvasType,
  DesignFiles,
  SaveDesignData
} from '../../types/common'
import { saveDesignName, saveDesignChanges } from './data'
import { getDesignQuery } from '../../screens/DesignCenter/data'
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
  canvas_files?: string
}

interface Data {
  data: {
    savedDesign: SaveDesignData
  }
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
  isEditing: boolean
  canvas: CanvasType
  requestClose: () => void
  onDesignName: (name: string) => void
  formatMessage: (messageDescriptor: any, values?: {}) => string
  saveDesign: (variables: {}) => void
  saveDesignAs: (variables: {}) => void
  afterSaveDesign: (
    id: string,
    svg: string,
    design: SaveDesignData,
    updateColors?: boolean
  ) => void | undefined
  setCheckedTerms: (checked: boolean) => void
  setSaveDesignLoading: (loading: boolean) => void
  setSaveDesignChangesLoading: (loading: boolean) => void
  goToCustomProductPage: (designId: string) => void
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
      isUserAuthenticated,
      isEditing,
      savedDesignId,
      goToCustomProductPage
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
    try {
      const designObj: DesignInput = {
        name: designName,
        product_id: productId,
        image: designBase64,
        styleId,
        canvas: canvasJson
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
      await saveDesign({
        variables: { design: designObj, colors },
        update: (store: any, { data: { savedDesign } }: Data) => {
          const { shortId, svg } = savedDesign
          message.success(formatMessage(messages.saveSuccess, { designName }))
          if (!isEditing && !savedDesignId) {
            afterSaveDesign(shortId, svg, savedDesign, true)
          } else {
            goToCustomProductPage(shortId)
          }
          requestClose()
        }
      })
      setSaveDesignLoading(false)
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
      isEditing
    } = this.props

    const { designBase64, canvasJson, styleId } = design
    const designObj: DesignInput = {
      name: '',
      product_id: productId,
      image: designBase64,
      canvas: canvasJson,
      styleId
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
      await saveDesignAs({
        variables: { designId: savedDesignId, designObj, colors },
        update: (store: any, { data: { savedDesign } }: Data) => {
          const {
            svg,
            designName,
            canvas,
            bibBraceColor,
            bindingColor: updatedBindingColor,
            flatlockCode,
            flatlockColor,
            zipperColor: updatedZipperColor
          } = savedDesign
          if (isEditing) {
            const data = store.readQuery({
              query: getDesignQuery,
              variables: { designId: savedDesignId }
            })
            data.designData.canvas = canvas
            data.designData.bibBraceColor = bibBraceColor
            data.designData.bindingColor = updatedBindingColor
            data.designData.flatlockCode = flatlockCode
            data.designData.flatlockColor = flatlockColor
            data.designData.zipperColor = updatedZipperColor
            store.writeQuery({
              query: getDesignQuery,
              variables: { designId: savedDesignId },
              data
            })
          }
          message.success(formatMessage(messages.saveSuccess, { designName }))
          afterSaveDesign(savedDesignId, svg, savedDesign, !isEditing)
          requestClose()
        }
      })
      setSaveDesignChangesLoading(false)
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
            <Checkbox value={checkedTerms} onChange={this.toggleChecked}>
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
