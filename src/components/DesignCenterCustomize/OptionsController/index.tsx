/**
 * OptionsController Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import undoIcon from '../../../assets/Undo.svg'
import redoIcon from '../../../assets/Redo.svg'
import resetIcon from '../../../assets/Reset.svg'
import messages from './messages'
// TODO: Waiting for client definition
// import blankIcon from '../../../assets/Blank.svg'
import {
  OptionsContainer,
  Options,
  OptionButton,
  Divider
} from './styledComponents'

interface Props {
  undoEnabled: boolean
  redoEnabled: boolean
  resetEnabled: boolean
  onClickUndo: () => void
  onClickRedo: () => void
  onClickReset: () => void
  onClickClear: () => void
  formatMessage: (messageDescriptor: any) => string
}

const OptionsController = ({
  undoEnabled,
  redoEnabled,
  resetEnabled,
  onClickUndo,
  onClickRedo,
  onClickReset,
  onClickClear,
  formatMessage
}: Props) => {
  const handleUndoClick = () => {
    if (undoEnabled) {
      onClickUndo()
    }
  }

  const handleRedoClick = () => {
    if (redoEnabled) {
      onClickRedo()
    }
  }

  const handleResetClick = () => {
    if (resetEnabled) {
      onClickReset()
    }
  }

  return (
    <OptionsContainer>
      <Options>
        <Tooltip placement="right" title={formatMessage(messages.undo)}>
          <OptionButton disabled={!undoEnabled} onClick={handleUndoClick}>
            <img src={undoIcon} />
          </OptionButton>
        </Tooltip>
        <Divider />
        <Tooltip placement="right" title={formatMessage(messages.redo)}>
          <OptionButton disabled={!redoEnabled} onClick={handleRedoClick}>
            <img src={redoIcon} />
          </OptionButton>
        </Tooltip>
      </Options>
      <Options>
        <Tooltip placement="right" title={formatMessage(messages.reset)}>
          <OptionButton
            disabled={!resetEnabled}
            onClick={handleResetClick}
            withMargin={true}
          >
            <img src={resetIcon} />
          </OptionButton>
        </Tooltip>
      </Options>
      {/* // TODO: Waiting for client definition
      <Options>
        <OptionButton onClick={onClickClear}>
          <img src={blankIcon} />
        </OptionButton>
     </Options> */}
    </OptionsContainer>
  )
}

export default OptionsController
