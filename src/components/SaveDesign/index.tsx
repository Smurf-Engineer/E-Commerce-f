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
import { SaveDesignType } from '../../types/common'
import { saveDesignName, saveDesignChanges } from './data'

interface Data {
  id: number
  shortId: string
  name: string
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
  requestClose: () => void
  onDesignName: (name: string) => void
  formatMessage: (messageDescriptor: any, values?: {}) => string
  saveDesignNameMutation: (variables: {}) => void
  saveDesignChangesMutation: (variables: {}) => void
  afterSaveDesign: (id: string) => void | undefined
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
    const { currentTarget: { value } } = evt
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
      setSaveDesignLoading
    } = this.props

    if (!designName) {
      message.error(formatMessage(messages.invalidNameMessage))
      return
    }

    if (!localStorage.getItem('user')) {
      message.error(formatMessage(messages.invalidUser))
      return
    }

    const { designBase64, canvasSvg, canvasJson, styleId } = design

    try {
      const designObj = {
        name: designName,
        product_id: productId,
        image: designBase64,
        styleId,
        canvas: canvasJson,
        svg: canvasSvg
      }

      setSaveDesignLoading(true)
      const response = await saveDesignNameMutation({
        variables: { design: designObj, colors }
      })
      const data: Data = get(response, 'data.saveDesign', false)
      setSaveDesignLoading(false)

      if (data) {
        const { shortId } = data
        message.success(formatMessage(messages.saveSuccess, { designName }))
        afterSaveDesign(shortId)
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
      savedDesignId,
      formatMessage,
      saveDesignChangesMutation,
      requestClose,
      design,
      setSaveDesignLoading
    } = this.props

    const designObj = {
      name: '',
      product_id: 0,
      image: design.designBase64
    }

    try {
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

const SaveDesignEnhance = compose(saveDesignName, saveDesignChanges)(SaveDesign)
export default SaveDesignEnhance
