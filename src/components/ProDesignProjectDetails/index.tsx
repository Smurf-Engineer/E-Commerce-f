import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { compose, withApollo, graphql } from 'react-apollo'
import ProductThumbnail from '../ProductThumbnail'
import { deleteProItemMutation, GetColorsQuery, getProDesignProject, sendInvitationsMutation } from './data'
import moment from 'moment'
import parse from 'html-react-parser'
import Spin from 'antd/lib/spin'
import Icon from 'antd/lib/icon'
import get from 'lodash/get'
import {
  Container,
  Text,
  StrongText,
  Column,
  Row,
  MainContainer,
  Notes,
  Ideas,
  Inspiration,
  ImageContainer,
  Image,
  Images,
  Color,
  Files,
  ImageText,
  Products,
  BackContainer,
  SpinContainer,
  InspirationName,
  PaletteName,
  AddProductButton,
  AddLabel,
  DocIcon,
  LoadingContainer,
  ModalTitle,
  InfoBody,
  cancelButtonStyle,
  buttonStyle,
  MailLink,
  CollapsePanel,
  PanelDiv,
  TitleDiv,
  ProjectDescriptor,
  ProjectContainer,
  LockerGrid,
  Designs,
  LogoImage,
  CircleMember,
  MemberList,
  PopoverText,
  PopOverValue,
  StyledPopOver,
  AddMemberButton,
  ColumnSmall,
  BottomSection,
  CancelInvitation,
  ConfirmBottom,
  ConfirmEmailTags,
  CopyLinkButton,
  EmailsLabel,
  GearIcon,
  InfoConfirmation,
  InfoIconLink,
  InviteContainer,
  InviteLink,
  InviteLinkLabel,
  InviteTitle,
  MailsContainer,
  SendInvitationButton,
  StyledEmailTags,
  StyledSpinInvitation
} from './styledComponents'
import { getFileExtension, getFileNameFromUrl } from '../../utils/utilsFiles'
import ColorBar from '../ColorBar'
import messages from './messages'
import { Message, InspirationType, ColorsDataResult, ProDesignItem, MessagePayload, User } from '../../types/common'
import {
  CUSTOMER_APPROVED,
  CUSTOMER_PREVIEW,
  DATE_FORMAT,
  DOCX_TYPE,
  DOC_TYPE,
  PDF_TYPE,
  POSTSCRIPT_TYPE,
  ZIP_TYPE
} from '../../constants'
import aiLogo from '../../assets/ailogo.png'
import epsLogo from '../../assets/epslogo.png'
import { InspirationTag } from '../../screens/IntakeForm/constants'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import ProductThumbnailStore from '../ProductThumbnailStore'
import { memberColors } from '../ProDesignProjects/constants'
import { InjectedIntl } from 'react-intl'
import config from '../../config'

const { confirm } = Modal
const docTypes = [DOC_TYPE, ZIP_TYPE, DOCX_TYPE, PDF_TYPE]

const LIMIT_PRODUCTS = 25

interface Props extends RouteComponentProps<any> {
  history: History
  intl:  InjectedIntl
  inspiration: InspirationType[]
  project: number
  data: any
  colorsList: ColorsDataResult
  sendInvitations: (variables: {}) => Promise<MessagePayload>
  deleteProItem: (variables: {}) => Promise<MessagePayload>
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToPage: (page: number) => void
  onOpenQuickView: (id: number, yotpoId: string, gender: number) => void
  goBack: () => void
}

export class Review extends React.Component<Props, {}> {
  state = {
    deleting: false,
    openInviteModal: false,
    showConfirmInvites: false,
    items: [],
    value: '',
    error: null,
    savingInvitations: false
  }
  private emailInput: any
  handleGoItem = (id: number) => {
    const { history } = this.props
    history.push(`/approval?id=${id}`)
  }
  addNewProduct = () => {
    const { history, data } = this.props
    const id = get(data, 'project.shortId', '')
    if (id) {
      history.push(`/pro-design?id=${id}`)
    }
  }

  sendInvitationsAction = async () => {
    const {
      formatMessage,
      sendInvitations,
      data,
    } = this.props
    try {
      const projectId = get(data, 'project.shortId', '')
      const projectItemId = get(data, 'project.designs[0].id', '')
      if (!!projectId) {
        const { items: emails } = this.state
        this.setState({ savingInvitations: true })
        await sendInvitations({ variables: { projectId, emails, projectItemId } })
        data.refetch()
        message.success(formatMessage(messages.invitationsSent))
        this.closeInviteModal()
      }
    } catch (e) {
      message.error(e.message)
    } finally {
      this.setState({ savingInvitations: false })
    }
  }

  copyShareLink = () => {
    const { formatMessage, data } = this.props
    const itemId = get(data, 'project.designs[0].id', '')
    const tempInput = document.createElement('input')
    tempInput.value = `${config.baseUrl}approval?id=${itemId}`
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    message.success(formatMessage(messages.copiedLink))
  }

  handlePaste = (evt: any) => {
    evt.preventDefault()
    const paste = evt.clipboardData.getData('text')
    const emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g)
    if (emails) {
      const { data } = this.props
      const { items } = this.state
      const projectMembers = get(data, 'project.members', [])
      const projectMembersMails = projectMembers.map((item) => item.email.trim().toLowerCase())
      const itemsLower = items.map((item: string) => item.trim().toLowerCase())
      const toBeAdded = emails.filter(
        (email: string) => !this.isInList(email, [...projectMembersMails, ...itemsLower])
      )
      const arrayCleaned = toBeAdded.slice(0, 5 - (items.length + projectMembers.length))
      this.setState({
        items: [...this.state.items, ...arrayCleaned]
      })
    }
  }

  isInList = (email: string, items: string[]) => {
    if (email) {
      const { data } = this.props
      const ownerMail = get(data, 'project.user.email', '')
      const cleanMail = email.trim().toLowerCase()
      const valid = this.isAllowed(cleanMail)
      return (items.includes(cleanMail) || !valid || cleanMail === ownerMail)
    }
    return true
  }

  isEmail = (email: string) => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email)
  }

  isAllowed = (email: string) => {
    if (email) {
      const cleanMail = email.trim().toLowerCase()
      return !(/^[a-zA-Z0-9_.+-]+@((jakroousa.com|jakroo.ca))$/g.test(cleanMail))
    }
    return false
  }

  isValid = (email: string) => {
    let error = null
    const { data } = this.props
    const { items } = this.state
    const projectMembers = get(data, 'project.members', [])
    const projectMembersMails = projectMembers.map((item) => item.email.trim().toLowerCase())
    const itemsLower = items.map((item: string) => item.trim().toLowerCase())
    if (!this.isAllowed(email)) {
      error = 'This email domain is not allowed'
      this.setState({ error })
      return false
    }
    if (this.isInList(email, [...projectMembersMails, ...itemsLower])) {
      error = `${email} has already been added.`
    }
    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`
    }
    if (error) {
      this.setState({ error })
      return false
    }
    return true
  }

  handleKeyDown = evt => {
    if (['Enter', 'Tab', ',', ' '].includes(evt.key)) {
      evt.preventDefault()
      var value = this.state.value.trim()
      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ''
        })
      }
    }
  }

  handleBlur = evt => {
    if (evt) {
      evt.preventDefault()
      var value = this.state.value.trim()
      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ''
        })
      }
    }
  }

  handleChange = (evt: any) => {
    this.setState({
      value: evt.target.value,
      error: null
    })
  }

  handleDelete = (item: any, e: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    this.setState({
      items: this.state.items.filter(i => i !== item)
    })
  }

  focusOnInput = () => {
    if (this.emailInput) {
      this.emailInput.focus()
    }
  }

  openInviteModal = () => {
    this.setState({ openInviteModal: true, showConfirmInvites: false })
  }

  closeInviteModal = () => {
    this.setState({ openInviteModal: false, showConfirmInvites: false, items: [] })
  }

  showConfirmInvites = () => {
    const { items } = this.state
    if (items && items.length > 0) {
      this.setState({ showConfirmInvites: true })
    }
  }

  closeConfirmInvites = () => {
    this.setState({ showConfirmInvites: false })
  }

  getInitials = (value = '') => {
    let names = value.split(' ')
    let initials = names[0].substring(0, 1).toUpperCase()
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }
    return initials
  }

  preventDefault = (evt: React.MouseEvent) => {
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }
  }
  
  deleteItem = (itemId: string) => {
    const { formatMessage } = this.props
    confirm({
      title: <ModalTitle>{formatMessage(messages.areYouSure)}</ModalTitle>,
      icon: ' ',
      centered: true,
      cancelText: formatMessage(messages.cancel),
      okText: formatMessage(messages.yesDelete),
      cancelButtonProps: {
        style: cancelButtonStyle
      },
      okButtonProps: {
        style: buttonStyle
      },
      onOk: async () => await this.deleteDesign(itemId),
      content: <InfoBody>{formatMessage(messages.promptDelete)}</InfoBody>
    })
  }

  deleteDesign = async (itemId: string) => {
    const {
      formatMessage,
      deleteProItem,
      data: { refetch }
    } = this.props
    try {
      this.setState({ deleting: true })
      await deleteProItem({
        variables: { itemId }
      })
      refetch()
      message.success(formatMessage(messages.success))
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      message.error(errorMessage, 5)
    } finally {
      this.setState({ deleting: false })
    }
  }
  render() {
    const {
      formatMessage,
      data,
      colorsList,
      project,
      onOpenQuickView,
      goBack
    } = this.props
    const { deleting, openInviteModal, showConfirmInvites, savingInvitations } = this.state
    const palette = get(data, 'project.palette', {})
    const projectName = get(data, 'project.name', '')
    const projectDescription = get(data, 'project.notes', '')
    const designs = get(data, 'project.designs', [])
    const members = get(data, 'project.members', [])
    const isOwner = !get(data, 'project.shared', true)
    const files = get(data, 'project.files', [])
    const inspiration = get(data, 'project.inspiration', [])
    const teamSize = get(data, 'project.teamSize', '')
    const lockerDesign = get(data, 'project.locker', {})
    const deliveryDate = get(data, 'project.deliveryDate', '')
    const ownerMail = get(data, 'project.user.email', '')
    const accountManager = get(data, 'project.user.accountManager', {})
    const {
      id: designId,
      shortId,
      product: productLocker,
      name: designName,
      image: lockerImage,
      createdAt: designDate
    } = lockerDesign || {}
    const { id: productId, description: lockerDescription, type: lockerType } = productLocker || {}
    let arrayColors = []
    if (colorsList && !colorsList.loading) {
      try {
        arrayColors = JSON.parse(get(colorsList, 'colorsResult.colors', []))
      } catch (e) {
        message.error(e)
      }
    }
    const colorLabels = arrayColors.reduce((obj, { value, name }: Color) => {
      obj[value] = name
      return obj
      // tslint:disable-next-line: align
    }, {})
    return (
      <MainContainer>
        {deleting &&
          <LoadingContainer><Spin /></LoadingContainer>
        }
        {data && project && projectName ? <Container>
          <BackContainer onClick={goBack}>
            <Icon type="left" />
            <span>{formatMessage(messages.back)}</span>
          </BackContainer>
          <Notes>
            <Row>
              <Column>
                <Text>{formatMessage(messages.name)}</Text>
                <StrongText>{projectName || '-'}</StrongText>
              </Column>
              <ColumnSmall>
                <Text>{formatMessage(messages.teamSize)}</Text>
                <StrongText>{teamSize || '-'}</StrongText>
              </ColumnSmall>
              <ColumnSmall>
                <Text>{formatMessage(messages.deliveryDate)}</Text>
                <StrongText>{deliveryDate ? moment(deliveryDate).format(DATE_FORMAT) : '-'}</StrongText>
              </ColumnSmall>
              <ColumnSmall>
                <Text>{formatMessage(messages.dateCreated)}</Text>
                <StrongText>{moment(new Date()).format(DATE_FORMAT)}</StrongText>
              </ColumnSmall>
              <Column>
                <Text>{formatMessage(messages.accountManager)}</Text>
                <MailLink href={`mailto:${accountManager.email}`}>
                  {accountManager.firstName ? `${accountManager.firstName} ${accountManager.lastName}` : '-'}
                </MailLink>
              </Column>
              {isOwner && 
                (ownerMail === 'jesus@tailrecursive.co' || 
                  ownerMail === 'derekw@jakroousa.com' ||
                  ownerMail === 'acaurora@comcast.net' ||
                  ownerMail === 'derekrwiseman@gmail.com') &&
                <Column>
                  <Text>{formatMessage(messages.teamMembers)}</Text>
                  <StrongText>
                    {members.length > 0 ?
                      <StyledPopOver
                        onClick={this.preventDefault}
                        overlayClassName="innerClassTooltip"
                        title={
                          <PopoverText onClick={this.preventDefault}>
                            {members.map((member: User, key: number) => 
                              <PopOverValue
                                {...{ key }}
                                dangerouslySetInnerHTML={{
                                  __html: member.firstName ? 
                                  `👤<b>${member.firstName} ${member.lastName}</b> - ${member.role}
                                    <br/>(${member.email})` :
                                  `✉️<i>Pending</i><br/>(${member.email})`
                                }}
                              />
                            )}
                          </PopoverText>
                        }
                      >
                        <MemberList>
                          {members.map((member: User, key: number) => 
                            <CircleMember
                              {...{ key }}
                              secondary={key > 0}
                              codeColor={memberColors[Math.floor(key % 7)]}
                            >
                              {this.getInitials(member.firstName ? 
                                `${member.firstName} ${member.lastName}` : member.email
                              )}
                            </CircleMember>
                          )}
                        </MemberList>
                      </StyledPopOver> :
                      formatMessage(messages.private)
                    }
                    {isOwner && members && members.length < 5 &&
                      <AddMemberButton
                        onClick={this.openInviteModal}
                      >
                        {formatMessage(messages.inviteMembers)}
                      </AddMemberButton>
                    }
                  </StrongText>
                </Column>
              }
            </Row>
          </Notes>
          <CollapsePanel bordered={false}>
            <PanelDiv 
              header={
                <TitleDiv>
                  {formatMessage(messages.projectDetails)}
                </TitleDiv>
              }
              key="1"
            >
              <Ideas>
                <Row>
                  <Column>
                    <StrongText>{formatMessage(messages.designNotes)}</StrongText>
                  </Column>
                  <ProjectContainer>
                    <ProjectDescriptor>{projectDescription ? parse(projectDescription) : '-'}</ProjectDescriptor>
                  </ProjectContainer>
                </Row>
              </Ideas>
              {inspiration.length ? <Inspiration>
                <Row>
                  <Column>
                    <StrongText>{formatMessage(messages.inspiration)}</StrongText>
                  </Column>
                </Row>
                <Row>
                  <Images>
                    {inspiration.map(({ image, assetType, id }, index) => 
                      <ImageContainer key={index}>
                        <Image src={image} />
                        <InspirationName>
                          {assetType && 
                            `${InspirationTag[assetType]}${id ? id.toString().padStart(4, '0') : '-'}`
                          }
                        </InspirationName>
                      </ImageContainer>
                    )}
                  </Images>
                </Row>
              </Inspiration> : null}
              {palette && 
                <Color>
                  <Row>
                    <Column>
                      <StrongText>{formatMessage(messages.colorPalette)}</StrongText>
                    </Column>
                  </Row>
                  {palette.name &&
                    <PaletteName>
                      {palette.name}
                    </PaletteName>
                  }
                  <ColorBar
                    {...{ colorLabels, formatMessage }}
                    primary={palette.primary}
                    accent={[palette.accent1, palette.accent2, palette.accent3]}
                  />
                </Color>
              }
              <Files>
                <Row>
                  <Column>
                    <StrongText>{formatMessage(messages.uploadedFiles)}</StrongText>
                  </Column>
                </Row>
                <Row>
                  <Images>
                    {files.length ? files.map((assetItem, index) => {
                      const { fileUrl, type, name } = assetItem
                      const openFile = () => window.open(fileUrl)
                      const extension = getFileExtension(fileUrl)
                      return (<ImageContainer key={index}>
                        {docTypes.includes(type) ?
                          <DocIcon onClick={openFile} type={type === ZIP_TYPE ? 'file-zip' : 'file'} /> :
                          (type === POSTSCRIPT_TYPE ?
                            <LogoImage onClick={openFile} src={extension === '.ai' ? aiLogo : epsLogo} /> : 
                            <Image src={fileUrl} />
                          )
                        }
                        <ImageText>{name || getFileNameFromUrl(fileUrl)}</ImageText>
                      </ImageContainer>)
                    }) : formatMessage(messages.noFiles)}
                    </Images>
                  </Row>
                </Files>
                {lockerDesign && designId &&
                  <Designs>
                    <Row>
                      <Column fullWidth={true}>
                        <StrongText>{formatMessage(messages.designs)}</StrongText>
                      </Column>
                    </Row>
                    <Row>
                      <LockerGrid>
                        <ProductThumbnailStore
                          {...{ productId }}
                          type={lockerType}
                          description={lockerDescription}
                          product={productLocker}
                          name={designName}
                          image={lockerImage}
                          key={designId}
                          id={shortId}
                          withCheckbox={false}
                          disableSlider={true}
                          hideCustomButton={true}
                          hideQuickView={true}
                          clickDisabled={true}  
                          date={designDate}
                        />
                      </LockerGrid>
                    </Row>
                  </Designs>
                }
              </PanelDiv>
            </CollapsePanel>
            <Products>
              <Row>
                <Column fullWidth={true}>
                  <StrongText>{formatMessage(messages.products)}</StrongText>
                </Column>
              </Row>
              <Row>
                {designs.map((design: ProDesignItem, key: number) => {
                  const { product, code, image, status, name, id: itemId, createdAt, notifications } = design
                  const { 
                    id,
                    yotpoId,
                    type,
                    description,
                    isTopProduct,
                    images = [],
                    priceRange,
                    customizable,
                    colors
                  } = product
                  const imagesToShow = !!code && 
                  (status === CUSTOMER_PREVIEW || status === CUSTOMER_APPROVED) ? { thumbnail: image } : images[0]
                  const goToItem = () => this.handleGoItem(itemId)
                  const deleteItem = () => this.deleteItem(itemId)
                  return (
                    <ProductThumbnail
                      images={imagesToShow}
                      hideCustomButton={true}
                      product={product}
                      disableSlider={true}
                      onlyView={true}
                      isProDesign={true}
                      hideQuickView={true}
                      proStatus={status}
                      onPressThumbnail={goToItem}
                      type={!code ? type : name}
                      description={!code ? description : type}
                      onPressQuickView={onOpenQuickView}
                      {...{
                        key,
                        id,
                        yotpoId,
                        createdAt,
                        deleteItem,
                        isOwner,
                        notifications,
                        isTopProduct,
                        priceRange,
                        customizable,
                        colors
                      }}
                    />
                  )
                })}
                {designs.length < LIMIT_PRODUCTS && isOwner &&
                  <AddProductButton onClick={this.addNewProduct}>
                    <AddLabel 
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.addProduct)
                      }}
                    />
                  </AddProductButton>
                }
              </Row>
            </Products>
            <Modal
              visible={openInviteModal}
              footer={null}
              onCancel={this.closeInviteModal}
              wrapClassName="rounded-corner"
              width={'545px'}
            >
              {!showConfirmInvites ? 
                <InviteContainer>
                  <InviteTitle>{formatMessage(messages.inviteToTeam)}</InviteTitle>
                  <MailsContainer>
                    <EmailsLabel>{formatMessage(messages.emails)}</EmailsLabel>
                    <StyledEmailTags onClick={this.focusOnInput} secondary={this.state.items.length > 0}>
                      {this.state.items.map(item => (
                        <div className="tag-item" key={item}>
                          {item}
                          <button
                            type="button"
                            className="button"
                            onClick={(e) => this.handleDelete(item, e)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <input
                        ref={(emailInput) => { this.emailInput = emailInput }} 
                        className={'input ' + (this.state.error && ' has-error')}
                        value={this.state.value}
                        disabled={this.state.items.length >= 5 || 
                          (members.length + this.state.items.length) >= 5
                        }
                        placeholder={this.state.items.length > 0 ? null : 'You can copy and paste a list of emails...'}
                        onKeyDown={this.handleKeyDown}
                        onChange={this.handleChange}
                        onPaste={this.handlePaste}
                        onBlur={this.handleBlur}
                      />
                      {this.state.error && <p className="error">{this.state.error}</p>}
                    </StyledEmailTags>
                    <SendInvitationButton
                      disabled={!this.state.items.length}
                      onClick={this.showConfirmInvites}
                    >
                      {formatMessage(messages.sendInvitations)}
                    </SendInvitationButton>
                    <BottomSection>
                      <InviteLink>
                        <GearIcon onClick={this.copyShareLink} type="link" />
                        <InviteLinkLabel onClick={this.copyShareLink}>
                          {formatMessage(messages.teamInviteLink)}
                        </InviteLinkLabel>
                        <StyledPopOver
                          overlayClassName="innerClassTooltip"
                          title={
                            <PopoverText
                              dangerouslySetInnerHTML={{
                                __html: formatMessage(messages.linkInfo)
                              }}
                            />
                          }
                        >
                          <InfoIconLink type="question-circle" theme="filled" />
                        </StyledPopOver>
                      </InviteLink>
                      <CopyLinkButton onClick={this.copyShareLink}>{formatMessage(messages.copyLink)}</CopyLinkButton>
                    </BottomSection>
                  </MailsContainer>
                </InviteContainer> :
                <InviteContainer>
                  <InviteTitle>{formatMessage(messages.confirmTitle)}</InviteTitle>
                  <ConfirmEmailTags>
                    {this.state.items.map(item => (
                      <div className="tag-item" key={item}>
                        {item}
                        <button
                          type="button"
                          className="button"
                          onClick={(e) => this.handleDelete(item, e)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </ConfirmEmailTags>
                  <InfoConfirmation>
                    {formatMessage(messages.infoConfirmation)}
                  </InfoConfirmation>
                  <ConfirmBottom>
                    <SendInvitationButton
                      disabled={!this.state.items.length || savingInvitations}
                      onClick={this.sendInvitationsAction}
                    >
                      {savingInvitations ? 
                        <StyledSpinInvitation size="small" /> : 
                        formatMessage(messages.addToTeamCollab)
                      }
                    </SendInvitationButton>
                    <CancelInvitation onClick={this.closeConfirmInvites}>
                      {formatMessage(messages.cancel)}
                    </CancelInvitation>
                  </ConfirmBottom>
                </InviteContainer>
              }
            </Modal>
        </Container> : <SpinContainer><Spin /></SpinContainer>}
      </MainContainer>
    )
  }
}

interface OwnProps {
  project?: number
  colorsList?: ColorsDataResult
}

const ReviewEnhance = compose(
  withApollo,
  graphql(sendInvitationsMutation, { name: 'sendInvitations' }),
  graphql(deleteProItemMutation, { name: 'deleteProItem' }),
  graphql(getProDesignProject, {
    options: ({ project }: OwnProps) => {
      return {
        variables: {
          projectId: project
        },
        skip: !project,
        fetchPolicy: 'network-only'
      }
    }
  }),
  graphql<ColorsDataResult>(GetColorsQuery, {
    options: (ownprops: OwnProps) => {
      const { colorsList } = ownprops
      return {
        skip: !!colorsList
      }
    },
    name: 'colorsList'
  })
)(Review)

export default ReviewEnhance
