/**
 * Styled Components - Created by miguelcanobbio on 16/08/18.
 */
import styled from 'styled-components'
import {
  GRAY_DARK,
  GRAY_LIGHTEST,
  WHITE,
  RED,
  DARKER_GRAY,
  GRAY_SNOW,
  GRAY,
  BLUE
} from '../../../theme/colors'
import icon from 'antd/lib/icon'
import { BLACK } from '../../../screens/DesignerTool/constants'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import Select from 'antd/lib/select'
import Input from 'antd/lib/input'

interface DivProps {
  enable: boolean
}

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  padding-top: 48px;
  margin-bottom: 10vh;
  flex-flow: column;
`
export const RenderContainer = styled.div`
  width: 600px;
  position: relative;
`
export const Image = styled.img`
  width: 320px;
  height: 320px;
  background-color: ${GRAY_LIGHTEST};
  object-fit: contain;
`

export const Code = styled.div`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-right: 8px;
`

export const StatusContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`

export const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.11px;
`

export const Status = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.11px;
  margin-left: 8px;
`

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  width: 325px;
  margin-left: 32px;
  min-height: 320px;
  & > .upload > div:first-child {
    margin-top: 10px;
    width: 100%;
    & button {
      width: 100%;
    }
  }
`

export const FinalSvg = styled.div`
  margin: 16px 0;
`

export const AssetsLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
`

export const ButtonContainer = styled.div`
  display: inline-block;
  margin-left: 8px;
`

export const Icon = styled(icon)`
  margin-right: 8px;
`

export const NoteIcon = styled(icon)`
  margin-right: 16px;
  margin-left: 12px;
`

export const RenderLayout = styled.div``

export const ThumbnailLabel = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.18px;
  line-height: 22px;
  margin-top: 10px;
`

export const ChangesContainer = styled.div`
  background-color: ${WHITE};
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 30px;
  width: 100%;
  z-index: 2;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
  transform: translate(0, 100px);
  box-shadow: 0px -2px 15px rgba(179, 179, 179, 0.3);
  &.show {
    transform: translate(0, 0);
  }
`
export const MessageContainer = styled.div`
  margin-right: 40px;
`

export const ModelNameContainer = styled.div`
  margin-bottom: 4px;
  display: flex;
    align-items: center;
    font-size: 16px;
`

export const ProAssistNotes = styled.div`
  width: 100%;
  margin-bottom: 18px;
`

export const NoteContainer = styled.div`
  text-align: left;
  margin-bottom: 12px;
`

export const NoteTitle = styled.div`
  font-style: italic;
  font-size: 13px;
  color: ${DARKER_GRAY};
`

export const NoteText = styled.div``

export const ProAssistTitle = styled.div`
  display: flex;
  font-weight: bold;
  max-width: 246px;
  align-items: center;
  margin-bottom: 14px;
`

export const DataContainer = styled.div``

export const SideData = styled.div``

export const ProAssistBackground = styled.div`
  max-height: 190px;
  overflow-y: scroll;
  padding: 8px 8px 0;
  background: ${GRAY_SNOW};
`

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const AddNote = styled.div`
  border: 1px solid ${BLACK};
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    background: ${GRAY_LIGHTEST};
  }
`

export const PreflightDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 16px;
  font-weight: bold;
  position: relative;
`

export const WarningIcon = styled(Icon)`
  font-size: 18px;
  color: ${RED};
  position: absolute;
  left: -28px;
  transition: all 0.25s;
  opacity: ${({ enable }: DivProps) => (enable ? 1 : 0)};
`

export const PreflightCheckbox = styled(Checkbox)`
  display: flex;
  flex-flow: row-reverse;
  align-items: center;
  font-size: 16px;
  transition: all 0.5s;
  justify-content: space-between;
  span {
    padding: 0;
    margin-right: 10px;
    margin-bottom: 2px;
  }
  .ant-checkbox {
    margin-top: 2px;
    margin-bottom: 0;
  }
`

export const Colors = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

interface ColorProps {
  color?: string
}

export const Color = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid
    ${({ color }: ColorProps) =>
    color && color.toLowerCase() !== WHITE.toLowerCase() ? color : GRAY};
  background-color: ${({ color }: ColorProps) => color || WHITE};
  align-self: center;
`

export const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`
export const ColorName = styled.p`
  margin: 5px 0 0 0;
`

export const RepsDiv = styled.div`
  width: 270px;
`

export const Selectable = styled.div`
  margin-bottom: 12px;
`

export const Subtitle = styled.div``

export const StyledSelect = styled(Select)`
  width: 100%;
  margin-top: 4px;
`

export const LockerLink = styled.div`
  color: ${BLUE};
  text-decoration: underline;
  cursor: pointer;
`

export const EditButton = styled.div`
  color: ${RED};
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.23px;
  line-height: 25px;
  text-transform: uppercase;
`

export const LegacyInput = styled(Input)`
  margin: 16px 0 4px -37px;
  width: 350px;
  display: block;
  border-radius: 0px;
  .ant-modal-confirm-content {
    margin-left: 0;
  }
`

export const OkStyle = {
  background: BLUE,
  color: WHITE,
  border: `1px solid ${BLUE}`
}