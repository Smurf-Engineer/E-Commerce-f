/**
 * OptionsController Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import undoIcon from '../../../assets/Undo.svg'
import redoIcon from '../../../assets/Redo.svg'
import resetIcon from '../../../assets/Reset.svg'
import blankIcon from '../../../assets/Blank.svg'
import {
  OptionsContainer,
  Options,
  OptionButton,
  Divider
} from './styledComponents'

interface Props {
  undoEnabled: boolean
  redoEnabled: boolean
  onClickUndo: () => void
  onClickRedo: () => void
  onClickReset: () => void
  onClickClear: () => void
}

const OptionsController = ({
  undoEnabled,
  redoEnabled,
  onClickUndo,
  onClickRedo,
  onClickReset,
  onClickClear
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

  return (
    <OptionsContainer>
      <Options>
        <OptionButton onClick={handleUndoClick}>
          <img src={undoIcon} />
        </OptionButton>
        <Divider />
        <OptionButton onClick={handleRedoClick}>
          <img src={redoIcon} />
        </OptionButton>
      </Options>
      <Options>
        <OptionButton onClick={onClickReset} withMargin={true}>
          <img src={resetIcon} />
        </OptionButton>
      </Options>
      <Options>
        <OptionButton onClick={onClickClear}>
          <img src={blankIcon} />
        </OptionButton>
      </Options>
    </OptionsContainer>
  )
}

export default OptionsController
