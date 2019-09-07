/**
 * Styled Components - Created by cazarez on 11/04/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE, RED, GRAY_DARK, GRAY_STRONG, GRAY } from '../../theme/colors'

export const Container = styled.div`
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
  }
`

export const Text = styled.div`
  color: #fff;
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
  width: 658px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: auto;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }
`

export const CardContent = styled.div`
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 #dcdcdc;
  position: relative;
`

export const CardTitle = styled.div`
  cursor: text;
  text-shadow: 0px 2px 4px ${GRAY_DARK};
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
  justify-content: space-between;
`

export const ShareButton = styled(Button)`
  height: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  margin-left: 10px;

  span {
    color: #5f6062;
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
  width: 40%;

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
  padding: 0px 8px;
  border-radius: 2px;
  margin-left: 10px;
  @media (max-width: 480px) {
    margin-left: 0;
    width: 76px;
  }
`
