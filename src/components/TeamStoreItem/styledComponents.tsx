/**
 * Styled Components - Created by cazarez on 11/04/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import {
  WHITE,
  GRAY_DARK,
  GRAY_STRONG,
  GRAY,
  GRAY_LIGHT,
  RED,
  RED_TRANSPARENT,
  BLACK_LIGHT
} from '../../theme/colors'
import { BLACK } from '../../screens/DesignerTool/constants'

interface DivProps {
  small?: boolean
}

export const Container = styled.div`
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 680px) {
    width: 100%;
    overflow: hidden;
  }
`

export const Text = styled.div`
  color: ${WHITE};
`

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  max-height: 143px;
  object-fit: cover;
`

export const TitleName = styled.div`
  height: 143px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${GRAY};
  color: ${GRAY_STRONG};
  font-size: 22px;
  font-weight: bold;
}`

export const TeamStoreCard = styled.div`
  width: ${({ small }: DivProps) => (small ? '428px' : '658px')};

  @media (max-width: 1648px) {
    width: ${({ small }: DivProps) => (small ? '390px' : '600px')};
  }
  @media (max-width: 1375px) {
    width: ${({ small }: DivProps) => (small ? '355px' : '545px')};
  }
  @media (max-width: 1224px) {
    width: ${({ small }: DivProps) => (small ? '280px' : '430px')};
  }
  @media (max-width: 1024px) {
    width: ${({ small }: DivProps) => (small ? '270px' : '415px')};
  }

  @media (min-width: 370px) and (max-width: 767px) {
    width: 100%;
  }
`

interface CardProps {
  closedMessage?: string
}

export const CardContent = styled.div`
  background-color: ${WHITE};
  box-shadow: 0 2px 4px 0 ${GRAY_LIGHT};
  position: relative;
  &: before {
    background: ${({ closedMessage }: CardProps) =>
    closedMessage ? RED_TRANSPARENT : 'none'};
    color: ${BLACK};
    top: 8px;
    padding: 5px;
    position: absolute;
    text-align: center;
    content: ${({ closedMessage }: CardProps) => `'${closedMessage}'`};
    width: 100%;
  }
`

export const CardTitle = styled.div`
  cursor: text;
  text-shadow: 0px 2px 4px ${GRAY_DARK};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const StoreType = styled.div`
  cursor: text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  text-align: center;
  background: ${BLACK_LIGHT};
  border: 1px solid ${WHITE};
  color: ${WHITE};
  font-weight: 500;
  height: 24px;
  padding: 0 12px;
  @media (max-width: 480px) {
    line-height: 20px;
    min-width: 45%;
    border-color: ${GRAY};
  }
`

export const BottomContainer = styled.div`
  color: ${WHITE};
  font-size: 18px;
  width: 100%;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
  position: absolute;
  bottom: 0px;
  background: linear-gradient(0deg, #54545494, #54545400);
  padding: 4px 8px;
  display: flex;
  justify-content: flex-end;
`

export const ShareButton = styled(Button)`
  height: 24px;
  border: 1px solid ${GRAY_LIGHT};
  border-radius: 2px;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  margin-left: 10px;

  span {
    color: ${GRAY_DARK};
    font-size: 14px;
    letter-spacing: 0.1px;
    line-height: 19px;
    text-align: center;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    width: 35%;
  }
`

export const EditButton = ShareButton.extend``

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
  }
`
export const DeleteLabel = styled.span`
  display: flex;
  align-items: center;
  color: ${WHITE};
  font-size: 14px;
  font-weight: normal;
  background: ${RED};
  justify-content: center;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.18);
  border-radius: 2px;
  margin-left: 10px;
  padding: 0 12px;
  @media (max-width: 480px) {
    margin-left: 0;
    width: 76px;
  }
`
