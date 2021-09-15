/**
 * Styled Components - Created by cazarez on 12/03/18.
 */
import styled from 'styled-components'
import Breadcrumb from 'antd/lib/breadcrumb'
import Button from 'antd/lib/button'
import InputNumber from 'antd/lib/input-number'
import {
  RED,
  BLACK,
  BLUE_DARK,
  DARKER_GRAY,
  GRAY,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_HEADER,
  WHITE,
  BLUE,
  BLUE_SKY,
  GREEN_STATUS,
  BLACK_3D_LIGHT,
  BLACK_3D_DARK
} from '../../theme/colors'
import Icon from 'antd/lib/icon'

interface StyledProps {
  selected?: boolean
  withBorder?: boolean
  marginLeft?: string
}

export const Container = styled.div`
  background-color: ${WHITE};
  max-width: 1452px;
  width: 100%;
  margin: 0 auto;
`

export const Content = styled.div`
  display: flex;
  max-width: 1658px;
  margin: 0 auto;
  margin-bottom: 36px;
  @media (min-width: 320px) and (max-width: 480px) {
    display: block;
  }

  @media (min-width: 1440px) {
    justify-content: center;
  }
`
export const MenIcon = styled(Icon)`
  margin-left: 8px;
  color: ${BLUE_SKY};
`

export const SizeChart = styled.img`
  max-width: 128px;
  width: 100%;
  object-fit: contain;
  margin: 6px 0 28px 0;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    max-width: 100%;
    object-fit: contain;
    margin: 0 0 22px 0;
    padding-right: 22px;
    height: 54px;
    width: 100%;
  }
`

export const WomenIcon = styled(Icon)`
  margin-left: 8px;
  color: deeppink;
`
export const ImagePreview = styled.div`
  width: 50%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    padding: 0;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 1440px) {
    max-width: 1000px;
  }
`

export const ProductData = styled.div`
  padding: 18px;
  width: 50%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`
export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;
  }
`

export const HowItFits = styled.div`
  margin: 16px 0;
  margin-bottom: 16px;
  height: 40px;
  width: 190px;
  color: ${WHITE};
  border: 2px solid ${GRAY_LIGHT};
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: all 0.2s ease;
  z-index: 2;
  background: ${BLACK_3D_LIGHT};
  cursor: pointer;
  &:hover {
    background: gainsboro;
    color: ${BLACK_3D_DARK};
    font-weight: bold;
  }
`
export const BannerMaterialSection = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin-top: 8px;
`

export const BannerMaterial = styled.img`
  max-width: 85px;
  object-fit: cover;
  max-height: 85px;
  margin-right: 8px;
  border-radius: 3px;
`

export const Subtitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  line-height: 19px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`

export const TitleSubtitleContainer = styled.div``

export const StyledLink = styled.a`
  @media (min-width: 320px) and (max-width: 480px) {
    align-self: center;
  }
`

export const ModelContainer = styled.div`
  background: ${BLACK_3D_DARK};
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-flow: column;
  border-radius: 3px;
  position: relative;
`

export const StyledBreadCrumb = styled(Breadcrumb)`
  border: 1px solid ${GRAY_LIGHT};
  padding: 10px 0 10px 49px;
  background-color: ${WHITE};
`

export const StyledInputNumber = styled(InputNumber)`
  border-radius: 0px;
  height: 40px;
  width: 138px;
  border: 1px solid ${GRAY};
`

export const AvailablePrices = styled.div`
  margin-right: 30px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    margin-right: 20px;
  }
`

export const PricesRow = styled.div`
  display: flex;
  margin-top: 20px;

  @media (min-width: 320px) and (max-width: 480px) {
    justify-content: space-between;
  }
`

export const Description = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  line-height: 23px;
`

export const ButtonsRow = styled.div`
  display: flex;
  margin: 20px 0 25px;

  .ant-btn {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    flex-flow: column;
  }
`

export const StyledButtonWrapper = styled.div`
  .ant-btn-primary  {
    background-color: ${BLUE_DARK};
    border-color: ${BLUE_DARK};
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE_DARK};
    border-color: ${BLUE_DARK};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 18px 0 0;
  }
  margin-left: ${({ marginLeft }: StyledProps) => marginLeft || '0px'};
`
export const SlideImage = styled.img`
  width: 100%;
`

export const SlideVideo = styled.video`
  width: 100%;
`

export const SlideImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`

export const Separator = styled.div`
  text-align: center;
  margin: 48px 10% 28px 10%;
  padding-bottom: 8px;
  border-bottom: 1px solid ${GRAY_LIGHT};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.93px;
  line-height: 18px;
`

export const TitleName = styled.div`
  margin-right: 8px;
`

export const StyledButton = styled.div`
  height: 50px;
  width: 277px;
  border: 1px solid ${BLUE};
  border-radius: 2px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  color: ${BLUE};
  font-size: 16px;
  display: flex;
  transition: all 0.2s;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
  &:hover {
    background: ${BLUE};
    color: ${WHITE};
  }
`

export const CustomizeButton = styled.a`
  height: 50px;
  width: 256px;
  border: 1px solid ${BLUE};
  border-radius: 2px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${WHITE};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  color: ${BLUE};
  font-size: 16px;
  display: flex;
  transition: all 0.2s;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${BLUE};
    color: ${WHITE};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const ColorWheel = styled.img`
  width: 20px;
  margin-right: 12px;
`

export const MobileButtonWrapper = styled.div`
  width: 100%;
`

export const MobileButton = styled.div`
  display: none;
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

  @media (min-width: 320px) and (max-width: 480px) {
    display: flex;
  }
`

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
export const CompareButton = styled(Button)`
  border: 2px solid ${RED};
  border-radius: 2px;
  color: ${RED};
  height: 40px;
  width: 120.79px;
`

export const BuyNowOptions = styled.div`
  margin-bottom: 40px;
`

export const DealerTitle = styled.div`
  margin-top: 8px;
  margin-bottom: -12px;
  color: ${RED};
`

export const GenderRow = styled.div`
  display: flex;
  margin-bottom: 20px;
`
export const SectionTitle = styled.div`
  height: 25px;
  color: ${GRAY_DARK};
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  margin-bottom: 15px;
`
export const SectionTitleContainer = styled.div`
  display: flex;
`

interface ButtonProps {
  selected: boolean
  large?: boolean
  oneSize?: boolean
}

export const SectionButton = styled.div`
  align-content: center;
  background-color: ${WHITE};
  border: ${({ selected }: ButtonProps) =>
    selected ? `2px solid ${RED}` : `0.5px solid ${GRAY_LIGHT}`};
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  display: flex;
  height: 50px;
  margin-right: 14px;
  padding: 14px;
  justify-content: center;
  width: ${({ large, oneSize }: ButtonProps) => {
    let width = oneSize ? 'auto' : '55px'
    if (large) {
      width = '139px'
    }
    return width
  }};

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 15px;
  }
`

export const SectionRow = styled.div`
  margin-bottom: 20px;
`
export const SectionButtonsContainer = styled.div`
  display: flex;
  @media (min-width: 320px) and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    flex-wrap: wrap;
  }
`
export const SizeRowTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const GetFittedLabel = styled.div`
  height: 22px;
  color: ${RED};
  font-size: 16px;
  line-height: 22px;
  &:hover {
    cursor: pointer;
  }
`

export const QuestionSpan = styled.span`
  margin-left: 5px;
  height: 23px;
  width: 8.06px;
  color: ${GRAY_DARK};
  font-size: 16px;
  line-height: 23px;
  &:hover {
    cursor: pointer;
  }
`
export const AddToCartRow = styled.div`
  display: flex;
`

export const AddToCartButton = styled(Button)`
  height: 40px;
  width: 138.23px;
  border-radius: 2px;
  background-color: ${BLUE};
  color: ${WHITE};
  margin-left: 26px;

  &:hover {
    background-color: ${BLUE};
    color: ${WHITE};
    border-color: ${BLUE};
  }
`
export const RelatedProductsContainer = styled.div`
  margin-bottom: 80px;
  padding: 0px 32px;
`
export const ReviewsHeader = styled.div`
  align-items: center;
  background-color: ${GRAY_HEADER};
  color: ${GRAY_DARK};
  display: flex;
  font-size: 18px;
  font-weight: 600;
  height: 38px;
  letter-spacing: 0.23px;
  line-height: 25px;
  margin-bottom: 15px;
  padding-left: 32px;
`

export const YotpoImageSlider = styled.div``

export const Downloadtemplate = styled.div`
  height: 19px;
  color: ${DARKER_GRAY};
  font-size: 14px;
  line-height: 19px;
  margin-left: 10px;
`

export const DownloadTemplateContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-right: 20px;
`
export const DownloadAnchor = styled.a`
  display: flex;
`

export const DownloadImg = styled.img`
  &:hover {
    cursor: pointer;
  }
`
export const DetailsList = styled.ul`
  padding: 10px 0 0 20px;
`

export const DetailsListItem = styled.li`
  margin-bottom: 15px;
`

export const ProductAvailableColor = styled.img`
  margin-right: 15px;
  border-radius: 50%;
  border: ${({ selected, withBorder }: StyledProps) =>
    selected
      ? `2px solid ${RED}`
      : `1px solid ${withBorder ? BLACK : 'transparent'}`};
  width: 30px;

  &:hover {
    cursor: pointer;
  }
`

export const ColorWrapper = styled.div`
  height: 2.5em;
`

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`

export const layoutStyle = {
  backgroundColor: WHITE
}

export const InfoTag = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
  height: 30px;
  padding: 3px 8px;
  background: ${GREEN_STATUS};
  font-family: 'Avenir Next';
  font-style: italic;
  font-weight: bold;
  font-size: 17px;

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-right: 22px solid ${GREEN_STATUS};
    border-bottom: 30px solid transparent;
    margin-left: -30px;
    margin-top: -3px;
  }
`

export const ActionButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 25px;

  .ant-btn {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    flex-flow: column;
  }
  @media (min-width: 480px) and (max-width: 940px) {
    display: block;
  }
`

export const MobileButtonTemplate = styled.div`
  display: none;
  justify-content: center;
  height: 40px;
  color: ${BLUE};
  font-size: 14px;
  font-weight: bold;
  @media (min-width: 320px) and (max-width: 480px) {
    display: flex;
  }
`

export const ButtonTemplate = styled.div`
  color: ${BLUE};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  @media (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
  @media (min-width: 480px) and (max-width: 940px) {
    height: 40px;
    line-height: 40px;
  }
`

export const Download = styled(Icon)`
  margin-right: 10px;
  stroke: ${BLUE};
  stroke-width: 30px;
  font-size: 17px;
`
