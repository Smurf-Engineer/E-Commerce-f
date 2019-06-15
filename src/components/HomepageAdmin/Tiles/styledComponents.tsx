/**
 * Styled Components - Created by eduardoquintero on 13/06/19.
 */
import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 20px;
  width: 100%;
`

export const ScreenTitle = styled.div`
  color: #5f6062;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 26px;
  @media (max-width: 768px) and (min-width: 320px) {
    margin-bottom: 24px;
  }
`

export const UploadersContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 10px;
`
