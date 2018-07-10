/**
 * DesignCenterGrid Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import messages from './messages'
import withLoading from '../WithLoadingData'
import { QueryProps, ThemeModalType } from '../../types/common'
import { ThemeResult } from '../../types/common'
import { themesQuery } from './data'
import ThemeItem from '../Theme'
import { Container, Row, ModalMessage } from './styledComponents'
import ModalTitle from '../ModalTitle'
import ModalFooter from '../ModalFooter'

interface Data extends QueryProps {
  themes?: ThemeResult
}

interface Props {
  themeModalData: ThemeModalType
  currentTheme: number
  data: Data
  loadingModel: boolean
  designHasChanges: boolean
  onSelectTheme: (id: number) => void
  formatMessage: (messageDescriptor: any) => string
  openNewThemeModalAction: (open: boolean, themeId?: number) => void
}

export const DesignCenterGrid = ({
  data,
  onSelectTheme,
  formatMessage,
  currentTheme,
  themeModalData: { openNewThemeModal, themeId },
  openNewThemeModalAction,
  designHasChanges
}: Props) => {
  if (data.error) {
    // TODO: Handle error.
    return <div>Error</div>
  }

  const selectTheme = () => {
    onSelectTheme(themeId)
  }

  const handleOnSelectTheme = (id: number) => {
    if (currentTheme !== -1 && designHasChanges) {
      openNewThemeModalAction(true, id)
      return
    }
    onSelectTheme(id)
  }

  const cancelReselectTheme = () => {
    openNewThemeModalAction(false)
  }

  const themes = data.themes ? data.themes.themes || [] : []
  const list = themes.map(({ id, image, name }, index) => (
    <ThemeItem
      key={index}
      {...{ id, name, image }}
      onClick={handleOnSelectTheme}
    />
  ))
  return (
    <Container>
      <Row>{list}</Row>
      <Modal
        visible={openNewThemeModal}
        title={<ModalTitle title={formatMessage(messages.modalNewTheme)} />}
        footer={
          <ModalFooter
            onOk={selectTheme}
            onCancel={cancelReselectTheme}
            {...{ formatMessage }}
          />
        }
        closable={false}
        maskClosable={false}
        destroyOnClose={true}
      >
        <ModalMessage>
          {formatMessage(messages.modalNewThemeMessage)}
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
