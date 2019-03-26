/**
 * Styled Components - Created by eduardoquintero on 19/03/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  .cont {
    width: auto;

    @media (min-width: 800px) {
      width: 800px;
    }
  }
`

export const Text = styled.div`
  color: #fff;
`

export const CloseIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    cursor: pointer;
  }
`

export const ProductInfContainer = styled.div`
  width: 329px;
  margin-bottom: 10px;
`
export const ProductInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 22px;
  width: auto;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`
export const DescriptionContent = styled.div`
  width: 329px;
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 0px;
  transition: visibility 0s, opacity 0.5s linear;
`

export const DetailsContent = styled.div`
  width: 329px;
  color: #5f6062;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 0px;
  transition: visibility 0s, opacity 0.5s linear;
`

export const UpDownArrow = styled.img`
  &:hover {
    cursor: pointer;
  }
`

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

export const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
`

export const FormContainer = styled.div`
  text-align: left;
  width: 70%;
  margin: 14px auto 0 auto;
`

export const Label = styled.label`
  margin: 0;
`

export const Field = styled.div`
  margin-bottom: 10px;
`

export const Column = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 49%;
  margin-right: 1%;
`

export const Submit = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`
