/**
 * ConfirmCountryDialog Component - Created by gustavomedina on 05/07/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import Select from 'antd/lib/select'
import {
  Title,
  ModalContent,
  StyledSelect,
  ButtonWrapper,
  Button
} from './styledComponents'
import { QueryProps, CountrySubsidiary } from '../../types/common'
import messages from './messages'
import Modal from '../Common/JakrooModal'
import { subsidiaryQuery } from './data'

const Option = Select.Option

interface Data extends QueryProps {
  countriesSubsidiaries: CountrySubsidiary[]
}
interface Props {
  data: Data
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
  open: boolean
  onSave: (countryCode: string | null) => void
}

export class ConfirmCountryDialog extends React.Component<Props, {}> {
  state = {
    countryCode: null
  }

  handleChange = (value: any) => {
    this.setState({
      countryCode: value
    })
  }

  handleSave = () => {
    const { onSave } = this.props
    const { countryCode } = this.state
    onSave(countryCode)
  }

  render() {
    const { open, requestClose, formatMessage, data } = this.props
    const { countriesSubsidiaries, error, loading } = data
    const { countryCode } = this.state

    const countries = !error && !loading ? countriesSubsidiaries : []

    const countryItems = countries.map(
      ({ countryCode: code, country }, index) => {
        return (
          <Option key={index} value={code}>
            {country}
          </Option>
        )
      }
    )

    return (
      <Modal {...{ open, requestClose }} width={'25%'} withLogo={false}>
        <ModalContent>
          <Title>{formatMessage(messages.title)}</Title>
          <StyledSelect
            showSearch={false}
            placeholder={formatMessage(messages.placeholder)}
            onChange={this.handleChange}
          >
            {countryItems}
          </StyledSelect>
          <ButtonWrapper>
            <Button
              disabled={!countryCode}
              type="primary"
              onClick={this.handleSave}
            >
              {formatMessage(messages.save)}
            </Button>
          </ButtonWrapper>
        </ModalContent>
      </Modal>
    )
  }
}

const ConfirmCountryDialogEnhance = compose(
  graphql<Data>(subsidiaryQuery, {
    options: () => ({
      fetchPolicy: 'network-only'
    })
  })
)(ConfirmCountryDialog)

export default ConfirmCountryDialogEnhance
