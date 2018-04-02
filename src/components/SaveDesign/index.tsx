/**
 * SaveDesign Component - Created by gustavomedina on 21/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  Title,
  Text,
  StyledInput,
  ButtonWrapper,
  Button
} from './styledComponents'
import { saveDesignName } from './data'

interface Props {
  productId: string
  open: boolean
  designName: string
  savedDesignId: number
  colors: string[]
  requestClose: () => void
  onDesignName: (name: string) => void
  formatMessage: (messageDescriptor: any) => string
  saveDesignNameMutation: (variables: {}) => void
  afterSaveDesign: (id: number) => void | undefined
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
      formatMessage,
      saveDesignNameMutation,
      requestClose,
      afterSaveDesign
    } = this.props

    if (!designName) {
      message.error(formatMessage(messages.invalidNameMessage))
      return
    }

    if (!localStorage.getItem('user')) {
      message.error(formatMessage(messages.invalidUser))
      return
    }

    try {
      const designObj = {
        name: designName,
        product_id: productId,
        // TODO: REMOVE ID
        user_id: 1
      }

      const response = await saveDesignNameMutation({
        variables: { design: designObj, colors }
      })
      const data = get(response, 'data.saveDesign', false)

      if (data) {
        const { shortId } = data
        message.success(formatMessage(messages.saveSuccess))
        afterSaveDesign(shortId)
        requestClose()
      }
    } catch (error) {
      const errorMessage =
        error.graphQLErrors.map((x: any) => x.message) || error.message
      message.error(errorMessage)
      console.error(error)
    }
  }

  render() {
    const { open, formatMessage, designName, savedDesignId } = this.props
    if (savedDesignId !== 0) {
      console.log('-----------diferente de 0----------')
    }
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
          <Text>
            <FormattedMessage {...messages.modalText} />
          </Text>
          <StyledInput
            id="saveDesignName"
            value={designName}
            placeholder={formatMessage(messages.placeholder)}
            onChange={this.handleInputChange}
          />
          <ButtonWrapper>
            <Button type="primary" onClick={this.handleSaveName}>
              <FormattedMessage {...messages.save} />
            </Button>
          </ButtonWrapper>
        </Modal>
      </Container>
    )
  }
}

const SaveDesignEnhance = compose(saveDesignName)(SaveDesign)
export default SaveDesignEnhance
