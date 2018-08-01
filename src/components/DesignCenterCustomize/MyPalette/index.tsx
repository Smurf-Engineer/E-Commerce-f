/**
 * MyPalette Component - Created by david on 28/02/18.
 */
import * as React from 'react'
import { List } from 'immutable'
import Message from 'antd/lib/message'
import Modal from 'antd/lib/modal'

import PaletteCard from '../../PaletteCard'
import messages from './messages'

import { Palette, MyPaletteDesignCenterModals } from '../../../types/common'
import {
  Container,
  Button,
  Input,
  Padding,
  Divider,
  ListContainer,
  InputWrapper,
  ModalMessage
} from './styledComponents'
import ModalTitle from '../../ModalTitle'
import ModalFooter from '../../ModalFooter'

interface Props {
  palettes: Palette[]
  paletteName: string
  colors: string[]
  myPaletteModals: MyPaletteDesignCenterModals
  onSelectPalette: (colors: string[]) => void
  onSetPalettes: (palettes: Palette[]) => void
  onChangePaletteName: (name: string) => void
  formatMessage: (messageDescriptor: any, values?: {}) => string
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
}

class MyPalette extends React.PureComponent<Props> {
  componentWillMount() {
    const { onSetPalettes } = this.props
    let palettes: Palette[] = []
    if (typeof window !== 'undefined') {
      const palettesJson = localStorage.getItem('palettes')
      if (palettesJson) {
        palettes = JSON.parse(palettesJson)
      }
    }
    onSetPalettes(palettes)
  }

  updatePaletteName = (event: React.FormEvent<HTMLInputElement>) => {
    const { onChangePaletteName } = this.props
    const { currentTarget: { value } } = event
    onChangePaletteName(value)
  }

  onSavePalette = () => {
    const {
      onSetPalettes,
      paletteName,
      onChangePaletteName,
      colors,
      formatMessage
    } = this.props
    if (!paletteName) {
      return
    }
    const palettesTest: Palette = {
      name: paletteName,
      colors
    }
    if (typeof window !== 'undefined') {
      const palettesJson = localStorage.getItem('palettes')
      let myPalettes: Palette[] = []
      if (palettesJson) {
        myPalettes = JSON.parse(palettesJson)
        myPalettes.push(palettesTest)
      } else {
        myPalettes.push(palettesTest)
      }
      localStorage.setItem('palettes', JSON.stringify(myPalettes))
      onSetPalettes(myPalettes)
      onChangePaletteName('')
      Message.success(formatMessage(messages.paletteSaved))
    }
  }

  onDeletePalette = () => {
    const {
      onSetPalettes,
      openPaletteModalAction,
      myPaletteModals: { idPaletteToExecuteAction }
    } = this.props
    if (typeof window !== 'undefined') {
      const palettesJson = localStorage.getItem('palettes')
      if (palettesJson) {
        const myPalettes = JSON.parse(palettesJson)
        const listOfPalettes = List.of(...myPalettes)
        const updatedList = listOfPalettes.remove(idPaletteToExecuteAction)
        const updatedPalettes = updatedList.toJS()
        localStorage.setItem('palettes', JSON.stringify(updatedPalettes))
        onSetPalettes(updatedPalettes)
      }
      openPaletteModalAction('delete', false)
    }
  }

  handleOnSelectPalette = () => {
    const {
      palettes,
      onSelectPalette,
      myPaletteModals: { idPaletteToExecuteAction },
      openPaletteModalAction
    } = this.props
    const colors = palettes[idPaletteToExecuteAction].colors
    onSelectPalette(colors)
    openPaletteModalAction('apply', false)
  }

  onCancelDeletePalette = () => {
    const { openPaletteModalAction } = this.props
    openPaletteModalAction('delete', false)
  }

  handleOnShowDeletePaletteModal = (index: number) => {
    const { openPaletteModalAction } = this.props
    openPaletteModalAction('delete', true, index)
  }

  onCancelAppyPalette = () => {
    const { openPaletteModalAction } = this.props
    openPaletteModalAction('apply', false)
  }

  handleOnShowApplyPaletteModal = (index: number) => {
    const { openPaletteModalAction } = this.props
    openPaletteModalAction('apply', true, index)
  }

  render() {
    const {
      palettes,
      paletteName,
      formatMessage,
      myPaletteModals: {
        openDeletePaletteModal,
        openApplyPaletteModal,
        idPaletteToExecuteAction
      }
    } = this.props
    const paletteList = palettes.map(({ name, colors }, id) => (
      <PaletteCard
        key={id}
        onClickDelete={this.handleOnShowDeletePaletteModal}
        onSelectPalette={this.handleOnShowApplyPaletteModal}
        {...{ id, name, colors, formatMessage }}
      />
    ))
    const paletteNameToApply =
      idPaletteToExecuteAction !== -1
        ? palettes[idPaletteToExecuteAction].name
        : ''
    return (
      <Container>
        <Padding>
          <InputWrapper disabled={!paletteName}>
            <Input
              value={paletteName}
              onChange={this.updatePaletteName}
              placeholder={formatMessage(messages.paletteNamePlaceHolder)}
              addonAfter={
                <Button disabled={!paletteName} onClick={this.onSavePalette}>
                  Save
                </Button>
              }
            />
          </InputWrapper>
        </Padding>
        <Divider />
        <ListContainer>{paletteList}</ListContainer>
        <Modal
          visible={openDeletePaletteModal}
          title={<ModalTitle title={formatMessage(messages.modalTitle)} />}
          footer={
            <ModalFooter
              onOk={this.onDeletePalette}
              onCancel={this.onCancelDeletePalette}
              {...{ formatMessage }}
            />
          }
          closable={false}
          maskClosable={false}
          destroyOnClose={true}
        >
          <ModalMessage>
            {formatMessage(messages.deletePaletteMessage)}
          </ModalMessage>
        </Modal>
        <Modal
          visible={openApplyPaletteModal}
          title={
            <ModalTitle
              title={formatMessage(messages.applyPalette, {
                paletteNameToApply
              })}
            />
          }
          footer={
            <ModalFooter
              onOk={this.handleOnSelectPalette}
              onCancel={this.onCancelAppyPalette}
              {...{ formatMessage }}
            />
          }
          closable={false}
          maskClosable={false}
          destroyOnClose={true}
        >
          <ModalMessage>
            {formatMessage(messages.applyPaletteMessage)}
          </ModalMessage>
        </Modal>
      </Container>
    )
  }
}

export default MyPalette
