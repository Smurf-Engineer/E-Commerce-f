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
  height: 128px;
  object-fit: cover;
`

export const TeamStoreCard = styled.div`
  width: 468px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: auto;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }
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
  margin-left: 10px;

  span {
    color: #5f6062;
    font-family: 'Avenir Next';
    font-size: 14px;
    letter-spacing: 0.1px;
    line-height: 19px;
    text-align: center;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    width: 35%;
  }
`

export const EditButton = ShareButton.extend``

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
  }
`
export const DeleteLabel = styled.span`
  display: flex;
  align-items: center;
  color: #e61737;
  margin-left: 10px;
  @media (max-width: 480px) {
    margin-left: 0;
    width: 76px;
  }
`
