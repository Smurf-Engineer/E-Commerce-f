/**
 * FontTab Component - Created by eduardoquintero on 19/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import FontList from '../../../../components/FontsList'
import AntdTabs from 'antd/lib/tabs'

import messages from './messages'

import { Container, Top, TabsContainer } from './styledComponents'

interface Props {}

const { TabPane } = AntdTabs

const INSTALLED_FONTS = 'INSTALLED_FONTS'
const ALL_FONTS = 'ALL_FONTS'

class FontTab extends React.PureComponent<Props> {
  render() {
    return (
      <Container>
        <Top>
          <FormattedMessage {...messages.selectColor} />
        </Top>
        <TabsContainer>
          <AntdTabs defaultActiveKey={INSTALLED_FONTS} size="small">
            <TabPane key={INSTALLED_FONTS} tab={'Installed'}>
              <FontList
                text={'NOVA' || ''}
                onSelectFont={() => console.log('sel')}
              />
            </TabPane>
            <TabPane key={ALL_FONTS} tab={'Collection'}>
              <FontList
                text={'NOVA' || ''}
                onSelectFont={() => console.log('sel')}
              />
            </TabPane>
          </AntdTabs>
        </TabsContainer>
      </Container>
    )
  }
}

export default FontTab
