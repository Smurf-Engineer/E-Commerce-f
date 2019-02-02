/**
 * Styled Components - Created by david on 08/06/18.
 */
import styled from 'styled-components'
import { WHITE, GRAY_LIGHTEST, GRAY_DARK } from '../../../theme/colors'

export const Container = styled.div`
  height: 60vh;
  overflow: auto;

  @media (min-height: 800px) and (orientation: portrait) {
    height: 85vh;
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    height: 70vh;
  }

  @media only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) {
    height: 78vh;
  }
`

export const DraggerContainer = styled.div`
  height: 50vh;
  padding: 8px;
`

export const DraggerBottom = styled.div`
  padding: 8px;

  .ant-upload.ant-upload-drag {
    background: ${WHITE};
    padding: 8px 0;
  }
`
export const LoginMessage = styled.div`
  font-size: 16px;
  line-height: 23px;
  margin-top: 16px;
  text-align: center;
`

export const Text = styled.div`
  color: ${WHITE};
`

export const Header = styled.div`
  background-color: ${GRAY_LIGHTEST};
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  min-height: 55px;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`

type Props = {
  color?: string
}

export const Recommendation = styled.div`
  color: ${({ color = GRAY_DARK }: Props) => color};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
  padding: 8px 34px;

  @media (min-width: 768px) and (max-width: 991px) {
    padding: 8px 10px;
  }
`

export const EmptyContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
`

export const LockContainer = styled.div`
  cursor: pointer;
  padding: 2px;
  display: inline-block;
  font-size: 20px;
`

export const CustomButton = styled.div`
  padding: 5px;
  border: 1px solid ${GRAY_DARK};
  border-radius: 4px;
  justify-content: center;
  width: 200px;
  margin-top: 22px;
  display: inline-flex;
  cursor: pointer;
  transition: background 0.4s ease, color 0.3s ease;
  &:hover {
    background: ${GRAY_DARK}
    color: ${WHITE}
  }
`
