/**
 * CreateStore Component - Created by Jesús Apodaca on 04/10/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Select from 'antd/lib/select'
import messages from './messages'
import {
  Container,
  BackButton,
  RowInput,
  InputDiv,
  Input,
  Label,
  AddItem,
  SubLabel,
  ButtonDelete,
  PreviewImage,
  UploadSection,
  BuildButton
} from './styledComponents'
import LockerTable from '../../LockerTable'
import Dragger from '../../TeamDragger'
import ImageCropper from '../../ImageCropper'
const Option = Select.Option

interface Props {
  history: any
  currentCurrency: string
  teamSizeRange: string
  openCropper: boolean
  imagePreviewUrl?: string
  banner?: string
  formatMessage: (messageDescriptor: any) => string
}

export class CreateStore extends React.Component<Props, {}> {
  handleGoBack = () => {
    const { history } = this.props
    history.push('/admin/team-stores')
  }
  render() {
    const {
      formatMessage,
      teamSizeRange,
      currentCurrency,
      openCropper,
      imagePreviewUrl,
      banner
    } = this.props
    return (
      <Container>
        <BackButton onClick={this.handleGoBack}>
          <Icon type="left" />
          <FormattedMessage {...messages.back} />
        </BackButton>
        <RowInput>
          <InputDiv fullSize={true}>
            <FormattedMessage {...messages.teamStoreName} />
            <Input
              size="large"
              value={''}
              name="name"
              onChange={() => {}}
              placeholder={formatMessage(messages.teamStoreNameHolder)}
            />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv fullSize={true}>
            <FormattedMessage {...messages.selectUser} />
            <Input
              size="large"
              value={''}
              name="name"
              onChange={() => {}}
              placeholder={formatMessage(messages.selectUserHolder)}
            />
          </InputDiv>
          <InputDiv>
            <FormattedMessage {...messages.teamStoreType} />
            <Select
              size="large"
              value={''}
              style={{ width: '100%' }}
              onChange={() => {}}
            >
              <Option value="onDemand">
                <FormattedMessage {...messages.onDemand} />
              </Option>
              <Option value="fixedDate">
                <FormattedMessage {...messages.fixedDate} />
              </Option>
            </Select>
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv>
            <FormattedMessage {...messages.cutOffDate} />
            <Input
              size="large"
              value={''}
              name="name"
              onChange={() => {}}
              placeholder={''}
            />
          </InputDiv>
          <InputDiv>
            <FormattedMessage {...messages.desiredDate} />
            <Input
              size="large"
              value={''}
              name="name"
              onChange={() => {}}
              placeholder={''}
            />
          </InputDiv>
          <InputDiv>
            <FormattedMessage {...messages.featured} />
            <Input
              size="large"
              value={''}
              name="name"
              onChange={() => {}}
              placeholder={''}
            />
          </InputDiv>
        </RowInput>
        <Label>
          <FormattedMessage {...messages.addStoreItems} />
        </Label>
        <AddItem type="primary" ghost={true} size="large" onClick={() => {}}>
          {`+ ${formatMessage(messages.addItem)}`}
        </AddItem>
        <LockerTable
          {...{ formatMessage, teamSizeRange, currentCurrency }}
          items={[]}
          hideQuickView={true}
          onPressDelete={() => {}}
          onPressQuickView={() => {}}
          onPressVisible={() => {}}
          onMoveRow={() => {}}
        />
        <UploadSection>
          <Label>
            <FormattedMessage {...messages.addBanner} />
            <SubLabel>
              <FormattedMessage {...messages.optional} />
            </SubLabel>
          </Label>
          <Upload
            beforeUpload={() => {}}
            multiple={false}
            showUploadList={false}
            supportServerRender={true}
          >
            <Button>{formatMessage(messages.changeLabel)}</Button>
          </Upload>
          <ButtonDelete onClick={() => {}}>
            {formatMessage(messages.deleteLabel)}
          </ButtonDelete>
        </UploadSection>
        {imagePreviewUrl || banner ? (
          <PreviewImage src={imagePreviewUrl || banner} />
        ) : (
          <Dragger onSelectImage={() => {}} />
        )}
        <BuildButton>
          <FormattedMessage {...messages.buildStore} />
        </BuildButton>
        <ImageCropper
          {...{ formatMessage }}
          open={openCropper}
          requestClose={() => {}}
          setImage={() => {}}
          image={''}
        />
      </Container>
    )
  }
}

export default CreateStore
