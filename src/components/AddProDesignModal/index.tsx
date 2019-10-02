/**
 * AddProDesignModal Component - Created by eduardoquintero on 30/09/19.
 */
import * as React from 'react'
import debounce from 'lodash/debounce'
import { withApollo, compose } from 'react-apollo'
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
import { Message, UserSearchResult } from '../../types/common'
import { SelectValue } from 'antd/lib/select'
import { containsNumberAndLetters, containSpaces } from '../../utils/utilsFiles'

interface Props {
  client: any
  visible: boolean
  users: string[]
  designName: string
  legacyNumber: string
  selectedUser: string
  savingDesign: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  requestClose: () => void
  setUsers: (users: string[]) => void
  setSelectedUser: (email: string) => void
  handleOnInputChange: (id: string, value: string) => void
  onSaveDesign: () => void
}

export class AddProDesignModal extends React.Component<Props, {}> {
  debounceSearchProduct = debounce(value => this.handleOnChange(value), 300)

  handleOnChange = async (value: SelectValue) => {
    const {
      client: { query },
      setUsers
    } = this.props
    try {
      const parsedValue = value.toString()

      if (containsNumberAndLetters(parsedValue)) {
        const { data } = await query({
          query: getUsers,
          variables: { pattern: parsedValue.trim() },
          fetchPolicy: 'network-only'
        })

        const users = data.getUserSearch.map(
          (item: UserSearchResult) =>
            `${item.id} - ${item.name} - ${item.email}`
        )
        setUsers(users)
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
      .reverse()[0]
    const parsedValue = emailValue.replace(/ /g, '')
    setSelectedUser(parsedValue)
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { handleOnInputChange } = this.props
    const {
      currentTarget: { id, value }
    } = evt
    if (!containSpaces(value)) {
      handleOnInputChange(id, value)
    }
  }
  render() {
    const {
      formatMessage,
      visible,
      requestClose,
      users,
      designName,
      legacyNumber,
      selectedUser,
      onSaveDesign,
      savingDesign
    } = this.props
    const saveDisabled = !designName || !legacyNumber || !selectedUser
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
            dataSource={users}
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

const AddProDesignModalEnhance = compose(withApollo)(AddProDesignModal)

export default AddProDesignModalEnhance
