/**
 * Styled Components - Created by eduardoquintero on 05/08/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { GRAY_DARK, RED } from '../../theme/colors'

export const Container = styled.div``

export const OptionalLabel = styled.span`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-style: italic;
  letter-spacing: 0.25px;
  line-height: 22px;
  font-weight: normal;
`

export const ProReviewTitle = styled.div`
  margin-top: 25px;
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  display: flex;
  align-items: center;
`

export const ProDesignReviewContent = styled.div`
  margin: 20px 0 55px;
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;

  .important {
    color: ${RED};
  }
  .no-margin {
    margin-bottom: 0;
  }

  .smaller-text {
    font-size: 13px;
    span {
      text-decoration: underline;
    }
  }
  ul {
    margin-bottom: 20px;
  }
  ul,
  ul > li {
    list-style: none;
    padding-left: 0;
  }
`

export const Paragraph = styled.div`
  margin-top: 20px;
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const ModalButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 25px;
  grid-template-areas: 'continue';
  justify-items: center;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'continue';
  }
`

export const ContinueButton = styled(Button)`
  height: 50px;
  width: 221px;
  border: 2px solid ${RED};
  border-radius: 2px;
  color: ${RED};

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Icon = styled.img`
  width: 35px;
  margin-left: 10px;
`
