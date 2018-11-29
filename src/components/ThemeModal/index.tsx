/**
 * ThemeModal Component - Created by david on 29/11/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import { Theme } from '../../types/common'
import Upload from 'antd/lib/upload'
import { Container, Image, Info, DraggerContainer } from './styledComponents'

const { Dragger } = Upload

interface Props {
  theme: Theme | null
  onCancel: () => void
}

class ThemeModal extends React.PureComponent<Props, {}> {
  render() {
    const { onCancel, theme } = this.props
    const open = !!theme
    let content = null
    if (open) {
      content = (
        <Container>
          <Image src={theme!.image} />
          <Info>
            <Input
              placeholder={theme!.name}
              // value={''}
              // onChange={this.handleOnUpdateName}
            />
            <DraggerContainer>
              <Dragger>
                <p className="ant-upload-drag-icon">
                  <Icon style={{ fontSize: 24 }} type="upload" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  302 x 302 px. Files jpg, jpeg, png.
                </p>
              </Dragger>
            </DraggerContainer>
          </Info>
        </Container>
      )
    }
    return (
      <Modal
        okText="Save"
        width={'50%'}
        {...{ onCancel }}
        visible={open}
        title="Edit theme"
        destroyOnClose={true}
        onOk={this.handleOnSave}
      >
        {content}
      </Modal>
    )
  }

  handleOnSave = () => {}
}

export default ThemeModal
