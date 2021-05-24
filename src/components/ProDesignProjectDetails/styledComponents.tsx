import Collapse from 'antd/lib/collapse'
import Icon from 'antd/lib/icon'
import styled from 'styled-components'
import {
  BLUE,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_LIGHTEST,
  RED,
  RED_TRANSPARENT,
  RED_TRANSPARENT_BRIGHT,
  WHITE,
  WHITE_TRANSPARENT
} from '../../theme/colors'
import { AVENIR_NEXT } from '../../theme/fonts'

const Panel = Collapse.Panel

interface ImagePreviewProps {
  src: string
}

interface DivProps {
  fullWidth?: boolean
}

export const Container = styled.div`
  width: 100%;
  background-color: ${WHITE};
  display: inline-flex;
  position: relative;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 0 8px;
  }
  .ant-collapse .ant-collapse-item .ant-collapse-header {
    display: flex;
    flex-direction: row;
    color: ${GRAY_DARK};
    font-size: 12px;
    letter-spacing: 0.15px;
    line-height: 16px;
    padding: 0 !important;
    max-width: 168px;
    width: 100%;
  }
  .ant-collapse .ant-collapse-item {
    border-bottom: none;
  }
  .ant-collapse-item .ant-collapse-header .arrow {
    position: absolute;
    left: calc(100% - 40px);
    display: inline-flex;
    border: 1px solid ${BLUE};
    height: 24px;
    align-items: center;
    width: 24px;
    justify-content: center;
    border-radius: 50%;
    color: ${BLUE};
    bottom: 0;
  }
  .ant-collapse-item .ant-collapse-content-box {
    padding: 32px 0 0 8px!important;
  }
`

export const StrongText = styled.div`
  color: ${GRAY_DARK};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
`

export const MailLink = styled.a`
  color: ${BLUE};
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
`

export const LoadingContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 10;
  height: 100%;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

export const InspirationName = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
`

export const Text = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  word-break: break-word;
  width: 100%;
  @media (max-width: 768px) {
    max-width: ${({ fullWidth }: DivProps) => fullWidth ? '100%' : '198px'};
  }
`

export const ProjectDescriptor = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  word-break: break-word;
  width: 100%;
  background: ${GRAY_LIGHTEST};
  padding: 11px;
`

export const ProjectContainer = styled.div`
  flex: 1;
  margin-right: 28px;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${({ fullWidth }: DivProps) => fullWidth ? '100%' : '190px'};
  width: 100%;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: row;
    max-width: 100%;
    flex: unset;
  }
`

export const PaletteName = styled.div``

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap:wrap;
`

export const Notes = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`

export const LockerGrid = styled.div`
  max-width: 446px;
  width: 100%;
  padding-bottom: 38px;
`

export const CollapsePanel = styled(Collapse)`
  display: flex;
  justify-content: flex-start;
`

export const PanelDiv = styled(Panel)`
  width: 100%;
  border-bottom: none !important;
`

export const TitleDiv = styled.div`
  font-weight: bold;
  color: ${GRAY_DARK} !important;
  font-size: 16px;
`

export const Ideas = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export const Inspiration = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`

export const ModalTitle = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
`

export const InfoBody = styled.div`
  color: ${GRAY_DARK};
  font-family: ${AVENIR_NEXT};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 12px 0 12px -38px;
`

export const Images = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 15px;
  row-gap: 10px;
  justify-items: flex-start;
  margin-top: 10px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`

export const ImageContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 768px) {
    width: 160px;
  }
`

export const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-image: url('${({ src }: ImagePreviewProps) => src || ''}');
  width: 200px;
  height: 200px;
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
  background-color: ${GRAY_LIGHT};
`

export const DocIcon = styled(Icon)`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 30px;
  color: ${GRAY_DARK};
  background: ${GRAY_LIGHTEST};
  &:hover {
    cursor: pointer;
    background: ${GRAY_LIGHT};
  }
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
`

export const Color = styled.div`
  margin-bottom: 50px;
  display: flex;
  width: 70%;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 90%;
  }
`
export const Files = styled.div`
  display: flex;
  flex-direction: column;
`

export const ImageText = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  font-weight: 600;
  margin-top: 6px;
  overflow: hidden;
  white-space: nowrap;
`

export const Products = styled.div`
  margin: 42px 0;
  display: flex;
  flex-direction: column;
`

export const Designs = styled.div`
  margin-bottom: 42px;
  display: flex;
  flex-direction: column;
`

export const BackContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  @media (max-width: 768px) {
    display: none;
  }
  &:hover {
    cursor: pointer;
  }
`

export const SpinContainer = styled.div`
  display: inline-flex;
  height: 60vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const AddProductButton = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed ${RED};
  height: 216px;
  margin-top: 13px;
  margin-left: 18px;
  max-width: 198px;
  width: 100%;
  border-radius: 3px;
  color: ${RED};
  transition: all .25s;
  &:hover {
    cursor: pointer;
    background: ${RED_TRANSPARENT_BRIGHT};
  }
  @media (max-width: 480px) {
    margin: 0 auto;
    margin-top: 32px;
  }
`

export const AddLabel = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 32px;
    margin-bottom: 8px;
  }
`

export const buttonStyle = {
  background: RED_TRANSPARENT,
  color: WHITE,
  border: 'none',
  boxShadow: 'none'
}

export const cancelButtonStyle = {
  background: WHITE,
  color: GRAY_DARK,
  borderColor: GRAY_LIGHT,
  boxShadow: 'none'
}