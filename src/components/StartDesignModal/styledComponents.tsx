/**
 * Styled Components - Created by eduardoquintero on 19/10/20.
 */
import styled from 'styled-components'
import CheckImg from '../../assets/green_check.svg'
import { BLACK, GRAY_DARK, GRAY_LIGHTEST, WHITE, GRAY_LIGHT, BLUE } from '../../theme/colors'

export const Container = styled.div`
  height: 100vh;
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
  margin: 0 28px 0 40px;
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
  width: 100%;
  z-index: 99;
  max-height: 180px;
`

interface FoldAnimationProps {
  order: number
}

export const FoldContent  = styled.div`
display: flex;
justify-content: space-between;
color: ${WHITE};
width: 100%;
animation-fill-mode: both;
-webkit-animation-fill-mode: both;

transform-style: preserve-3d;
-webkit-transform-style: preserve-3d;

transform-origin: bottom
-webkit-transform-origin: bottom;

transform-origin: top
-webkit-transform-origin: top;

transition: visibility 0.1s, transform 0.1s cubic-bezier(0.390, 0.575, 0.565, 1.000), 
  opacity 0.1s, max-height 0.1s;
-webkit-transition: visibility 0.1s, transform 0.1s cubic-bezier(0.390, 0.575, 0.565, 1.000), 
  opacity 0.1s, max-height 0.1s;

&.folded {
  opacity: 0;
  visibility: hidden;
  transform: rotateX(120deg) scaleY(0);
  -webkit-transform: rotateX(120deg) scaleY(0);

  max-height: 0;
  transition-delay: ${({ order }: FoldAnimationProps) => order === 5 ? 0 : 0.3 / order}s;
  -webkit-transition-delay: ${({ order }: FoldAnimationProps) => order === 5 ? 0 : 0.3 / order}s;
  &::after {
    visibility: hidden;
    background: rgba(200, 55, 55, 1);
    transition-delay: ${({ order }: FoldAnimationProps) => order === 5 ? 0 : 0.3 / order}s;
    -webkit-transition-delay: ${({ order }: FoldAnimationProps) => order === 5 ? 0 : 0.3 / order}s;
  }
}
&.unfolded {
  max-height: 130px;
  opacity: 1;
  visibility: visible;

  transform: rotateX(0);
  -webkit-transform: rotateX(0);

  transition-delay: ${({ order }: FoldAnimationProps) => order === 1 ? 0 : order * 0.1}s;
  -webkit-transition-delay: ${({ order }: FoldAnimationProps) => order === 1 ? 0 : order * 0.1}s;

  &::after {
    visibility: visible;
    background: rgba(200, 55, 55, 0);
    transition-delay: ${({ order }: FoldAnimationProps) => order === 1 ? 0 : order * 0.1}s;
    -webkit-transition-delay: ${({ order }: FoldAnimationProps) => order === 1 ? 0 : order * 0.1}s;
  }
}
&::after {
  position: absolute;
  content: '';
  display: block;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  mix-blend-mode: normal;
  transition: all 0.1s ease;
  -webkit-transition: all 0.1s ease;
}
`

interface BannerProps {
  src: string
}

export const BannerDesign = styled.div`
  background-image: url(${({ src }: BannerProps) => src});
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

export const Banner = styled.img`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${WHITE};
  object-fit: cover;
`

export const UnfoldContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`

export const MobileCard = styled.div`
  font-size: 22px;
  background: ${WHITE};
  padding: 20px;
  width: 100%;
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
export const ColorWheel = styled.img`
  width: 20px;
  margin-right: 12px;
`

export const MobileContainer = styled.div`
  perspective: 340px;
  margin: 0 18px;
  -webkit-perspective: 340px;
  display: inline;
`

export const CloseIcon = styled.img`
  position: fixed;
  right: 19px;
  top: 28px;
  z-index: 2;
  background: black;
  padding: 9px;
  max-width: 33px;
  border-radius: 25px;
  border: 1px solid rgb(99, 98, 98);
`