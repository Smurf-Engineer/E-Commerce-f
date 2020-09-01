/**
 * Options Component - Created by eduardoquintero on 21/01/20.
 */
import * as React from 'react'
import get from 'lodash/get'
import { compose, graphql } from 'react-apollo'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import { withRouter } from 'react-router-dom'
import Radio, { RadioChangeEvent } from 'antd/lib/radio'
import messages from './messages'
import UserFiles from '../UserFiles'
import Modal from '../../Common/JakrooModal'
import AffiliateOptions from '../AffiliateOptions'
import {
  RadioButton,
  BackLabel,
  BackText,
  UserLabel,
  NameLabel,
  StatusLabel,
  EnableSection,
  StyledSwitch,
  StatsLabel,
  Stats,
  StatsTitle,
  StatsValue,
  EditButton,
  FormContainer,
  StyledInput,
  ButtonWrapper,
  StyledButton,
  WarningIcon
} from './styledComponents'
import MyLocker from '../../MyLocker'
import {
  QueryProps,
  DesignNote,
  MessagePayload,
  IProfileSettings,
  Affiliate,
  AffiliateStatus,
  OrderStats
} from '../../../types/common'
import {
  GetDesignNotes,
  addNoteMutation,
  profileSettingsQuery,
  changeAffiliateMutation,
  changeComissionMutation,
  setAffiliateStatusMutation,
  changeNetsuiteInternal
} from '../data'
import ProassistNotes from '../../ProassistNotes'
import { NOTE_FORMAT } from '../constants'
import moment from 'moment'
import { formatAmount } from '../../../utils/utilsFunctions'

const RadioGroup = Radio.Group

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

interface Data extends QueryProps {
  designNotes: DesignNote[]
}

interface Props {
  history: any
  match: any
  data: Data
  optionSelected: number
  designSelected: string
  note: string
  loading: boolean
  canEdit: boolean
  profileData: ProfileData
  pageAffiliate: number
  netsuiteId: string
  openInternalModal: boolean
  enableAffiliate: (variables: {}) => Promise<AffiliateStatus>
  changeNetsuiteId: (variables: {}) => Promise<ProfileData>
  onChangePage: (page: number) => void
  onCloseInternal: () => void
  openInternal: (id: string) => void
  handleOnInternalChange: (value: string) => void
  setLoadingAction: (loading: boolean) => void
  changeComission: (variables: {}) => Promise<Affiliate>
  changeAffiliateStatus: (variables: {}) => Promise<Affiliate>
  addNoteAction: (variables: {}) => Promise<MessagePayload>
  setNoteText: (text: string) => void
  setDesignSelected: (designId?: string) => void
  onChangeSection: (value: boolean) => void
  formatMessage: (messageDescriptor: any) => string
}

class Options extends React.Component<Props> {
  handleOnGoBack = () => {
    const { history } = this.props
    history.push('/admin/users')
  }
  handleSelectSection = (e: RadioChangeEvent) => {
    const { onChangeSection } = this.props
    onChangeSection(e.target.value)
  }
  handleClose = () => {
    const { setDesignSelected } = this.props
    setDesignSelected()
  }
  handleOpenInternal = () => {
    const { profileData, openInternal } = this.props
    const id = get(profileData, 'profileData.userProfile.netsuiteInternal', '')
    openInternal(id)
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { handleOnInternalChange } = this.props
    const {
      currentTarget: { value }
    } = evt
    handleOnInternalChange(value)
  }
  saveNote = async () => {
    const {
      addNoteAction,
      note,
      setDesignSelected,
      designSelected,
      setLoadingAction,
    } = this.props
    try {
      setLoadingAction(true)
      const response = await addNoteAction({
        variables: {
          designId: designSelected,
          text: note,
        },
      })
      setDesignSelected()
      message.success(get(response, 'data.addDesignNote.message', ''))
    } catch (e) {
      setLoadingAction(false)
      message.error(e.message)
    }
  }
  enableAffiliate = async (status: string) => {
    const {
      formatMessage,
      changeAffiliateStatus,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeAffiliateStatus({
          variables: {
            status,
            userId
          },
          update: (store: any, responseData: Affiliate) => {
            const { activatedAt } = get(responseData, 'data.changeAffiliateStatus', {})
            const profileData = store.readQuery({
              query: profileSettingsQuery,
              variables: {
                id: userId
              }
            })
            const affiliateData = get(profileData, 'profileData.affiliate', {})
            affiliateData.status = status
            affiliateData.activatedAt = activatedAt
            store.writeQuery({
              query: profileSettingsQuery,
              data: profileData
            })
          }
        })
        message.success(formatMessage(messages.saved))
      }
    } catch (e) {
      message.error(e.message)
    } finally {
      setLoadingAction(false)
    }
  }
  handleChangeEnabled = async (enabled: boolean) => {
    const {
      match,
      setLoadingAction,
      enableAffiliate
    } = this.props
    try {
      setLoadingAction(true)
      const userId = get(match, 'params.id', '')
      await enableAffiliate({
        variables: {
          enabled,
          userId
        },
        update: (store: any, responseData: AffiliateStatus) => {
          const enabledResponse = get(responseData, 'data.affiliateData.enabled', false)
          const profileData = store.readQuery({
            query: profileSettingsQuery,
            variables: { id: userId },
            fetchPolicy: 'network-only'
          })
          const userProfile = get(profileData, 'profileData.userProfile', {})
          userProfile.affiliateEnabled = enabledResponse
          store.writeQuery({
            query: profileSettingsQuery,
            data: profileData,
            variables: { id: userId }
          })
        }
      })
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      message.error(errorMessage, 5)
    } finally {
      setLoadingAction(false)
    }
  }
  handleSaveInternal = async () => {
    const {
      match,
      formatMessage,
      setLoadingAction,
      onCloseInternal,
      netsuiteId,
      changeNetsuiteId,
    } = this.props
    try {
      setLoadingAction(true)
      const userId = get(match, 'params.id', '')
      await changeNetsuiteId({
        variables: {
          netsuiteId,
          userId
        },
        update: (store: any, responseData: AffiliateStatus) => {
          const netsuiteInternal = get(responseData, 'data.profile.netsuiteInternal', '')
          const profileData = store.readQuery({
            query: profileSettingsQuery,
            variables: { id: userId },
            fetchPolicy: 'network-only'
          })
          const userProfile = get(profileData, 'profileData.userProfile', {})
          userProfile.netsuiteInternal = netsuiteInternal
          store.writeQuery({
            query: profileSettingsQuery,
            data: profileData,
            variables: { id: userId }
          })
        }
      })
      message.success(formatMessage(messages.savedInternal))
      onCloseInternal()
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      message.error(errorMessage, 5)
    } finally {
      setLoadingAction(false)
    }
  }
  handleChangeComission = async (value = 0) => {
    const {
      formatMessage,
      changeComission,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeComission({
          variables: {
            value,
            userId
          },
          update: (store: any) => {
            const profileData = store.readQuery({
              query: profileSettingsQuery,
              variables: {
                id: userId
              }
            })
            const affiliateData = get(profileData, 'profileData.affiliate', {})
            affiliateData.comission = value
            store.writeQuery({
              query: profileSettingsQuery,
              data: profileData
            })
          }
        })
        message.success(formatMessage(messages.saved))
      }
    } catch (e) {
      message.error(e.message)
    } finally {
      setLoadingAction(false)
    }
  }
  render() {
    const {
      formatMessage,
      history,
      match,
      optionSelected,
      profileData,
      note,
      openInternalModal,
      netsuiteId,
      onCloseInternal,
      loading,
      setNoteText,
      onChangePage,
      pageAffiliate: currentPage,
      data,
      designSelected,
      setDesignSelected,
    } = this.props
    const userId = get(match, 'params.id', '')
    const { userProfile = {}, affiliate = {}, stats = {} } = get(profileData, 'profileData', {})
    const { id, firstName, lastName, affiliateEnabled, netsuiteInternal } = userProfile
    const {
      status,
      comission,
      activatedAt,
      paypalAccount,
      region,
      currency,
      file,
    } = affiliate
    const {
      lastOrder,
      amountOrders = []
    } = stats
    const { loading: loadingData, designNotes = [] } = data || {}
    let selectedScreen
    switch (optionSelected) {
      case 0:
        selectedScreen = (
          <MyLocker
            {...{
              setCurrentShare: null,
              openQuickView: null,
              formatMessage,
              history,
              teamStoreId: null,
              savedDesignId: null,
              setItemToAddAction: null,
              openAddToTeamStoreModalAction: null,
              addItemToStore: null,
              setDesignSelected,
              userId,
            }}
            openAddToStoreModal={false}
            onGoBack={this.handleOnGoBack}
            admin={true}
          />
        )
        break
      case 1:
        selectedScreen = (
          <UserFiles {...{ userId, formatMessage }} isAdmin={true} />
        )
        break
      case 2:
        selectedScreen = (
          <AffiliateOptions
            {...{
              formatMessage,
              loading,
              comission,
              activatedAt,
              region,
              currency,
              currentPage,
              onChangePage,
              paypalAccount,
              file,
              history,
              userId,
              status
            }}
            isAdmin={true}
            changeComission={this.handleChangeComission}
            enableAffiliate={this.enableAffiliate}
          />
        )
        break
      default:
        break
    }
    return (
      <div>
        <BackLabel onClick={this.handleOnGoBack}>
          <Icon type="left" />
          <BackText>{formatMessage(messages.backToList)}</BackText>
        </BackLabel>
        {id &&
          <UserLabel>
            <NameLabel>
              {`${id} - ${firstName} ${lastName}`}
            </NameLabel>
            {!!status &&
              <StatusLabel>
                {status}
              </StatusLabel>
            }
          </UserLabel>
        }
        <Stats>
          {(amountOrders.length > 0) &&
            <StatsLabel>
              <StatsTitle>
                {formatMessage(messages.totalSales)}
              </StatsTitle>
              {amountOrders.map(({ total, currency: currencyOrder }: OrderStats, index: number) =>
                <StatsValue secondary={true} key={index}>
                  {`${currencyOrder} ${formatAmount(total)}`}
                </StatsValue>
              )}
            </StatsLabel>
          }
          {!!lastOrder &&
            <StatsLabel>
              <StatsTitle>
                {formatMessage(messages.lastSale)}
              </StatsTitle>
              <StatsValue>
                {moment(lastOrder).format(NOTE_FORMAT)}
              </StatsValue>
            </StatsLabel>
          }
          <EnableSection>
            {formatMessage(messages.showAffiliate)}
            <StyledSwitch
              {...{ loading }}
              checked={affiliateEnabled}
              onChange={this.handleChangeEnabled}
            />
          </EnableSection>
          <StatsLabel>
            <StatsTitle>
              {formatMessage(messages.netsuiteInternal)}
              <EditButton onClick={this.handleOpenInternal}>{formatMessage(messages.edit)}</EditButton>
            </StatsTitle>
            <StatsValue>
              {netsuiteInternal || <WarningIcon type="warning" theme="filled" />}
            </StatsValue>
          </StatsLabel>
        </Stats>
        <RadioGroup
          onChange={this.handleSelectSection}
          value={optionSelected}
          name="usersListOption"
          size="large"
        >
          <RadioButton value={0}>
            {formatMessage(messages.locker)}
          </RadioButton>
          <RadioButton value={1}>
            {formatMessage(messages.files)}
          </RadioButton>
          <RadioButton value={2}>
            {formatMessage(messages.affiliate)}
          </RadioButton>
        </RadioGroup>
        {selectedScreen}
        <Modal
          open={openInternalModal}
          withCross={false}
          withLogo={false}
          width={360}
          title={formatMessage(messages.netsuiteInternal).toUpperCase()}
        >
          <FormContainer>
            <StyledInput
              value={netsuiteId}
              onChange={this.handleInputChange}
            />
          </FormContainer>
          <ButtonWrapper disabled={false}>
            <StyledButton
              {...{ loading }}
              disabled={false}
              onClick={onCloseInternal}
              type="secondary"
            >
              {formatMessage(messages.cancel)}
            </StyledButton>
            <StyledButton
              {...{ loading }}
              disabled={false}
              type="primary"
              onClick={this.handleSaveInternal}
            >
              {formatMessage(messages.save)}
            </StyledButton>
          </ButtonWrapper>
        </Modal>
        <ProassistNotes
          {...{ loadingData, loading, note, designNotes, setNoteText }}
          visible={!!designSelected}
          saveNote={this.saveNote}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}

type OwnProps = {
  designSelected?: string
  match: any
}

const OptionsEnhance = compose(
  withRouter,
  graphql(profileSettingsQuery, {
    options: ({ match }: OwnProps) => {
      const id = match && match.params ? match.params.id : ''
      return {
        variables: { id },
        skip: !id,
        fetchPolicy: 'network-only'
      }
    },
    name: 'profileData'
  }),
  graphql(changeComissionMutation, { name: 'changeComission' }),
  graphql(changeAffiliateMutation, { name: 'changeAffiliateStatus' }),
  graphql(setAffiliateStatusMutation, { name: 'enableAffiliate' }),
  graphql(changeNetsuiteInternal, { name: 'changeNetsuiteId' }),
  graphql(addNoteMutation, { name: 'addNoteAction' }),
  graphql<Data>(GetDesignNotes, {
    options: (ownprops: OwnProps) => {
      const { designSelected } = ownprops
      return {
        variables: {
          designId: designSelected,
        },
        skip: !designSelected,
        fetchPolicy: 'network-only',
      }
    },
  })
)(Options)
export default OptionsEnhance
