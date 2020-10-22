/**
 * StartDesignModal Component - Created by eduardoquintero on 19/10/20.
 */
import * as React from 'react'
import debounce from 'lodash/debounce'
import message from 'antd/lib/message'
import messages from './messages'
import {
  Container,
  Title
} from './styledComponents'
import ProDesignImg from '../../assets/Jakroo_Pro.png'
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
export class StartDesignModal extends React.Component<Props, {}> {
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
      requestClose
    } = this.props

    return (
      <Container>
        <CustomModal
          open={true}
          withLogo={false}
          width={'684px'}
          requestClose={requestClose}
        >
          <Title>{formatMessage(messages.title)}</Title>
          <img src={ProDesignImg} />
        </CustomModal>
      </Container>
    )
  }
}

export default StartDesignModal
