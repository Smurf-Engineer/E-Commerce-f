/**
 * Styled Components - Created by eduardoquintero on 19/03/18.
 */
import styled from 'styled-components'
import Divider from 'antd/lib/divider'
import { BLUE_LIGHT, GRAY_STRONG } from '../../theme/colors'
export const Container = styled.div`
  .cont {
    width: auto;
    max-width: 800px;

    @media (min-width: 800px) {
      width: 800px;
    }
  }
`

export const Text = styled.div`
  color: #fff;
`

export const CloseIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    cursor: pointer;
  }
`

export const ProductInfContainer = styled.div`
  width: 329px;
  margin-bottom: 10px;
`
export const ProductInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 22px;
  width: auto;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`
export const DescriptionContent = styled.div`
  width: 329px;
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 0px;
  transition: visibility 0s, opacity 0.5s linear;
`

export const DetailsContent = styled.div`
  width: 329px;
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 0px;
  transition: visibility 0s, opacity 0.5s linear;
`

export const UpDownArrow = styled.img`
  &:hover {
    cursor: pointer;
  }
`

export const StyledDivider = styled(Divider)`
  margin: 10px 0;
  border-bottom: 1px solid #bebebe;
`

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

export const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
`
export const Button = styled.div`
  display: flex;
  text-transform: uppercase;
  padding: 14px;
  border: 1px solid ${GRAY_STRONG};
  color: ${GRAY_STRONG};
  border-radius: 5px;
  width: 240px;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border-color: ${BLUE_LIGHT};
    color: ${BLUE_LIGHT};
  }
`

export const ButtonsContainer = styled.div`
  display: inline-flex;
  margin: 0 auto;
  width: 80%;
  justify-content: space-evenly;
  margin-bottom: 25px;
`

export const ColorsImage = styled.img`
  width: 90%;
  margin: 0 auto;
`

export const TopText = styled.div`
  font-size: 13px;
  margin-bottom: 8px;
`

export const BottomText = styled.div`
  font-size: 11px;
  font-style: italic;
`
export const Info = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  font-size: 11px;
  left: 10px;
  transition: color 0.3s ease;
`

export const LastButtonContainer = styled.div`
  position: relative;
  &:hover > div {
    color: ${BLUE_LIGHT};
  }
`
