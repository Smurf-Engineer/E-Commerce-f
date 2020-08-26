/**
 * Styled Components - Created by david on 08/06/18.
 */
import styled from 'styled-components'
import {
  WHITE,
  GRAY_LIGHTEST,
  GRAY_DARK,
  RED,
  GRAY_LIGHT,
  BLUE
} from '../../../theme/colors'
import { AVENIR_NEXT } from '../../../theme/fonts'
import Icon from 'antd/lib/icon'

export const Container = styled.div`
  height: 60vh;
  overflow: auto;

  @media (min-height: 800px) and (orientation: portrait) {
    height: 85vh;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    height: 70vh;
  }

  @media only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) {
    height: 78vh;
  }
`

export const DraggerContainer = styled.div`
  height: 50vh;
  padding: 8px;
`

export const DraggerBottom = styled.div`
  padding: 8px;

  .ant-upload.ant-upload-drag {
    background: ${WHITE};
    padding: 8px 0;
  }
`
export const LoginMessage = styled.div`
  font-size: 16px;
  line-height: 23px;
  margin-top: 16px;
  text-align: center;
`

export const Text = styled.div`
  color: ${WHITE};
`

export const Header = styled.div`
  background-color: ${GRAY_LIGHTEST};
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  min-height: 55px;
  align-items: center;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  flex: 1;
`

type Props = {
  color?: string
}

export const Recommendation = styled.div`
  color: ${({ color = GRAY_DARK }: Props) => color};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
  padding: 8px 34px;

  @media (min-width: 768px) and (max-width: 991px) {
    padding: 8px 10px;
  }
`

export const EmptyContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
`

export const LockContainer = styled.div`
  cursor: pointer;
  padding: 2px;
  display: inline-block;
  font-size: 20px;
`

export const CustomButton = styled.div`
  padding: 5px;
  border: 1px solid ${GRAY_DARK};
  border-radius: 4px;
  justify-content: center;
  width: 200px;
  margin-top: 22px;
  display: inline-flex;
  cursor: pointer;
  transition: background 0.4s ease, color 0.3s ease;
  &:hover {
    background: ${GRAY_DARK}
    color: ${WHITE}
  }
`

export const AddTextButton = styled.div`
  cursor: pointer;
  height: 40px;
  max-width: 100%;
  border: 2px solid ${RED};
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  color: ${RED};
  display: flex;
  margin: 16px;
  transition: all 0.2s;
  &:hover {
    background: ${RED};
    color: ${WHITE};
  }
`
export const LayersText = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.09px;
  line-height: 22px;
  margin: 0 16px 16px;
`

export const ImageLayers = styled.div`
  display: flex;
  flex-flow: column;
`

export const Layer = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${GRAY_LIGHT};
  align-items: center;
  cursor: move;
  background: ${WHITE};
`

export const DeleteLayer = styled.div`
  color: ${RED};
  font-family: ${AVENIR_NEXT};
  font-size: 12px;
  letter-spacing: 0.09px;
  cursor: pointer;
  margin-right: 8px;
  text-align: center;
  transition: all 0.2s;
  border-radius: 2px;
  padding: 7px;
  &:hover {
    background: ${RED};
    color: ${WHITE};
  }
`

export const EditLayer = styled.div`
  width: 54px;
  border: 1px solid ${GRAY_LIGHT};
  border-radius: 2px;
  text-align: center;
  padding: 7px;
  cursor: pointer;
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 12px;
  transition: all 0.2s;
  &:hover {
    background: ${GRAY_DARK};
    color: ${WHITE};
  }
`

export const ImageClip = styled.img`
  max-width: 58px;
  max-height: 58px;
  object-fit: contain;
`

export const ImageLeft = styled.div`
  flex: 1;
  text-align: center;
  background: ${GRAY_LIGHTEST};
  padding: 4px 8px;
  border-radius: 2px;
  margin-right: 8px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ArrowIcon = styled.img`
  padding-right: 8px;
  cursor: pointer;
`

export const LowerContainer = styled.div``

export const EmptyElements = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
  text-align: center;
  padding: 16px;
`

export const DragIcon = styled.img`
  max-width: 8px;
  margin-right: 8px;
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: -38px;
`

export const WarningIcon = styled(Icon)``

export const buttonStyle = {
  background: BLUE,
  border: 'none',
}