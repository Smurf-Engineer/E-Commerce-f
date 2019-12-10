/**
 * FontTab Component - Created by Jesús Apodaca on 04/12/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import FontsList from '../../../components/FontsList'
import AntdTabs from 'antd/lib/tabs'

import messages from './messages'

import { Container, Top, TabsContainer } from './styledComponents'
import { Message } from '../../../types/common'

interface Props {
  fonts: string[]
  visibleFonts: any[]
  searchText: string
  selectedFonts: { [id: string]: boolean }
  changeFont: (font: string, active: boolean) => void
  setGoogleFontsList: (data: any) => void
  addFont: (font: string) => void
  onUpdateSearchText: (text: string) => void
  formatMessage: (messageDescriptor: Message) => void
  getGoogleFonts: () => void
}

const { TabPane } = AntdTabs

const INSTALLED_FONTS = 'INSTALLED_FONTS'
const ALL_FONTS = 'ALL_FONTS'

class FontTab extends React.PureComponent<Props> {
  render() {
    const {
      setGoogleFontsList,
      fonts,
      visibleFonts,
      addFont,
      selectedFonts,
      changeFont,
      onUpdateSearchText,
      searchText,
      formatMessage,
      getGoogleFonts
    } = this.props
    return (
      <Container>
        <Top>
          <FormattedMessage {...messages.selectColor} />
        </Top>
        <TabsContainer>
          <AntdTabs defaultActiveKey={INSTALLED_FONTS} size="small">
            <TabPane key={INSTALLED_FONTS} tab={'Installed'}>
              <FontsList
                googleList={false}
                {...{
                  setGoogleFontsList,
                  fonts,
                  selectedFonts,
                  changeFont,
                  visibleFonts,
                  onUpdateSearchText,
                  searchText,
                  formatMessage
                }}
              />
            </TabPane>
            <TabPane key={ALL_FONTS} tab={'Collection'}>
              <FontsList
                googleList={true}
                {...{
                  setGoogleFontsList,
                  fonts,
                  visibleFonts,
                  selectedFonts,
                  changeFont,
                  addFont,
                  onUpdateSearchText,
                  searchText,
                  formatMessage,
                  getGoogleFonts
                }}
              />
            </TabPane>
          </AntdTabs>
        </TabsContainer>
      </Container>
    )
  }
}

export default FontTab
