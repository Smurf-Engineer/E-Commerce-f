/**
 * ColorChartForm Component - Created by eduardoquintero on 19/03/18.
 */
import * as React from 'react'

import { compose, graphql } from 'react-apollo'
import messages from './messages'
import {
  Container,
  CloseIcon,
  ModalContainer,
  Title,
  FormContainer,
  Label,
  Field,
  Column,
  Submit
} from './styledComponents'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import closeIcon from '../../assets/cancel-button.svg'
import { QuickViewQuery } from './data'
import { FormattedMessage } from 'react-intl'

interface State {
  showDescription: boolean
  showDetails: boolean
  showSpecs: boolean
}

interface Props {
  open: boolean
  handleClose: () => void
  formatMessage: (messageDescriptor: any) => string
}
const { TextArea } = Input

export class ColorChartForm extends React.Component<Props, State> {
  state = {
    showDescription: true,
    showDetails: false,
    showSpecs: false
  }

  render() {
    const { open, handleClose, formatMessage } = this.props

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          width={'auto'}
          destroyOnClose={true}
          afterClose={this.resetState}
          style={{ maxWidth: 800 }}
        >
          <ModalContainer>
            <CloseIcon src={closeIcon} onClick={handleClose} />
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <FormattedMessage {...messages.swatchesShip} />
            <FormContainer>
              <Field>
                <Label>
                  <FormattedMessage {...messages.name} />
                </Label>
                <Input placeholder={formatMessage(messages.namePlaceholder)} />
              </Field>
              <Field>
                <Label>
                  <FormattedMessage {...messages.email} />
                </Label>
                <Input placeholder={formatMessage(messages.emailPlaceholder)} />
              </Field>
              <Field>
                <Label>
                  <FormattedMessage {...messages.phone} />
                </Label>
                <Input placeholder={formatMessage(messages.phonePlaceholder)} />
              </Field>
              <Field>
                <Label>
                  <FormattedMessage {...messages.message} />
                </Label>
                <TextArea placeholder={formatMessage(messages.optional)} />
              </Field>
              <Field>
                <Label>
                  <FormattedMessage {...messages.mailingAddress} />
                </Label>
                <Input
                  placeholder={formatMessage(
                    messages.mailingAddressPlaceholder
                  )}
                />
              </Field>
              <Field>
                <Label>
                  <FormattedMessage {...messages.city} />
                </Label>
                <Input placeholder={formatMessage(messages.cityPlaceholder)} />
              </Field>
              <Field>
                <Label>
                  <FormattedMessage {...messages.state} />
                </Label>
                <Input placeholder={formatMessage(messages.statePlaceholder)} />
              </Field>
              <Field>
                <Column>
                  <Label>
                    <FormattedMessage {...messages.zipCode} />
                  </Label>
                  <Input
                    placeholder={formatMessage(messages.zipCodePlaceholder)}
                  />
                </Column>
                <Column>
                  <Label>
                    <FormattedMessage {...messages.country} />
                  </Label>
                  <Input
                    placeholder={formatMessage(messages.countryPlaceholder)}
                  />
                </Column>
              </Field>
              <Submit>
                <Button type={'primary'} loading={true}>
                  Submit
                </Button>
              </Submit>
            </FormContainer>
          </ModalContainer>
        </Modal>
      </Container>
    )
  }

  resetState = (all = false) => {
    this.setState({
      showDescription: !all,
      showDetails: false,
      showSpecs: false
    })
  }
}

type OwnProps = {
  productId?: number
}

const ColorChartFormEnhance = compose(
  graphql<any>(QuickViewQuery, {
    options: ({ productId }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        variables: { id: productId },
        skip: productId === 0
      }
    }
  })
)(ColorChartForm)

export default ColorChartFormEnhance
