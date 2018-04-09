/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'

const fontFamily = 'Avenir Next'
export const Container = styled.div`
  color: #fff;
  font-family: ${fontFamily};
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 15px;
  font-weight: 200;

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 24px;
  }
`
export const Title = styled.div`
  height: 14px;
  width: 78px;
  color: #bebebe;
  font-size: 10px;
  font-weight: bold;
  line-height: 14px;
  margin-bottom: 15px;
`

export const Text = styled.div`
  margin-bottom: 15px;
`
export const Phone = styled.div`
  margin-bottom: 15px;
`
export const Email = styled.div`
  margin-bottom: 15px;
`
