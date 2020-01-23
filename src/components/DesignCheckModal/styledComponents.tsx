/**
 * Styled Components - Created by eduardoquintero on 05/08/19.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { GRAY_DARK, RED, GREEN, GREEN_BRIGHT } from '../../theme/colors'

interface StatusProps {
  online: boolean
}

export const Container = styled.div``

export const ProReviewTitle = styled.div`
  color: ${GRAY_DARK};
  font-size: 20px;
  font-weight: bold;
  line-height: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 36px;
  margin-right: 32px;
`

export const ProDesignReviewContent = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  margin-left: 16px;
  letter-spacing: 0.11px;
  line-height: 18px;

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
  p {
    margin-bottom: 8px;
  }
  ul {
    margin-bottom: 12px;
    list-style: disc;
    padding-left: 0;
    padding-inline-start: 18px;
  }
  li {
    margin-bottom: 10px;
    font-size: 14px;
  }
  i {
    font-size: 12px;
    font-style: italic;
    letter-spacing: 0.09px;
    line-height: 18px;
  }
`

export const Paragraph = styled.div`
  margin-top: 20px;
  color: ${GRAY_DARK};
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const StatusLabel = styled.div`
  margin-top: 14px;
  margin-bottom: 8px;
  font-size: 16px;
  text-align: center;
  color: ${({ online }: StatusProps) => (online ? GREEN : RED)};
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
  border: 2px solid ${GREEN_BRIGHT};
  border-radius: 2px;
  color: ${GREEN_BRIGHT};

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Icon = styled.img``

export const RightTitle = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 328px;
`

export const Content = styled.div`
  display: flex;
  margin: 24px 0;
  justify-content: space-between;
  align-items: flex-start;
`

export const DesignImage = styled.img`
  max-width: 385px;
`
