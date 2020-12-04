/**
 * Styled Components - Created by eduardoquintero on 17/11/20.
 */
import styled from 'styled-components'
import { GRAY_DARK, BLUE, GRAY_LIGHT, GRAY_LIGHTEST, BLACK , WHITE } from '../../../theme/colors'

export const Container = styled.div`
`

export const Title = styled.div`
  margin-bottom: 25px;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${WHITE};
  min-height: 608px;
  width: 400px;
  transition: all 0.25s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 11px 1px rgba(0, 0, 0, 0.15);
  }
  &:last-child {
    margin-left: 30px;
  }
  @media (min-width: 320px) and (max-width: 748px) {
    &:last-child {
      margin-left: 0px;
      margin-top: 32px;
    }
  }
  border: 1px solid ${GRAY_LIGHT};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  position: relative;
  display: flex;
  justify-content: space-between;
`

export const CardTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  color: ${BLACK};
  background: ${GRAY_LIGHTEST};
  text-align: center;
  padding: 30px;
  & img {
    width: 100%;
  }
`

export const DesignsCardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 748px) {
    flex-flow: column;
  }
`

export const Icon = styled.img`
  width: 100%;
  max-width: 90px;
  margin-right: 16px;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${WHITE};
`

export const Button = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid ${BLUE};
  border-radius: 2px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  color: ${BLUE};
  font-size: 16px;
  justify-content: center;
  align-items: center;
`