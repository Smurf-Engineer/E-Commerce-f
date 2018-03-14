/**
 * Styled Components - Created by cazarez on 12/03/18.
 */
import styled from 'styled-components'
import Breadcrumb from 'antd/lib/breadcrumb'
import Button from 'antd/lib/button'

export const Container = styled.div`
  background-color: #fff;
  padding: 31px 32px 0 32px;
`

export const Content = styled.div`
  display: flex;
`

export const ImagePreview = styled.div`
  flex: 1;
`

export const ProductData = styled.div`
  flex: 1;
`
export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;
`

export const Subtitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;
`

export const StyledBreadCrumb = styled(Breadcrumb)`
  border: 1px solid #dcdcdc;
  padding: 10px 0 10px 49px;
  background-color: #fff;
`

export const AvailablePrices = styled.div`
  margin-right: 30px;
`

export const RenderRow = styled.div`
  display: flex;
  margin-top: 20px;
`

export const Description = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 23px;
`

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0 25px;

  .ant-btn {
    color: #e61737;
    font-family: 'Avenir Next';
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
`

export const StyledButton = styled(Button)`
  height: 50px;
  width: 221px;
  border: 2px solid #e61737;
  border-radius: 2px;
`
