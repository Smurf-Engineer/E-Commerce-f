/**
 * Styled Components - Created by david on 27/03/18.
 */
import styled from 'styled-components'
import AntdTabs from 'antd/lib/tabs'
import {
  BLUE,
  GRAY_LIGHT,
  GRAY_LIGHTEST,
  GRAY_SOFT,
  GRAY_STRONG,
  GREEN,
  GREEN_SELECTED,
  ORANGE,
  ORANGE_SELECTED,
  WHITE,
  GRAY_SNOW,
  RED_TRANSPARENT
} from '../../theme/colors'
import TextArea from 'antd/lib/input/TextArea'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'

interface RowProps {
  margin?: string
  borderBottom?: string
  paddingBottom?: string
  height?: string
  secondary?: boolean
  isAdmin?: boolean
}

export const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
`

export const ContainerError = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const Layout = styled.div`
  max-width: 400px;
  width: 100%;
`

export const StyledTabs = styled(AntdTabs)`
  flex: 1;
  text-align: center;
  .ant-tabs-nav {
    width: 100%;
  }
  .ant-tabs-tab {
    width: 50%;
    margin: 0;
  }
  .ant-tabs-ink-bar {
    width: 50%;
  }
  .ant-tabs-bar {
    margin: 0;
  }
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Message = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const Model = styled.div`
  color: #5f6062;
  user-select: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Row = styled.div`
  display: flex;
  margin-top: 16px;
  height: 20px;
`

export const QuickView = styled.img`
  cursor: pointer;
  margin-left: 8px;
`

export const RenderContainer = styled.div`
  width: 600px;
  position: relative;
`

export const InfoDiv = styled.div`
  margin-right: ${({ isAdmin }: RowProps) => isAdmin ? '8px' : '0'};
  margin-left: ${({ isAdmin }: RowProps) => isAdmin ? '0' : '8px'};
  display: inline-flex;
  flex-flow: column;
`

export const DesignChat = styled.div`
  padding: 0 14px;
  position: relative;
  display: flex;
  flex-flow: column;
  flex: 1;
  background: ${GRAY_SNOW};
`

export const TextAreaStyled = styled(TextArea)`
  border-radius: 0;
  border-bottom: 0px;
  outline: none;
  box-shadow: none;
  resize: none;
  padding-right: 128px;
  &:hover {
    border: 1px solid ${GRAY_LIGHT};
    border-bottom: 0px;
  }
  &:focus {
    border: 1px solid ${GRAY_LIGHT};
    border-bottom: 0px;
    outline: none;
    box-shadow: none;
    resize: none;
  }
`

export const ButtonContainer = styled.div`
  padding: 5px 2px;
  text-align: left;
  background: ${WHITE};
  border: 1px solid ${GRAY_LIGHT};
  border-top: 0;
`

export const SaveButton = styled(Button)`
  border-radius: 2px;
  font-size: 12px;
  height: 26px;
  padding: 0 18px;
  margin-left: 4px;
  background: ${BLUE};
  color: ${WHITE};
  border: none;
`

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: scroll;
`

export const IncomingMessage = styled.div`
  margin: 18px 0;
  display: flex;
  align-items: flex-start;
  flex-flow: ${({ isAdmin }: RowProps) => isAdmin ? 'row' : 'row-reverse'};
`

export const MessageHeader = styled.div`
  display: flex;
  margin-top: 4px;
  align-items: center;
  margin-right: ${({ isAdmin }: RowProps) => isAdmin ? '14px' : '0'};
  margin-left: ${({ isAdmin }: RowProps) => isAdmin ? '0' : '14px'};
`

export const TabContent = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  flex-flow: column;
`

export const Initials = styled.div`
  width: 24px;
  font-size: 12px;
  height: 24px;
  background: ${BLUE};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`

export const UserName = styled.div`
  margin-left: 12px;
  font-weight: bold;
`

export const DateMessage = styled.div`
  color: ${GRAY_SOFT};
  font-size: 9px;
  text-align: right;
  margin-top: 6px;
  margin-right: 4px;
`

export const JakrooLogo = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
`

export const UserIcon = styled(Icon)`
  color: ${WHITE};
`

export const MessageBox = styled.div`
  background: ${WHITE};
  padding: 8px;
  box-shadow: 0px 2px 7px 0px ${GRAY_LIGHT};
  display: inline-flex;
  flex-flow: column;
  border-radius: 5px;
  justify-content: space-between;
  align-items: flex-end;
`

export const ParentText = styled.div`
  border-left: 2px solid ${RED_TRANSPARENT};
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 12px;
  color: ${GRAY_STRONG};
  background: ${GRAY_LIGHTEST};
`

export const MessageBody = styled.div`
  display: inline-flex;
  width: 100%;
`

export const MessageType = styled.div`
  text-transform: uppercase;
  color: ${({ secondary }: RowProps) => secondary ? ORANGE : GREEN};
  background: ${({ secondary }: RowProps) => secondary ? ORANGE_SELECTED : GREEN_SELECTED};
  padding: 0 8px;
  font-size: 12px;
  display: flex;
  font-weight: bold;
  border-radius: 2px;
  align-items: center;
  margin-left: ${({ isAdmin }: RowProps) => !isAdmin ? '0' : '6px'};
  margin-right: ${({ isAdmin }: RowProps) => !isAdmin ? '6px' : '0'};
  max-height: 22px;
`

export const RequiredText = styled.div`
  font-size: 10px;
  font-style: italic;
  max-width: 43px;
  width: 100%;
  font-weight: bold;
  color: ${BLUE};
  padding: 2px;
  &:hover {
    cursor: pointer;
  }
`
