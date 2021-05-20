/**
 * ColorPicker Component - Created by eduardo on 11/01/19.
 */
import * as React from 'react'
import messages from '../messages'
import { Message, UpgradeItem, UpgradeOptions } from '../../../types/common'

import { Cell, UpgradeTitle, QuestionSpan, StyledSelect } from './styledComponents'

interface Props {
  selectedUpgrade?: UpgradeItem
  startColumn: number
  endColumn: number
  upgrade: UpgradeItem
  upgradeTitle: string
  upgradeOptions: UpgradeOptions[]
  formatMessage: (messageDescriptor: Message) => string
  openUpgrade: () => void
  upgradeChange: (value: string) => void
}

class SelectUpgrade extends React.PureComponent<Props> {
  handleOpenUpgrade = () => {
    const { openUpgrade } = this.props
    openUpgrade()
  }
  handleUpgradeChange = (value: string) => {
    const { upgradeChange } = this.props
    upgradeChange(value)
  }
  render() {
    const { upgrade, upgradeTitle, startColumn, endColumn, upgradeOptions, formatMessage, selectedUpgrade } = this.props
    
    return (
      <Cell start={startColumn} end={endColumn} align="column">
        <UpgradeTitle>
          {upgrade.name}
          <QuestionSpan onClick={this.handleOpenUpgrade} />
        </UpgradeTitle>
        <StyledSelect
          onChange={this.handleUpgradeChange}
          showSearch={false}
          placeholder={formatMessage(messages[upgradeTitle])}
          optionFilterProp="children"
          value={selectedUpgrade ? selectedUpgrade.name : undefined}
          selectWidth="100%"
          allowClear={true}
        >
          {upgradeOptions}
        </StyledSelect>
      </Cell>
    )
  }
}

export default SelectUpgrade
