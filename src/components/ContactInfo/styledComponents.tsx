/**
 * Styled Components - Created by cazarez on 07/02/18.
 */
import styled from 'styled-components'
import { GRAY } from '../../theme/colors'

export const Container = styled.div`
  color: #fff;
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

export const AddressText = styled.div`
  font-weight: 400;
`

export const ContactLabel = styled.div`
  margin-bottom: 15px;
`

export const PhoneLabel = styled.a`
  color: #fff;
  text-decoration: underline;
  margin-bottom: 15px;
  display: inline-block;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`

export const Subtitle = styled.div`
  font-size: 11.5px;
  color: ${GRAY};
`