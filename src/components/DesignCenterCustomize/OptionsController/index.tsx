/**
 * OptionsController Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
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
  onClickUndo: () => void
  onClickRedo: () => void
  onClickReset: () => void
  onClickClear: () => void
}

const OptionsController = ({
  onClickUndo,
  onClickRedo,
  onClickReset,
  onClickClear
}: Props) => {
  return (
    <OptionsContainer>
      <Options>
        <OptionButton onClick={onClickUndo}>
          <img src={undoIcon} />
        </OptionButton>
        <Divider />
        <OptionButton onClick={onClickRedo}>
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
