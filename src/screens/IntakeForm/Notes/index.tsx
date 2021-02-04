import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Input from 'antd/lib/input'
import { isPhoneNumber } from '../../../utils/utilsFiles'
import DataSelected from '../Review/DataSelected'
import { EditorState } from 'draft-js'
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
  MultipleItemsButton
} from './styledComponents'
import messages from './messages'
import {
  Message,
  UserType,
  InspirationType,
  ImageFile,
  Product
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
  onChangeInput: (key: string, value: string) => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToPage: (page: number) => void
  setDescription: (contentState: string | null, validLength: boolean) => void
  removeCategory: (listName: string, value: string) => void
  addCategory: (listName: string, value: string) => void
  showModal: (title: string, body: string[] | string, accept: string) => void
}

let Editor = () => <></>
export class Notes extends React.Component<Props, {}> {
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
      this.setState({
        editorReady: true,
      })
    }
  } 

  handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChangeInput } = this.props
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
    const { showModal, formatMessage } = this.props
    showModal(
      formatMessage(messages.multipleProducts).toUpperCase(),
      formatMessage(messages.multipleProductsDescription),
      ''
    )
  }

  describeIdeas = () => {
    const { showModal, formatMessage } = this.props
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
      selectedPaletteIndex,
      selectedEditColors,
      selectedEditPrimaryColor,
      selectedFiles,
      selectedItems,
      fromScratch,
      currentCurrency,
      richTextEditorReady,
      goToPage
    } = this.props
    const { editorReady, editorState } = this.state
    return (
      <MainContainer>
        <Container>
          <Field>
            <Label>
              {formatMessage(messages.projectName)} <Required>*</Required>
            </Label>
            <Input
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
                editorClassName="richTextEditor"
                toolbarClassName="richTextToolBar"
                placeholder={formatMessage(messages.placeholder)}
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange={this.onContentStateChange}
                onBlur={this.setDescription}
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
                  list : {
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
                goToPage
              }}
            />
          </DataSelectedContainer>
        </ReviewContainer>
      </MainContainer>
    )
  }
}

export default Notes
