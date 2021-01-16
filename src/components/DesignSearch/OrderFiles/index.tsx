/**
 * OrderFiles Component - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import messages from './messages'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'
import find from 'lodash/find'
import get from 'lodash/get'
import Select, { OptionProps } from 'antd/lib/select'
import Divider from 'antd/lib/divider'
import indexOf from 'lodash/indexOf'
import message from 'antd/lib/message'
import Render3D from '../../../components/Render3D'
import {
  Container,
  Code,
  Data,
  Status,
  Label,
  StatusContainer,
  FinalSvg,
  AssetsLabel,
  Icon,
  ButtonContainer,
  RenderContainer,
  RenderLayout,
  ThumbnailLabel,
  ChangesContainer,
  MessageContainer,
  ModelNameContainer,
  ProAssistNotes,
  NoteContainer,
  NoteTitle,
  NoteText,
  ProAssistTitle,
  DataContainer,
  SideData,
  FlexContainer,
  ProAssistBackground,
  AddNote,
  PreflightDiv,
  WarningIcon,
  PreflightCheckbox,
  Colors,
  Color,
  ColorContainer,
  ColorName,
  NoteIcon,
  RepsDiv,
  StyledSelect,
  Selectable,
  Subtitle,
  LockerLink,
  EditButton,
  Title,
  OkStyle,
  LegacyInput
} from './styledComponents'
import DraggerWithLoading from '../../../components/DraggerWithLoading'
import {
  OrderSearchResult,
  StitchingColor,
  DesignNote,
  RolePermission,
  User, PredyedColor
} from '../../../types/common'
import DownloadItem from '../DownloadItem'
import FilesList from '../FilesList'
import AccessoryColors from '../AccessoryColors'
import moment from 'moment'
import ProassistNotes from '../../ProassistNotes'
import { DATE_FORMAT, PREDYED_DEFAULT, PREDYED_TRANSPARENT } from '../../../constants'

const Option = Select.Option
const Confirm = Modal.confirm

interface Props {
  order: OrderSearchResult
  uploadingFile: boolean
  actualSvg: string
  uploadingThumbnail: boolean
  changes: boolean
  colorAccessories: any
  creatingPdf: boolean
  openNotes: boolean
  addingNote: boolean
  note: string
  loadingPreflight: boolean
  colorList: string
  canEdit: boolean
  accessAssets: RolePermission
  salesRepUsers: User[]
  managersUsers: User[]
  predyedColors: PredyedColor[]
  history: History
  changeManager: (
    value: string,
    option: React.ReactElement<OptionProps>
  ) => void
  changeUserRep: (
    value: string,
    option: React.ReactElement<OptionProps>
  ) => void
  editLegacy: () => void
  changeLegacy: (value: string) => void
  searchReps: (value: string) => void
  searchManagers: (value: string) => void
  handleSaveNote: () => void
  setNoteAction: (text: string) => void
  openNoteAction: (openNotes: boolean) => void
  checkPreflight: () => void
  downloadFile: (code: string) => void
  onUploadFile: (file: any, code: string) => void
  formatMessage: (messageDescriptor: any, params?: any) => string
  onSaveThumbnail: (thumbnail: string) => void
  setUploadingThumbnailAction: (uploading: boolean) => void
  onSelectPredyed: (predyedValue: string) => void
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  onSelectColor: (color: string, id: string) => void
  onGeneratePdf: () => void
}
export class OrderFiles extends React.PureComponent<Props> {
  render3D: any
  render() {
    const {
      order: {
        code,
        status,
        svgUrl = '',
        assets,
        stitchingName,
        predyedName,
        stitchingValue,
        salesRep,
        legacyNumber,
        user: {
          firstName: userFirstName,
          lastName: userLastName,
        },
        accountManager,
        bibColor,
        zipperColor,
        bindingColor,
        preflightCheck,
        shortId,
        image,
        pdfUrl,
        name,
        notes = [],
        pngUrl = '',
        product: { name: modelName, zipper, hasPredyed },
        colors = []
      },
      uploadingFile,
      openNotes,
      salesRepUsers = [],
      managersUsers = [],
      changeUserRep,
      changeManager,
      searchReps,
      searchManagers,
      setNoteAction,
      handleSaveNote,
      note,
      addingNote,
      formatMessage,
      actualSvg,
      loadingPreflight,
      onSaveThumbnail,
      uploadingThumbnail,
      setUploadingThumbnailAction,
      changes,
      predyedColors = [],
      onSelectPredyed,
      onSelectStitchingColor,
      colorAccessories,
      onSelectColor,
      onGeneratePdf,
      checkPreflight,
      colorList,
      accessAssets,
      canEdit,
      creatingPdf
    } = this.props

    let colorsObject = []
    try {
      colorsObject = JSON.parse(colorList)
    } catch (e) {
      console.error(e)
    }
    const predyedValue = colorAccessories.predyed || predyedName || PREDYED_DEFAULT
    const hidePredyed = predyedValue === PREDYED_TRANSPARENT
    const predyedItem = predyedColors.find(({ name: colorName }) => colorName === predyedValue)
    const predyedCode = predyedItem ? predyedItem.code : predyedValue
    const statusOrder = status.replace(/_/g, ' ')
    const selectedRep = salesRep
      ? `${salesRep.firstName} ${salesRep.lastName}`
      : null
    const selectedManager =
      accountManager && accountManager.shortId
        ? `${accountManager.firstName} ${accountManager.lastName}`
        : null
    const allowZipperSelection = !!zipper && !!zipper.white && !!zipper.black
    const notesElements = notes.map(
      ({ createdAt, text, user }: DesignNote, index: number) => {
        const createdLabel = `${moment(createdAt).format(
          DATE_FORMAT
        )} - ${user}`
        return (
          <NoteContainer key={index}>
            <NoteTitle>{createdLabel}</NoteTitle>
            <NoteText>{text}</NoteText>
          </NoteContainer>
        )
      }
    )
    return (
      <Container>
        <FlexContainer>
          <DataContainer>
            <ModelNameContainer>
              <Code>{formatMessage(messages.designCode)}</Code>
              {code}
            </ModelNameContainer>
            <ModelNameContainer>
              <Code>{formatMessage(messages.designNameLabel)}</Code>
              {name}
            </ModelNameContainer>
            <ModelNameContainer>
              <Code>
                {formatMessage(messages.legacy)}
              </Code>
              {legacyNumber}
              {canEdit &&
                <EditButton onClick={this.openEditLegacy}>
                  {formatMessage(messages.edit)}
                </EditButton>
              }
            </ModelNameContainer>
            <ModelNameContainer>
              <Code>
                {formatMessage(messages.modelNameLabel)}
              </Code>
              {modelName}
            </ModelNameContainer>
          </DataContainer>
          <SideData>
            <ModelNameContainer>
              <Code>
                {formatMessage(messages.locker)}
              </Code>
              <LockerLink onClick={this.goToLocker}>
                {`${userFirstName} ${userLastName}`}
              </LockerLink>
            </ModelNameContainer>
            <StatusContainer>
              <Label>
                <FormattedMessage {...messages.status} />
              </Label>
              <Status>{statusOrder}</Status>
            </StatusContainer>
            <PreflightDiv>
              <WarningIcon
                enable={!preflightCheck}
                type="warning"
                theme="filled"
              />
              <PreflightCheckbox
                disabled={loadingPreflight || !canEdit}
                checked={preflightCheck}
                onChange={checkPreflight}
              >
                <FormattedMessage {...messages.preflight} />
              </PreflightCheckbox>
            </PreflightDiv>
          </SideData>
          {canEdit &&
            <RepsDiv>
              <Selectable>
                <Subtitle>
                  <FormattedMessage {...messages.salesRep} />
                </Subtitle>
                <StyledSelect
                  showSearch={true}
                  onChange={changeUserRep}
                  value={selectedRep}
                  notFoundContent={null}
                  allowClear={true}
                  defaultActiveFirstOption={false}
                  filterOption={false}
                  onSearch={searchReps}
                >
                  {salesRepUsers.map(
                    ({ shortId: repId, firstName, lastName }: User) => (
                      <Option value={repId}>
                        {firstName} {lastName}
                      </Option>
                    )
                  )}
                </StyledSelect>
              </Selectable>
              <Selectable>
                <Subtitle>
                  <FormattedMessage {...messages.accountManager} />
                </Subtitle>
                <StyledSelect
                  showSearch={true}
                  onChange={changeManager}
                  value={selectedManager}
                  notFoundContent={null}
                  allowClear={true}
                  defaultActiveFirstOption={false}
                  filterOption={false}
                  onSearch={searchManagers}
                >
                  {managersUsers.map(
                    ({ shortId: managerId, firstName, lastName }: User) => (
                      <Option value={managerId}>
                        {firstName} {lastName}
                      </Option>
                    )
                  )}
                </StyledSelect>
              </Selectable>
            </RepsDiv>
          }
        </FlexContainer>
        <Colors>
          <Code>Colors:</Code>
          {colors.map(({ color }, index) => {
            return (
              <ColorContainer key={index}>
                <Color color={color} />
                <ColorName>
                  {get(find(colorsObject, ['value', color]), 'name', color)}
                </ColorName>
              </ColorContainer>
            )
          })}
        </Colors>
        <ProAssistNotes>
          <ProAssistTitle>
            <FormattedMessage {...messages.proAssistNotes} />
            <NoteIcon type="form" />
            {canEdit && (
              <AddNote onClick={this.handleOpenNotes}>
                <FormattedMessage {...messages.add} />
              </AddNote>
            )}
          </ProAssistTitle>
          {notes && !!notes.length && (
            <ProAssistBackground>{notesElements}</ProAssistBackground>
          )}
        </ProAssistNotes>
        <FlexContainer>
          <RenderLayout>
            {canEdit && (
              <AccessoryColors
                {...{
                  bibColor,
                  bindingColor,
                  onSelectStitchingColor,
                  onSelectColor,
                  hasPredyed,
                  onSelectPredyed,
                  predyedValue,
                  predyedColors,
                  predyedCode,
                  allowZipperSelection
                }}
                stitchingValue={colorAccessories.stitching || stitchingValue}
                stitchingName={colorAccessories.stitchingName || stitchingName}
                zipperColor={colorAccessories.zipperColor || zipperColor}
                bibColor={colorAccessories.bibColor || bibColor}
                bindingColor={colorAccessories.bindingColor || bindingColor}
              />
            )}
            <RenderContainer>
              <Render3D
                designSearch={true}
                loading={uploadingFile}
                actualImage={actualSvg}
                designId={shortId}
                uploadingThumbnail={uploadingThumbnail}
                onSaveThumbnail={onSaveThumbnail}
                onUploadingThumbnail={setUploadingThumbnailAction}
                colorAccessories={colorAccessories}
                ref={(render3D: any) => (this.render3D = render3D)}
                {...{ stitchingValue, hidePredyed }}
              />
            </RenderContainer>
          </RenderLayout>
          <Data>
            <Button
              loading={creatingPdf}
              disabled={creatingPdf}
              onClick={onGeneratePdf}
              icon="download"
            >
              <ButtonContainer>
                <FormattedMessage {...messages.generatePDF} />
              </ButtonContainer>
            </Button>
            <Divider />
            {accessAssets.view && (
              <Button onClick={this.onDownload} icon="download">
                <ButtonContainer>
                  <FormattedMessage {...messages.downloadAll} />
                </ButtonContainer>
              </Button>
            )}
            {canEdit && (
              <DraggerWithLoading
                className="upload"
                loading={uploadingFile}
                onSelectImage={this.beforeUpload}
                formatMessage={formatMessage}
                extensions={['.svg']}
              >
                <Button>
                  <ButtonContainer>
                    <Icon type="upload" />
                    <FormattedMessage {...messages.uploadDesign} />
                  </ButtonContainer>
                </Button>
              </DraggerWithLoading>
            )}
            <FinalSvg>
              {pdfUrl && pdfUrl.length && (
                <DownloadItem url={pdfUrl} name="Final PDF" />
              )}
              {svgUrl && (
                <DownloadItem url={actualSvg || svgUrl} name="Final SVG" />
              )}
              {pngUrl && <DownloadItem url={pngUrl} name="Final PNG" />}
            </FinalSvg>
            {accessAssets.view && (
              <>
                <AssetsLabel>
                  <FormattedMessage {...messages.assets} />
                </AssetsLabel>
                <FilesList {...{ assets }} />
              </>
            )}
            <ThumbnailLabel>
              <FormattedMessage {...messages.thumbnail} />
            </ThumbnailLabel>
            <DownloadItem url={image} />
          </Data>
          <ChangesContainer className={changes ? 'show' : ''}>
            <MessageContainer>
              <FormattedMessage {...messages.changesMessage} />
            </MessageContainer>
            <Button
              onClick={this.onSaveChanges}
              type="primary"
              loading={uploadingThumbnail}
              disabled={uploadingThumbnail}
              icon="save"
            >
              <ButtonContainer>
                <FormattedMessage {...messages.saveChanges} />
              </ButtonContainer>
            </Button>
          </ChangesContainer>
        </FlexContainer>
        <ProassistNotes
          {...{ note }}
          visible={openNotes}
          loading={addingNote}
          designNotes={notes}
          saveNote={handleSaveNote}
          setNoteText={setNoteAction}
          handleClose={this.handleClose}
        />
      </Container>
    )
  }

  onChangeLegacy = (evt: React.FormEvent<HTMLInputElement>) => {
    const { changeLegacy } = this.props
    const {
      currentTarget: { value }
    } = evt
    changeLegacy(value)
  }

  openEditLegacy = () => {
    const { formatMessage, order: { legacyNumber }, editLegacy } = this.props
    Confirm({
      iconType: null,
      title: <Title>{formatMessage(messages.legacy)}</Title>,
      content: <LegacyInput onChange={this.onChangeLegacy} defaultValue={legacyNumber} />,
      okButtonProps: {
        style: OkStyle
      },
      onOk: editLegacy
    })
  }

  goToLocker = () => {
    const {
      order: {
        user: {
          shortId
        },
      },
      history
    } = this.props
    history.push(`/admin/users/${shortId}`)
  }
  handleOpenNotes = () => {
    const { openNoteAction } = this.props
    openNoteAction(true)
  }
  handleClose = () => {
    const { openNoteAction } = this.props
    openNoteAction(false)
  }
  onDownload = () => {
    const {
      downloadFile,
      order: { code }
    } = this.props
    downloadFile(code)
  }
  getFileExtension = (fileName: string) => {
    const extensionPattern = /\.[a-zA-Z]+/g
    let extension = fileName.match(extensionPattern)
    if (!isEmpty(extension)) {
      return last(extension as RegExpMatchArray)
    }
    return ''
  }
  onSaveChanges = () => {
    this.render3D.getWrappedInstance().saveThumbnail()
  }
  beforeUpload = (file: any) => {
    const {
      formatMessage,
      onUploadFile,
      order: { code }
    } = this.props
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = this.getFileExtension(name)
      if (indexOf(['.svg'], (fileExtension as String).toLowerCase()) === -1) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      onUploadFile(file, code)
    }
    return false
  }
}

export default OrderFiles
