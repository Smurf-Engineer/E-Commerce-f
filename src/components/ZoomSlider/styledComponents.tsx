/**
 * Styled Components - Created by david on 05/03/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  right: 26px;
  top: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  display: flex;
  align-items: center;

  @media (min-width: 481px) and (max-width: 1024px) {
    display: none;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
`

export const Text = styled.div`
  color: #fff;
`

export const SliderContainer = styled.div`
  float: left;
  height: 200px;
`

export const Button = styled.div`
  user-select: none;
  cursor: pointer;
  height: 20px;
  width: 19.97px;
  border: 0.5px solid #dcdcdc;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  align-items: center;
  color: #bebebe;
  font-size: 17px;
  font-weight: 400;
  justify-content: center;
  display: flex;
`

export const BottomButton = styled.div`
  user-select: none;
  height: 20px;
  width: 19.97px;
  border: 0.5px solid #dcdcdc;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  left: -8.6px;
  bottom: -1.4px;
`
