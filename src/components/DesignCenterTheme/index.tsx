/**
 * DesignCenterGrid Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import messages from './messages'
import withLoading from '../WithLoadingData'
import { QueryProps } from '../../types/common'
import { ThemeResult } from '../../types/common'
import { themesQuery } from './data'
import ThemeItem from '../Theme'
import { Container, Row, ModalMessage } from './styledComponents'

interface Data extends QueryProps {
  themes?: ThemeResult
}

interface Props {
  openNewThemeModal: boolean
  data: Data
  loadingModel: boolean
  onSelectTheme: (id: number) => void
  formatMessage: (messageDescriptor: any) => string
  openNewThemeModalAction: (open: boolean) => void
}

export const DesignCenterGrid = ({
  data,
  onSelectTheme,
  formatMessage,
  openNewThemeModal
}: Props) => {
  if (data.error) {
    // TODO: Handle error.
    return <div>Error</div>
  }

  const themes = data.themes ? data.themes.themes || [] : []
  const list = themes.map(({ id, image, name }, index) => (
    <ThemeItem key={index} {...{ id, name, image }} onClick={onSelectTheme} />
  ))
  return (
    <Container>
      <Row>{list}</Row>
      <Modal
        visible={openNewThemeModal}
        title={formatMessage(messages.modalNewStyleTitle)}
        okText={formatMessage(messages.modalNewStyleConfirm)}
        onOk={() => {}}
        cancelText={formatMessage(messages.modalNewStyleCancel)}
        onCancel={() => {}}
        closable={false}
        maskClosable={false}
        destroyOnClose={true}
      >
        <ModalMessage>
          {formatMessage(messages.modalNewStyleMessage)}
        </ModalMessage>
      </Modal>
    </Container>
  )
}

const DesignCenterGridWithData = compose(
  graphql<Data>(themesQuery),
  withLoading
)(DesignCenterGrid)

export default DesignCenterGridWithData
