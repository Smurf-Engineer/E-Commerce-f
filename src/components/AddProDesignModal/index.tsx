/**
 * AddProDesignModal Component - Created by eduardoquintero on 30/09/19.
 */
import * as React from 'react'
import debounce from 'lodash/debounce'
import { compose, graphql } from 'react-apollo'
import { getUsers } from './data'
import message from 'antd/lib/message'
import messages from './messages'
import {
  Container,
  Title,
  ButtonWrapper,
  StyledButton,
  StyledSearch,
  Label,
  StyledInput,
  SearchButton
} from './styledComponents'
import Icon from 'antd/lib/icon'
import CustomModal from '../Common/JakrooModal'
import { Message, UserSearchResult, QueryProps } from '../../types/common'
import { SelectValue } from 'antd/lib/select'
import { containsNumberAndLetters, containSpaces } from '../../utils/utilsFiles'

interface Props {
  visible: boolean
  designName: string
  legacyNumber: string
  selectedUser: string
  savingDesign: boolean
  userToSearch: string
  data: Data
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  requestClose: () => void
  setSelectedUser: (email: string) => void
  handleOnInputChange: (id: string, value: string) => void
  onSaveDesign: () => void
  setUserToSearch: (value: string) => void
}

interface Data extends QueryProps {
  userSearch: UserSearchResult[]
}
export class AddProDesignModal extends React.Component<Props, {}> {
  debounceSearchProduct = debounce(value => this.handleOnChange(value), 300)

  handleOnChange = async (value: SelectValue) => {
    const { setUserToSearch } = this.props
    try {
      const parsedValue = value.toString()

      if (containsNumberAndLetters(parsedValue)) {
        setUserToSearch(parsedValue.trim())
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  handleOnSelect = async (value: SelectValue) => {
    const { setSelectedUser } = this.props
    const emailValue = value
      .toString()
      .split(' -')
      .reverse()
      .shift()
    const parsedValue = emailValue.replace(/ /g, '')
    setSelectedUser(parsedValue)
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { handleOnInputChange } = this.props
    const {
      currentTarget: { id, value }
    } = evt
    if (id !== 'designName') {
      if (!containSpaces(value)) {
        handleOnInputChange(id, value)
      }
    } else {
      handleOnInputChange(id, value)
    }
  }
  render() {
    const {
      formatMessage,
      visible,
      requestClose,
      designName,
      legacyNumber,
      selectedUser,
      onSaveDesign,
      savingDesign,
      data
    } = this.props
    const saveDisabled = !designName || !legacyNumber || !selectedUser
    const searchResults =
      data &&
      !data.loading &&
      data.userSearch.map(
        (item: UserSearchResult) => `${item.id} - ${item.name} - ${item.email}`
      )
    return (
      <Container>
        <CustomModal
          open={visible}
          withLogo={false}
          width={'684px'}
          requestClose={requestClose}
        >
          <Title>{formatMessage(messages.title)}</Title>
          <Label>{formatMessage(messages.designName)}</Label>
          <StyledInput
            id={'designName'}
            placeholder={formatMessage(messages.name)}
            onChange={this.handleInputChange}
            value={designName}
          />
          <Label>{formatMessage(messages.legacyNumber)}</Label>
          <StyledInput
            id={'legacyNumber'}
            placeholder={formatMessage(messages.legacySample)}
            onChange={this.handleInputChange}
            value={legacyNumber}
          />
          <Label>{formatMessage(messages.selectUser)}</Label>
          <StyledSearch
            onChange={this.debounceSearchProduct}
            dataSource={searchResults}
            onSelect={this.handleOnSelect}
            placeholder={formatMessage(messages.searchBy)}
          >
            <StyledInput
              suffix={
                <SearchButton className="search-btn" size="large" type="ghost">
                  <Icon type="search" />
                </SearchButton>
              }
            />
          </StyledSearch>
          <ButtonWrapper disabled={saveDisabled}>
            <StyledButton
              loading={savingDesign}
              disabled={saveDisabled}
              type="primary"
              onClick={onSaveDesign}
            >
              {formatMessage(messages.saveDesign)}
            </StyledButton>
          </ButtonWrapper>
        </CustomModal>
      </Container>
    )
  }
}

type OwnProps = {
  userToSearch?: string
}

const AddProDesignModalEnhance = compose(
  graphql<Data>(getUsers, {
    options: (ownprops: OwnProps) => {
      const { userToSearch } = ownprops
      return {
        variables: {
          pattern: userToSearch
        },
        skip: !userToSearch,
        fetchPolicy: 'network-only'
      }
    }
  })
)(AddProDesignModal)

export default AddProDesignModalEnhance
