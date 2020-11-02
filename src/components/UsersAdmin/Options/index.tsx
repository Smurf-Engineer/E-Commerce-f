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
  OrderStats,
  Reseller
} from '../../../types/common'
import {
  GetDesignNotes,
  addNoteMutation,
  profileSettingsQuery,
  changeAffiliateMutation,
  changeComissionMutation,
  setAffiliateStatusMutation,
  setResellerStatusMutation,
  changeResellerComissionMutation,
  setResellerEnabledMutation,
  changeResellerMarginMutation,
  changeResellerInlineMutation,
  changeGstMutation,
  changeNetsuiteInternal,
  changeCurrencyMutation,
  changeRegionMutation,
  changeBusinessMutation
} from '../data'
import ProassistNotes from '../../ProassistNotes'
import moment from 'moment'
import { formatAmount } from '../../../utils/utilsFunctions'
import ResellerDetails from '../../ResellerOptions/ResellerDetails'
import { DATE_FORMAT, MESSAGE_TIME } from '../../../constants'

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
  pageReseller: number
  enableReseller: (variables: {}) => Promise<AffiliateStatus>
  netsuiteId: string
  openInternalModal: boolean
  enableAffiliate: (variables: {}) => Promise<AffiliateStatus>
  changeNetsuiteId: (variables: {}) => Promise<ProfileData>
  onChangePage: (page: number) => void
  onChangePageReseller: (page: number) => void
  changeRegionReseller: (variables: {}) => Promise<Reseller>
  onCloseInternal: () => void
  changeCurrencyReseller: (variables: {}) => Promise<Reseller>
  openInternal: (id: string) => void
  handleOnInternalChange: (value: string) => void
  changeBusinessReseller: (variables: {}) => Promise<Reseller>
  setLoadingAction: (loading: boolean) => void
  changeComission: (variables: {}) => Promise<Affiliate>
  changeAffiliateStatus: (variables: {}) => Promise<Affiliate>
  changeGst: (variables: {}) => Promise<Reseller>
  changeResellerComission: (variables: {}) => Promise<Reseller>
  changeResellerMargin: (variables: {}) => Promise<Reseller>
  changeResellerInline: (variables: {}) => Promise<Reseller>
  changeResellerStatus: (variables: {}) => Promise<Reseller>
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
  handleChangeCurrency = async (currency: string) => {
    const {
      formatMessage,
      changeCurrencyReseller,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeCurrencyReseller({
          variables: {
            currency,
            userId
          },
          update: (store: any, responseData: Reseller) => {
            const { currency: currencyResponse } = get(responseData, 'data.changeCurrencyReseller', {})
            const profileData = store.readQuery({
              query: profileSettingsQuery,
              variables: {
                id: userId
              }
            })
            const resellerData = get(profileData, 'profileData.reseller', {})
            resellerData.currency = currencyResponse
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
  handleChangeBusiness = async (business: string) => {
    const {
      formatMessage,
      changeBusinessReseller,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeBusinessReseller({
          variables: {
            business,
            userId
          },
          update: (store: any, responseData: Reseller) => {
            const { businessName } = get(responseData, 'data.changeBusinessReseller', {})
            const profileData = store.readQuery({
              query: profileSettingsQuery,
              variables: {
                id: userId
              }
            })
            const resellerData = get(profileData, 'profileData.reseller', {})
            resellerData.businessName = businessName
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
  handleChangeRegion = async (region: string) => {
    const {
      formatMessage,
      changeRegionReseller,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeRegionReseller({
          variables: {
            region,
            userId
          },
          update: (store: any, responseData: Reseller) => {
            const { stateProvince } = get(responseData, 'data.changeRegionReseller', {})
            const profileData = store.readQuery({
              query: profileSettingsQuery,
              variables: {
                id: userId
              }
            })
            const resellerData = get(profileData, 'profileData.reseller', {})
            resellerData.stateProvince = stateProvince
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
  enableReseller = async (status: string) => {
    const {
      formatMessage,
      changeResellerStatus,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeResellerStatus({
          variables: {
            status,
            userId
          },
          update: (store: any, responseData: Reseller) => {
            const { activatedAt } = get(responseData, 'data.changeResellerStatus', {})
            const profileData = store.readQuery({
              query: profileSettingsQuery,
              variables: {
                id: userId
              }
            })
            const resellerData = get(profileData, 'profileData.reseller', {})
            resellerData.comission = 0
            resellerData.status = status
            resellerData.margin = 0
            resellerData.activatedAt = activatedAt
            resellerData.inline = 0
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
  handleChangeGst = async (value = '') => {
    const {
      formatMessage,
      changeGst,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeGst({
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
            const resellerData = get(profileData, 'profileData.reseller', {})
            resellerData.gst = value
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
  handleResellerComission = async (value = 0) => {
    const {
      formatMessage,
      changeResellerComission,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeResellerComission({
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
            const resellerData = get(profileData, 'profileData.reseller', {})
            resellerData.comission = value
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
  handleResellerMargin = async (value = 0) => {
    const {
      formatMessage,
      changeResellerMargin,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeResellerMargin({
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
            const resellerData = get(profileData, 'profileData.reseller', {})
            resellerData.margin = value
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
  handleResellerInline = async (value = 0) => {
    const {
      formatMessage,
      changeResellerInline,
      setLoadingAction,
      match,
    } = this.props
    try {
      const userId = get(match, 'params.id', '')
      if (userId) {
        setLoadingAction(true)
        await changeResellerInline({
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
            const resellerData = get(profileData, 'profileData.reseller', {})
            resellerData.inline = value
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
          userProfile.resellerEnabled = false
          store.writeQuery({
            query: profileSettingsQuery,
            data: profileData,
            variables: { id: userId }
          })
        }
      })
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      message.error(errorMessage, MESSAGE_TIME)
    } finally {
      setLoadingAction(false)
    }
  }
  handleEnabledReseller = async (enabled: boolean) => {
    const {
      match,
      setLoadingAction,
      enableReseller
    } = this.props
    try {
      setLoadingAction(true)
      const userId = get(match, 'params.id', '')
      await enableReseller({
        variables: {
          enabled,
          userId
        },
        update: (store: any, responseData: AffiliateStatus) => {
          const enabledResponse = get(responseData, 'data.resellerData.enabled', false)
          const profileData = store.readQuery({
            query: profileSettingsQuery,
            variables: { id: userId },
            fetchPolicy: 'network-only'
          })
          const userProfile = get(profileData, 'profileData.userProfile', {})
          userProfile.resellerEnabled = enabledResponse
          userProfile.affiliateEnabled = false
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
      onChangePageReseller,
      pageReseller,
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
    const { userProfile = {}, affiliate = {}, stats = {}, reseller = {} } = get(profileData, 'profileData', {})
    const netsuiteTitle = formatMessage(messages.netsuiteInternal).toUpperCase()
    const { id, firstName, lastName, affiliateEnabled, netsuiteInternal, resellerEnabled } = userProfile
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
      gst,
      stateProvince,
      businessName,
      status: statusReseller,
      comission: comissionReseller,
      activatedAt: activatedReseller,
      paypalAccount: paypalReseller,
      region: regionReseller,
      currency: currencyReseller,
      file: fileReseller,
      margin,
      inline,
    } = reseller
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
      case 3:
        selectedScreen = (
          <ResellerDetails
            {...{
              formatMessage,
              loading,
              history,
              userId,
              gst,
              margin,
              stateProvince,
              businessName,
              inline
            }}
            onChangePage={onChangePageReseller}
            currentPage={pageReseller}
            status={statusReseller}
            comission={comissionReseller}
            activatedAt={activatedReseller}
            paypalAccount={paypalReseller}
            region={regionReseller}
            currency={currencyReseller}
            file={fileReseller}
            isAdmin={true}
            changeBusiness={this.handleChangeBusiness}
            changeRegion={this.handleChangeRegion}
            changeCurrency={this.handleChangeCurrency}
            changeGst={this.handleChangeGst}
            changeComission={this.handleResellerComission}
            changeMargin={this.handleResellerMargin}
            changeInline={this.handleResellerInline}
            enableReseller={this.enableReseller}
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
                {moment(lastOrder).format(DATE_FORMAT)}
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
          <EnableSection>
            {formatMessage(messages.showReseller)}
            <StyledSwitch
              {...{ loading }}
              checked={resellerEnabled}
              onChange={this.handleEnabledReseller}
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
          <RadioButton value={3}>
            {formatMessage(messages.resellerOptions)}
          </RadioButton>
        </RadioGroup>
        {selectedScreen}
        <Modal
          open={openInternalModal}
          withCross={false}
          withLogo={false}
          width={360}
          title={netsuiteTitle}
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
  graphql(changeCurrencyMutation, { name: 'changeCurrencyReseller' }),
  graphql(changeRegionMutation, { name: 'changeRegionReseller' }),
  graphql(changeBusinessMutation, { name: 'changeBusinessReseller' }),
  graphql(changeResellerComissionMutation, { name: 'changeResellerComission' }),
  graphql(changeResellerMarginMutation, { name: 'changeResellerMargin' }),
  graphql(changeResellerInlineMutation, { name: 'changeResellerInline' }),
  graphql(changeAffiliateMutation, { name: 'changeAffiliateStatus' }),
  graphql(setAffiliateStatusMutation, { name: 'enableAffiliate' }),
  graphql(setResellerEnabledMutation, { name: 'enableReseller' }),
  graphql(changeGstMutation, { name: 'changeGst' }),
  graphql(setResellerStatusMutation, { name: 'changeResellerStatus' }),
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
