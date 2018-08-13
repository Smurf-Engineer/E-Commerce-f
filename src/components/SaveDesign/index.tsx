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
import messages from './messages'
import {
  Container,
  Title,
  Text,
  StyledInput,
  ButtonWrapper,
  Button,
  StyledSaveAs,
  CheckWrapper
} from './styledComponents'
import {
  SaveDesignType,
  Product,
  DesignSaved,
  StitchingColor
} from '../../types/common'
import { saveDesignName, saveDesignChanges } from './data'

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
  stitchingColor: StitchingColor
  hasFlatlock: boolean
  hasZipper: boolean
  hasBinding: boolean
  hasBibBrace: boolean
  bindingColor: string
  zipperColor: string
  bibColor: string
  requestClose: () => void
  onDesignName: (name: string) => void
  formatMessage: (messageDescriptor: any, values?: {}) => string
  saveDesignNameMutation: (variables: {}) => void
  saveDesignChangesMutation: (variables: {}) => void
  afterSaveDesign: (
    id: string,
    svg: string,
    design: DesignSaved
  ) => void | undefined
  setCheckedTerms: (checked: boolean) => void
  setSaveDesignLoading: (loading: boolean) => void
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
      saveDesignNameMutation,
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
      bibColor
    } = this.props

    if (!designName) {
      message.error(formatMessage(messages.invalidNameMessage))
      return
    }

    if (!localStorage.getItem('user')) {
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

      setSaveDesignLoading(true)
      const response = await saveDesignNameMutation({
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
      saveDesignChangesMutation,
      requestClose,
      design,
      setSaveDesignLoading,
      hasFlatlock,
      hasZipper,
      hasBibBrace,
      hasBinding,
      stitchingColor,
      zipperColor,
      bindingColor,
      bibColor
    } = this.props

    const designObj: DesignInput = {
      name: '',
      product_id: productId,
      image: design.designBase64
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

      setSaveDesignLoading(true)
      const response = await saveDesignChangesMutation({
        variables: { designId: savedDesignId, designObj, colors }
      })
      const data = get(response, 'data.saveDesignAs', false)
      setSaveDesignLoading(false)

      if (data) {
        message.success(formatMessage(messages.saveSuccess))
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
      saveDesignLoading
    } = this.props
    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          maskClosable={true}
          width={'30%'}
          destroyOnClose={true}
          onCancel={this.handleCancel}
        >
          <Title>
            <FormattedMessage {...messages.modalTitle} />
          </Title>
          {savedDesignId !== '' ? (
            <StyledSaveAs>
              <ButtonWrapper>
                <Button
                  type="primary"
                  disabled={!checkedTerms}
                  onClick={this.handleSaveChanges}
                  loading={saveDesignLoading}
                >
                  <FormattedMessage {...messages.saveChanges} />
                </Button>
              </ButtonWrapper>
              <Text>
                <FormattedMessage {...messages.modalSaveAsNewDesign} />
              </Text>
            </StyledSaveAs>
          ) : (
            <Text>
              <FormattedMessage {...messages.modalText} />
            </Text>
          )}
          <StyledInput
            id="saveDesignName"
            value={designName}
            placeholder={formatMessage(messages.placeholder)}
            onChange={this.handleInputChange}
            maxLength="15"
          />
          <CheckWrapper>
            <Checkbox onChange={this.toggleChecked}>
              {formatMessage(messages.checkCopyright)}
            </Checkbox>
          </CheckWrapper>
          <ButtonWrapper>
            <Button
              type="primary"
              disabled={!checkedTerms}
              onClick={this.handleSaveName}
              loading={saveDesignLoading}
            >
              {savedDesignId !== '' ? (
                <FormattedMessage {...messages.modalSaveAsNewDesign} />
              ) : (
                <FormattedMessage {...messages.save} />
              )}
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
