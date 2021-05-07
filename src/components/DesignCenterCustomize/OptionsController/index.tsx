/**
 * OptionsController Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import Tooltip from 'antd/lib/tooltip/'
import undoIcon from '../../../assets/Undo.svg'
import redoIcon from '../../../assets/Redo.svg'
import resetIcon from '../../../assets/Reset.svg'
import clearContentIcon from '../../../assets/clear-content-icon.svg'
import guideLineIcon from '../../../assets/guideline_icon.svg'
import messages from './messages'
// TODO: Waiting for client definition
// import blankIcon from '../../../assets/Blank.svg'
import {
  OptionsContainer,
  Options,
  OptionButton,
  Divider,
  ClearPlaceholderIcon,
  GuideIcon,
  GuideButton,
  ToolTipText
} from './styledComponents'

interface Props {
  undoEnabled: boolean
  redoEnabled: boolean
  resetEnabled: boolean
  placeholders: boolean
  showGuidelines: boolean
  guideline: boolean
  onClickUndo: () => void
  onClickRedo: () => void
  onClickReset: () => void
  onClickClear: () => void
  onClickGuides: () => void
  onClickResetPlaceholder: () => void
  formatMessage: (messageDescriptor: any) => string
}

const OptionsController = ({
  undoEnabled,
  redoEnabled,
  resetEnabled,
  guideline,
  showGuidelines,
  onClickGuides,
  onClickUndo,
  onClickRedo,
  onClickReset,
  onClickClear,
  formatMessage,
  placeholders,
  onClickResetPlaceholder
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
      {!!guideline &&
        <Options>
          <Tooltip
            placement="right"
            title={
              <ToolTipText dangerouslySetInnerHTML={{
                __html: formatMessage(messages.guidelines)
              }}/>
            }
          >
            <GuideButton onClick={onClickGuides}>
              <GuideIcon active={showGuidelines} src={guideLineIcon} />
            </GuideButton>
          </Tooltip>
        </Options>
      }
      {placeholders && (
        <Options>
          <Tooltip
            placement="right"
            title={formatMessage(messages.clearContent)}
          >
            <OptionButton withMargin={true} onClick={onClickResetPlaceholder}>
              <ClearPlaceholderIcon src={clearContentIcon} />
            </OptionButton>
          </Tooltip>
        </Options>
      )}
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
