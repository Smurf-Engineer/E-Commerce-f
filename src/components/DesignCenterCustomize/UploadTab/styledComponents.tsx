/**
 * Styled Components - Created by david on 08/06/18.
 */
import styled from 'styled-components'

export const Container = styled.div`
  overflow: auto;
  height: 60vh;

  @media (min-height: 800px) {
    height: 85vh;
  }
`

export const DraggerContainer = styled.div`
  padding: 8px;
  height: 50vh;
`

export const DraggerBottom = styled.div`
  padding: 8px;
  .ant-upload.ant-upload-drag {
    background: #ffffff;
    padding: 8px 0;
  }
`

export const Text = styled.div`
  color: #fff;
`

export const Header = styled.div`
  background-color: #f1f4f5;
  padding: 10px 30px;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`

type Props = {
  color?: string
}

export const Recommendation = styled.div`
  color: ${({ color = '#5f6062' }: Props) => color};
  font-family: 'Avenir Next';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 23px;
  padding: 8px 34px;
`
