import * as React from 'react'
import debounce from 'lodash/debounce'
import { compose, graphql } from 'react-apollo'
import { getUsers } from './data'
import { RouteComponentProps } from 'react-router-dom'
import { SelectValue } from 'antd/lib/select'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import { isPhoneNumber, containsNumberAndLetters } from '../../../utils/utilsFiles'
import DataSelected from '../Review/DataSelected'
import { EditorState, convertFromRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {
  Container,
  MainContainer,
  Label,
  Required,
  Field,
  InfoTitle,
  ReviewContainer,
  DataSelectedContainer,
  QuestionSpan,
  LabelContainer,
  TopContainer,
  MultipleItemsButton,
  StyledInput,
  StyledSearch,
  SearchButton
} from './styledComponents'
import messages from './messages'
import {
  Message,
  UserType,
  InspirationType,
  ImageFile,
  Product,
  DesignType,
  UserSearchResult,
  QueryProps
} from '../../../types/common'
import { MINIMUM_LENGTH } from './constants'

interface Props extends RouteComponentProps<any> {
  user?: UserType
  projectDescription: string
  projectName: string
  inspiration: InspirationType[]
  inspirationSelectedItems: number[]
  selectedColors: string[]
  selectedPrimaryColor: string[]
  selectedPaletteIndex: number
  selectedEditColors: string[]
  selectedEditPrimaryColor: string[]
  selectedFiles: ImageFile[]
  selectedItems: Product[]
  fromScratch: boolean
  currentCurrency: string
  categories: string[]
  richTextEditorReady: boolean
  colorLabels?: { [name: string]: string }
  paletteName?: string
  highlight?: boolean
  validLength?: boolean
  lockerDesign: DesignType
  adminProject: boolean
  userToSearch: string
  data: Data
  onChangeInput: (key: string, value: string) => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToPage: (page: number) => void
  setDescription: (contentState: string | null, validLength: boolean) => void
  setAdminProjectUser: (userId: string) => void
  removeCategory: (listName: string, value: string) => void
  addCategory: (listName: string, value: string) => void
  showModal: (title: string, body: string[] | string, accept: string) => void
  setUserToSearch: (value: string) => void
}

interface Data extends QueryProps {
  userSearch: UserSearchResult[]
}

let Editor = () => <></>
export class Notes extends React.Component<Props, {}> {
  debounceSearchProduct = debounce(value => this.handleOnChange(value), 300)

  state = {
    editorReady: false,
    editorState: undefined,
    contentState: null
  }

  constructor(props: Props) {
    super(props)
    if (typeof window !== undefined) {
      this.setState({
        editorState: EditorState.createEmpty()
      })
    }
  }

  componentDidMount() {
    if (typeof window !== undefined) {
      Editor = require('react-draft-wysiwyg').Editor
      const { projectDescription } = this.props
      if (projectDescription) {
        try {
          const blocksContent = JSON.parse(projectDescription)
          const editorState = EditorState.createWithContent(convertFromRaw(blocksContent))
          this.setState({
            editorReady: true,
            editorState
          })
        } catch (e) {
          console.error('Error:', e)
        }
      } else {
        this.setState({
          editorReady: true,
        })
      }
    }
  }

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
    const { setAdminProjectUser } = this.props
    setAdminProjectUser(value.toString())
  }

  handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChangeInput } = this.props
    const { value, id: inputId } = event.target
    if (inputId === 'phone' && !isPhoneNumber(value) && value !== '') {
      return
    }
    onChangeInput(inputId, value)
  }

  onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState,
    })
  }

  onContentStateChange = (contentState: any) => {
    this.setState({
      contentState,
    })
    this.setDescription()
  }

  setDescription = () => {
    const { setDescription } = this.props
    const { editorState, editorReady } = this.state
    let validLength = false
    if (editorState && editorReady) {
      const contentState = editorState.getCurrentContent()
      validLength = contentState.getPlainText().length >= MINIMUM_LENGTH
    }
    setDescription(JSON.stringify(this.state.contentState), validLength)
  }

  showMultipleItems = () => {
    const { showModal, formatMessage } = this.props
    showModal(
      formatMessage(messages.multipleProducts).toUpperCase(),
      formatMessage(messages.multipleProductsDescription),
      ''
    )
  }

  describeIdeas = () => {
    const { showModal, formatMessage } = this.props
    showModal(
      formatMessage(messages.designIdeas).toUpperCase(),
      [formatMessage(messages.descriptionHelp),
      formatMessage(messages.descriptionHelp1),
      formatMessage(messages.descriptionHelp2),
      formatMessage(messages.descriptionHelp3)],
      ''
    )
  }

  render() {
    const {
      formatMessage,
      projectName,
      inspiration,
      inspirationSelectedItems,
      selectedColors,
      selectedPrimaryColor,
      colorLabels,
      paletteName,
      validLength,
      lockerDesign,
      highlight,
      selectedPaletteIndex,
      selectedEditColors,
      selectedEditPrimaryColor,
      selectedFiles,
      selectedItems,
      fromScratch,
      currentCurrency,
      richTextEditorReady,
      adminProject,
      goToPage,
      data
    } = this.props
    const { editorReady, editorState } = this.state
    const searchResults = adminProject ?
      data &&
      !data.loading &&
      data.userSearch.map(
        (item: UserSearchResult) => {
          return {
            value: item.shortId,
            text: `${item.id} - ${item.name} - ${item.email}`
          }
        }
      )
      : []
    return (
      <MainContainer>
        <Container>
          {adminProject &&
            <Field>
              <Label>
                {formatMessage(messages.selectUser)} <Required>*</Required>
              </Label>
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
            </Field>
          }
          <Field>
            <Label>
              {formatMessage(messages.projectName)} <Required>*</Required>
            </Label>
            <StyledInput
              highlight={highlight && !projectName}
              id="projectName"
              value={projectName}
              placeholder={formatMessage(messages.name)}
              size="large"
              onChange={this.handleOnChangeInput}
            />
          </Field>
          <Field>
            <TopContainer>
              <LabelContainer>
                <Label>
                  {formatMessage(messages.ideas)} <Required>*</Required>
                </Label>
                <QuestionSpan onClick={this.describeIdeas}>?</QuestionSpan>
              </LabelContainer>
            </TopContainer>
            {richTextEditorReady && editorReady && typeof window !== 'undefined' ?
              <Editor
                editorState={editorState}
                wrapperClassName="richTextWrapper"
                editorClassName={highlight && !validLength ? 'richtTextHighlight' : 'richTextEditor'}
                toolbarClassName="richTextToolBar"
                placeholder={formatMessage(messages.placeholder)}
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange={this.onContentStateChange}
                spellCheck={false}
                toolbar={{
                  options: ['inline', 'list'],
                  inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough'],
                    bold: { className: 'bordered-option' },
                    italic: { className: 'bordered-option' },
                    underline: { className: 'bordered-option' },
                    strikethrough: { className: 'bordered-option' },
                    code: { className: 'bordered-option' },
                  },
                  list: {
                    options: ['unordered', 'ordered']
                  }
                }}
              /> : null
            }
            <MultipleItemsButton onClick={this.showMultipleItems}>
              {formatMessage(messages.multipleProducts)}
            </MultipleItemsButton>
          </Field>
        </Container>
        <ReviewContainer>
          <InfoTitle>
            {formatMessage(messages.currentInformation)}
          </InfoTitle>
          <DataSelectedContainer>
            <DataSelected
              {...{
                inspiration,
                colorLabels,
                paletteName,
                lockerDesign,
                inspirationSelectedItems,
                selectedColors,
                selectedPrimaryColor,
                selectedPaletteIndex,
                selectedEditColors,
                selectedEditPrimaryColor,
                selectedFiles,
                selectedItems,
                fromScratch,
                currentCurrency,
                formatMessage,
                goToPage,
                adminProject
              }}
            />
          </DataSelectedContainer>
        </ReviewContainer>
      </MainContainer>
    )
  }
}

type OwnProps = {
  userToSearch?: string
}

const NotesEnhance = compose(
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
)(Notes)

export default NotesEnhance
