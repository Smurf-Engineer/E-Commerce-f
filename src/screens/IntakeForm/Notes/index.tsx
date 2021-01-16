import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Input from 'antd/lib/input'
import { isPhoneNumber } from '../../../utils/utilsFiles'
import DataSelected from '../Review/DataSelected'
import Checkbox from 'antd/lib/checkbox'
import includes from 'lodash/includes'
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
  CheckboxLabel,
  CheckBoxContainer,
  ProjectInfoContainer,
  Title,
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
  onChangeInput: (key: string, value: string) => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  goToPage: (page: number) => void
  setDescription: (contentState: string | null) => void
  removeCategory: (listName: string, value: string) => void
  addCategory: (listName: string, value: string) => void
  showModal: (title: string, body: string[] | string, accept: string) => void
}

const checkBoxes = [
  'event',
  'team',
  'club',
  'company',
  'other'
]

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
  }

  setDescription = () => {
    const { setDescription } = this.props
    setDescription(JSON.stringify(this.state.contentState))
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
      selectedPaletteIndex,
      selectedEditColors,
      selectedEditPrimaryColor,
      selectedFiles,
      selectedItems,
      fromScratch,
      currentCurrency,
      categories,
      richTextEditorReady,
      removeCategory,
      addCategory,
      goToPage
    } = this.props
    const { editorReady, editorState } = this.state
    return (
      <MainContainer>
        <Container>
          <ProjectInfoContainer>
            <Title>
              {formatMessage(messages.isThis)}
            </Title>
            <CheckBoxContainer>
              {checkBoxes.map((checkBox) => {
                const isSelected = includes(categories, checkBox)
                const handleAddCategory = () => isSelected
                  ? removeCategory('projectCategories', checkBox)
                  : addCategory('projectCategories', checkBox)
                return(<Checkbox
                key={checkBox}
                checked={isSelected}
                onChange={handleAddCategory}>
                <CheckboxLabel>
                  {formatMessage(messages[checkBox])}
                </CheckboxLabel>
              </Checkbox>
              )})}
            </CheckBoxContainer>
          </ProjectInfoContainer>
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
              <MultipleItemsButton onClick={this.showMultipleItems}>
                {formatMessage(messages.multipleProducts)}
              </MultipleItemsButton>
            </TopContainer>
            {richTextEditorReady && editorReady && typeof window !== 'undefined' ? <Editor
              editorState={editorState}    
              wrapperClassName="richTextWrapper"
              editorClassName="richTextEditor"
              toolbarClassName="richTextToolBar"
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
            /> : null}
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
