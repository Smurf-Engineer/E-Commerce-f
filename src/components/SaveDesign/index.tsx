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
  InputWrapper,
  SpinWrapper,
  StyledSpin
} from './styledComponents'
import {
  SaveDesignType,
  StitchingColor,
  CanvasType,
  DesignFiles,
  SaveDesignData,
  Message
} from '../../types/common'
import { NEW_DESIGN_SAVED } from '../../constants'
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
  isMobile?: boolean
  automaticSave?: boolean
  productMpn?: string
  requestClose: () => void
  onDesignName: (name: string) => void
  formatMessage: (messageDescriptor: Message, values?: any) => string
  saveDesign: (variables: {}) => void
  saveDesignAs: (variables: {}) => void
  afterSaveDesign: (
    id: string,
    svg: string,
    design: SaveDesignData,
    updateColors?: boolean,
    goToCart?: boolean
  ) => void | undefined
  setCheckedTerms: (checked: boolean) => void
  setSaveDesignLoading: (loading: boolean) => void
  setSaveDesignChangesLoading: (loading: boolean) => void
  goToCustomProductPage: (designId: string) => void
  setAutomaticSave: (automaticSave: boolean) => void
}

interface State {
  automaticSave: boolean
}
export class SaveDesign extends React.Component<Props, State> {
  state = { automaticSave: false }

  componentWillReceiveProps(nextProps: any) {
    const { setAutomaticSave } = this.props
    const { automaticSave } = nextProps
    if (automaticSave) {
      setAutomaticSave(false)
      this.setState({ automaticSave: true }, () => {
        this.handleSaveName()
      })
    }
  }
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

  handleSaveName = async () => {
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
      goToCustomProductPage,
      isMobile,
      productMpn
    } = this.props
    const { automaticSave } = this.state
    if (!designName && !automaticSave) {
      message.error(formatMessage(messages.invalidNameMessage))
      return
    }
    if (!isUserAuthenticated) {
      message.error(formatMessage(messages.invalidUser))
      return
    }
    const { designBase64, canvasJson, styleId } = design
    try {
      const finalDesignName = designName || productMpn
      const designObj: DesignInput = {
        name: finalDesignName,
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
          const { shortId, svg, designName: savedDesignName } = savedDesign
          message.success(
            formatMessage(messages.saveSuccess, { designName: savedDesignName })
          )
          if (!isEditing && !savedDesignId) {
            window.dataLayer.push({
              event: NEW_DESIGN_SAVED,
              label: savedDesignName
            })
            if (!isMobile) {
              afterSaveDesign(shortId, svg, savedDesign, true)
            } else {
              afterSaveDesign(shortId, svg, savedDesign, true, automaticSave)
            }
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
      saveDesignChangesLoading,
      isMobile
    } = this.props
    const { automaticSave } = this.state
    const disabledSaveButton =
      (!isMobile && !checkedTerms) || !designName || saveDesignChangesLoading

    return (
      <Container>
        {!automaticSave ? (
          <Modal
            visible={open}
            footer={null}
            closable={false}
            maskClosable={true}
            destroyOnClose={true}
            width={isMobile ? 'auto' : '25%'}
            onCancel={this.handleCancel}
          >
            <Title>
              {!isMobile ? (
                <FormattedMessage {...messages.modalTitle} />
              ) : (
                <FormattedMessage {...messages.mobileModalTitle} />
              )}
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
            {!isMobile && (
              <CheckWrapper>
                <Checkbox value={checkedTerms} onChange={this.toggleChecked}>
                  {formatMessage(messages.checkCopyright)}
                </Checkbox>
              </CheckWrapper>
            )}
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
        ) : (
          <SpinWrapper>
            <StyledSpin tip={formatMessage(messages.saving)} />
          </SpinWrapper>
        )}
      </Container>
    )
  }
}

const SaveDesignEnhance = compose(
  saveDesignName,
  saveDesignChanges
)(SaveDesign)
export default SaveDesignEnhance
