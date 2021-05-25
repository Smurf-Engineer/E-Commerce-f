/**
 * Styled Components - Created by eduardoquintero on 17/11/20.
 */
import styled from 'styled-components'
import { GRAY_DARK, RED, GRAY_LIGHT, GRAY_LIGHTEST, BLACK , WHITE } from '../../../theme/colors'

export const Container = styled.div`
  width: 100%;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

export const TextDiv = styled.div`
  height: 118px;
  margin: 12px;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${WHITE};
  min-height: 533px;
  width: 340px;
  margin-right: 30px;
  transition: all 0.25s;
  cursor: pointer;
  padding: 20px;
  &:hover {
    box-shadow: 0 3px 11px 1px rgba(0, 0, 0, 0.15);
  }
  &:last-child {
    margin-right: 0;
  }
  @media (min-width: 320px) and (max-width: 748px) {
    width: 100%;
    min-height: 390px;
    margin-right: 0px;
    margin-top: 32px;
    &:first-child {
      margin-top: 0px;
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
  padding: 60px;
  height: 279px;
  display: flex;
  justify-content: center;
  & img {
    max-width: 128px;
    width: 100%;
  }
  @media (min-width: 320px) and (max-width: 748px) {
    padding: 20px;
    min-height: 178px;
  }
`

export const DesignsCardsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 748px) {
    flex-flow: column;
    padding: 20px;
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

export const Text = styled.div`
  font-size: 14px;
  letter-spacing: 0.8px;
`

export const Button = styled.div`
  padding: 10px 13px;
  font-size: 16px;
  border: 2px solid ${RED};
  color: ${RED};
  border-radius: 2px;
  transition: all 0.25s ease;
  text-align: center;
  &:hover {
    cursor: pointer;
    background: ${RED};
    color: ${WHITE};
  }
`