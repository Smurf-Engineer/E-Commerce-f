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
  style?: string
  onSelectTheme: (id: number, name?: string) => void
  formatMessage: (messageDescriptor: any) => string
  openNewThemeModalAction: (open: boolean, themeId?: number) => void
}

export class DesignCenterGrid extends React.Component<Props, {}> {
  componentDidUpdate() {
    const { style, data, onSelectTheme, currentTheme } = this.props
    if (style && data && data.themes && currentTheme === -1) {
      const theme = find(data.themes, elem => elem.name.toLowerCase() === style.toLowerCase())
      if (theme) {
        const { id, name } = theme
        onSelectTheme(id, name)
      }
    }
  }
  selectTheme = () => {
    const { onSelectTheme, themeModalData: { themeId } } = this.props
    onSelectTheme(themeId)
  }
  handleOnSelectTheme = (id: number) => {
    const { data, currentTheme, onSelectTheme, designHasChanges, openNewThemeModalAction } = this.props
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
  cancelReselectTheme = () => {
    const { openNewThemeModalAction } = this.props
    openNewThemeModalAction(false)
  }
  render() {
    const {
      data,
      formatMessage,
      themeModalData: { openNewThemeModal },
    } = this.props
    if (data.error) {
      // TODO: Handle error.
      return <div>Error</div>
    }

    const { themes = [] } = data
    const list = themes.map(({ id, image, name }, index) => (
      <ThemeItem
        key={index}
        {...{ id, name, image }}
        onClick={this.handleOnSelectTheme}
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
              onOk={this.selectTheme}
              onCancel={this.cancelReselectTheme}
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
}

const DesignCenterGridWithData = compose(
  graphql<Data, Props>(themesQuery, {
    options: ({ productId }) => ({
      variables: { id: productId }
    })
  }),
  withLoading
)(DesignCenterGrid)

export default DesignCenterGridWithData
