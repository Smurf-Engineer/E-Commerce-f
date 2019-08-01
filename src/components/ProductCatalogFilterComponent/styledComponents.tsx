/**
 * Styled Components - Created by cazarez on 28/02/18.
 */
import styled from 'styled-components'
import Divider from 'antd/lib/divider'

export const Container = styled.div`
  margin-bottom: 15px;
`

export const Content = styled.div`
  max-width: 240px;
`
export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
`
export const Title = styled.div`
  height: 22.74px;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 23px;
`
export const StyledImg = styled.img`
  &:hover {
    cursor: pointer;
  }
`
export const StyledDivider = styled(Divider)`
  margin: 10px 0 5px;
`

export const ItemRow = styled.div`
  margin-bottom: 5px;
`
export const AnimateHeightStyled = {
  width: '200px'
}
