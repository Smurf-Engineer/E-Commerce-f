/**
 * Styled Components - Created by jorge on 03/08/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE, GREEN_BRIGHT, GRAY_DARK } from '../../theme/colors'

interface DivProps {
  isTeamStore?: boolean
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
  @media (min-width: 320px) and (max-width: 572px) {
    display: block;
  }

  @media (min-width: 1440px) {
    justify-content: center;
  }
`
export const ImagePreview = styled.div`
  width: 50%;

  @media (min-width: 320px) and (max-width: 572px) {
    width: 100%;
    padding: 0;
  }

  @media (min-width: 573px) and (max-width: 984px) {
    width: 100%;
  }
`
export const ProductData = styled.div`
  padding: 18px;
  width: 50%;

  @media (min-width: 320px) and (max-width: 572px) {
    width: 100%;
  }
`
export const RenderContainer = styled.div`
  background: #2b2b2c;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  flex-flow: column;
  border-radius: 3px;
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
export const TitleName = styled.div`
  margin-right: 8px;
`
export const HowItFits = styled.div`
  margin: 16px 0;
  margin-bottom: 16px;
  height: 40px;
  width: 190px;
  color: white;
  border: 2px solid #dcdcdc;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: all 0.2s ease;
  z-index: 2;
  background: #2b2b2c73;
  cursor: pointer;
  &:hover {
    background: gainsboro;
    color: #2b2b2c;
    font-weight: bold;
  }
`
export const Separator = styled.div`
  text-align: center;
  margin: 48px 10% 28px 10%;
  padding-bottom: 8px;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.93px;
  line-height: 18px;
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
export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
export const TitleSubtitleContainer = styled.div``
export const Title = styled.div`
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;
  }
`
export const Subtitle = styled.div`
  color: #5f6062;
  font-size: 14px;
  line-height: 19px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`
export const EditDesignButton = styled(Button)`
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  height: 40px;
  width: 120.79px;
`

interface ProApprovedProps {
  proAssigned?: boolean
}

export const ProApproved = styled.div`
  background-color: ${({ proAssigned }: ProApprovedProps) =>
    proAssigned ? GREEN_BRIGHT : GRAY_DARK};
  color: ${WHITE};
  border-radius: 2px;
  height: 40px;
  width: 120.79px;
  display: flex;
  align-items: center;
`

export const ProApprovedLabel = styled.p`
  margin: 0;
  width: 100%;
  text-align: center;
`

export const PricesRow = styled.div`
  display: flex;
  margin-top: 20px;

  @media (min-width: 320px) and (max-width: 480px) {
    justify-content: ${({ isTeamStore }: DivProps) =>
      isTeamStore ? 'flex-start' : 'space-between'};
  }
`
export const AvailablePrices = styled.div`
  margin-right: 30px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-right: 12px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    margin-right: 20px;
  }
`
export const Description = styled.div`
  color: #5f6062;
  font-size: 16px;
  line-height: 23px;
`
export const AvailableLabel = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-style: italic;
  height: 22px;
  line-height: 22px;
  margin-top: 15px;
`
export const BuyNowOptions = styled.div`
  margin-bottom: 40px;
  margin-top: 15px;
`
export const SectionRow = styled.div`
  margin-bottom: 20px;
`
export const SectionTitleContainer = styled.div`
  display: flex;
`
export const SectionTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  height: 25px;
  line-height: 25px;
  margin-bottom: 15px;
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

interface ButtonProps {
  selected: boolean
  large?: boolean
}

export const SectionButton = styled.div`
  align-content: center;
  background-color: #ffffff;
  border: ${({ selected }: ButtonProps) =>
    selected ? '2px solid #e61737' : '0.5px solid #dcdcdc'};
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  display: flex;
  height: 50px;
  margin-right: 14px;
  padding: 14px;
  justify-content: center;
  width: ${({ large }: ButtonProps) => (large ? '139px;' : '55px;')};

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 15px;
  }
`
export const SizeRowTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const QuestionSpan = styled.span`
  color: #5f6062;
  font-size: 16px;
  margin-left: 5px;
  border: 0.5px solid #dcdcdc;
  padding: 10px;
  line-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;

  &:hover {
    cursor: pointer;
  }
`

export const RelatedProductsContainer = styled.div`
  margin-bottom: 80px;
  padding: 0px 32px;
`

export const ButtonsRow = styled.div`
  display: flex;
  margin: 30px 0 25px;

  .ant-btn {
    color: #e61737;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
`
export const DetailsList = styled.ul`
  padding: 10px 0px 0px 20px;
`

export const DetailsListItem = styled.li`
  margin-bottom: 15px;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const PrivateContainer = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  height: 80vh;
  justify-content: center;
`
export const PrivateTitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  height: 22px;
  letter-spacing: 0.11px;
  line-height: 22px;
  margin-bottom: 10px;
  margin-top: -25px;
  text-align: center;
  width: 100%;
`
export const PrivateSubtitle = styled.div`
  color: #5f6062;
  font-size: 16px;
  height: 23px;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
  width: 100%;
`

export const layoutStyle = {
  background: WHITE
}
