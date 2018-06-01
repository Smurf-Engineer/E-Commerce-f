/**
 * Styled Components - Created by cazarez on 31/05/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  padding: 27px 0;
  background-color: #fff;
`

export const Text = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-align: center;
`

export const ButtonsRow = styled.div`
  padding: 90px 0 40px;
  display: flex;
  justify-content: center;

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 30px 0px 20px;
    flex-direction: column;
  }
`
export const AnchorButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 220.37px;
  margin-left: 51px;
  border: 2px solid #e61737;
  border-radius: 2px;
  color: #e61737;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 10px;
  }
`
export const SectionContainder = styled.div``

export const SectionTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;
`
export const SectionText = styled.div`
  padding: 30px 40px 0;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;

  .highlight {
    color: red;
    font-style: italic;
  }

  b {
    font-weight: 700;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    padding: 30px 10px 0px;
    flex-direction: column;
  }
`
