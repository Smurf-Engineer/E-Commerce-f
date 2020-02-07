/**
 * Styled Components - Created by miguelcanobbio on 16/08/18.
 */
import styled from 'styled-components'
import icon from 'antd/lib/icon'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { GRAY_DARK, GRAY_LIGHTEST, WHITE, RED } from '../../../theme/colors'

interface DivProps {
  enable: boolean
}

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  padding-top: 48px;
  margin-bottom: 10vh;
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
  margin-bottom: 4px;
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
  margin-bottom: 15px;
`

export const PreflightDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 16px;
  font-weight: bold;
`

export const WarningIcon = styled(Icon)`
  font-size: 18px;
  color: ${RED};
  margin-left: -26px;
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
`
