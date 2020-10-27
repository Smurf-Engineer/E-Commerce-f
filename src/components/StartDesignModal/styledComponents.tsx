/**
 * Styled Components - Created by eduardoquintero on 19/10/20.
 */
import styled from 'styled-components'
import CheckImg from '../../assets/green_check.svg'
import { BLACK, GRAY_DARK, GRAY_LIGHTEST, WHITE, GRAY_LIGHT } from '../../theme/colors'

export const Container = styled.div`
  & .ant-modal {
    background: blue;
  }
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

export const List = styled.ul`
  padding: 0;
  margin: 40px 28px 0 40px;
  list-style: none;
  text-align: left;
  list-style-image: url(${CheckImg});
`

export const Item = styled.li`
  margin-bottom: 10px;
  line-height: 25px;
`

export const Icon = styled.img`
  width: 100%;
  max-width: 90px;
  margin-right: 16px;
`

export const BannerBack = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  background: lime;
  color: ${WHITE};
  width: 100%;
  transform-style: preserve-3d;
  perspective: 800px;
  animation-fill-mode: both;

  -webkit-transform-origin: bottom;
  transform-origin: bottom;

  transition: all 1s cubic-bezier(0.390, 0.575, 0.565, 1.000);

  &.folded {
    -webkit-transform: rotateX(180deg);
    transform: rotateX(180deg);
  }
  &.unfolded {
    -webkit-transform: rotateX(0);
    transform: rotateX(0);
  }
`