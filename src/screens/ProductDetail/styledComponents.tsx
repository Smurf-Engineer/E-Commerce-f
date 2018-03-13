/**
 * Styled Components - Created by cazarez on 12/03/18.
 */
import styled from 'styled-components'
import Breadcrumb from 'antd/lib/breadcrumb'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff;
  padding: 31px 32px 0 32px;
`

export const ImagePreview = styled.div`
  flex: 2;
`

export const ProductData = styled.div`
  flex: 2;
`
export const Title = styled.div`
  height: 33px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;
`

export const Subtitle = styled.div`
  height: 19px;
  width: 209px;
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
