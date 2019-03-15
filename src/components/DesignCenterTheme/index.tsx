/**
 * DesignCenterGrid Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Modal from 'antd/lib/modal'
import messages from './messages'
import withLoading from '../WithLoadingData'
import { QueryProps, ThemeModalType, Theme } from '../../types/common'
import { themesQuery } from './data'
import ThemeItem from '../Theme'
import { Container, Row, ModalMessage } from './styledComponents'
import ModalTitle from '../ModalTitle'
import ModalFooter from '../ModalFooter'
import find from 'lodash/find'
import get from 'lodash/get'
interface Data extends QueryProps {
  themes: Theme[]
}

interface Props {
  themeModalData: ThemeModalType
  currentTheme: number
  data: Data
  loadingModel: boolean
  designHasChanges: boolean
  productId: number
  isMobile: boolean
  placeholders?: boolean
  onSelectTheme: (id: number, name?: string) => void
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
  designHasChanges,
  productId
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
    const themeName = get(
      find(data.themes, theme => theme.id === id),
      'name',
      ''
    )
    onSelectTheme(id, themeName)
  }

  const cancelReselectTheme = () => {
    openNewThemeModalAction(false)
  }

  const { themes = [] } = data
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
  graphql<Data, Props>(themesQuery, {
    options: ({ productId, placeholders }) => ({
      variables: { id: productId, placeholders }
    })
  }),
  withLoading
)(DesignCenterGrid)

export default DesignCenterGridWithData
