/**
 * Styled Components - Created by cazarez on 11/04/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
  }
`

export const Text = styled.div`
  color: #fff;
`

export const StyledImg = styled.img`
  width: 100%;
`

export const TeamStoreCard = styled.div`
  width: 468px;
`

export const CardContent = styled.div`
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 #dcdcdc;
`
export const TeamCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

export const CardTitle = styled.div`
  height: 25px;
  width: 139px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.23px;
  line-height: 25px;
`

export const ShareButton = styled(Button)`
  height: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 0;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);

  span {
    color: #5f6062;
    font-family: 'Avenir Next';
    font-size: 14px;
    letter-spacing: 0.1px;
    line-height: 19px;
    text-align: center;
  }
`
