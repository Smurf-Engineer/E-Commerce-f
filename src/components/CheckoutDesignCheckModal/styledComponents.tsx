/**
 * Styled Components - Created by eduardoquintero on 13/09/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { GRAY_DARK, WHITE, RED, GREEN_BRIGHT } from '../../theme/colors'

export const Container = styled.div``

export const OptionalLabel = styled.span`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-style: italic;
  letter-spacing: 0.25px;
  line-height: 22px;
  font-weight: normal;

  @media (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
`

export const ProReviewTitle = styled.img`
  margin: 25px 0 6px -4px;
  height: 24px;
  display: flex;
  align-items: flex-start;

  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 -6px 6px -10px;
  }
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
  .italic {
    font-style: italic;
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

  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 -6px 10px -6px;
    font-size: 13px;
    line-height: 18px;
    p {
      margin-bottom: 6px
    }
    ul {
      margin-bottom: 6px;
    }
  }
`

export const ModalButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 25px;
  grid-template-areas: '. review continue';

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'review' 'continue';
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin-left: -6px;
    margin-right: -6px;
    grid-gap: 10px;
  }
`

export const ContinueButton = styled(Button)`
  grid-area: continue;
  height: 50px;
  width: 221px;
  border: 2px solid ${RED};
  border-radius: 2px;
  color: ${RED};

  @media (max-width: 550px) {
    width: 100%;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    height: 42px;
    font-size: 13px;
  }
`

export const ReviewButton = styled(Button)`
  grid-area: review;
  height: 50px;
  width: 220px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${GREEN_BRIGHT};
  color: ${WHITE};
  border-radius: 5px;

  &:hover {
    background-color: ${GREEN_BRIGHT};
    color: ${WHITE};
    border-color: ${GREEN_BRIGHT};
  }

  @media (max-width: 550px) {
    width: 100%;
    height: 42px;
    font-size: 13px;
  }
`

export const Icon = styled.img`
  width: 35px;
  margin-left: 10px;
`

export const Paragraph = styled.div`
  margin-top: 20px;
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;

  @media (min-width: 320px) and (max-width: 480px) {
    margin: 10px -6px 0 -6px;
    font-size: 13px;
    line-height: 18px;
  }
`
