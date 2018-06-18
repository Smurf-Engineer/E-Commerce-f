/**
 * Styled Components - Created by miguelcanobbio on 15/06/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 36px 48px 36px;
`
export const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
`

export const Title = styled.div`
  width: 100%;
  height: 33px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  margin: 24px 0;
  text-align: center;
`

export const TemplatesList = styled.div`
  width: 1584px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;

  @media (min-width: 1332px) and (max-width: 1583px) {
    width: 1260px;
  }

  @media (min-width: 1080px) and (max-width: 1331px) {
    width: 1008px;
  }

  @media (min-width: 828px) and (max-width: 1079px) {
    width: 756px;
  }

  @media (min-width: 576px) and (max-width: 827px) {
    width: 504px;
  }

  @media (min-width: 320px) and (max-width: 575px) {
    width: 252px;
  }
`

export const TitleError = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Message = styled.div`
  margin-top: 16px;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`
