/**
 * Styled Components - Created by cazarez on 25/05/18.
 */
import styled from 'styled-components'

type StyleProps = {
  browserName?: string
}

export const Container = styled.div`
  padding: 60px 35px;
  display: flex;
  justify-content: space-around;

  @media (min-width: 320px) and (max-width: 425px) {
    flex-direction: column;
    ${({ browserName }: StyleProps) =>
      browserName === 'Firefox' ? 'min-height: 850px;' : ''};
  }
`

export const Text = styled.div`
  margin-top: 15px;
  height: 22px;
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
`
export const StyledImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;

  &:hover {
    cursor: pointer;
  }
`

export const Category = styled.div`
  width: 30%;

  @media (min-width: 320px) and (max-width: 425px) {
    width: 100%;
    margin-top: 15px;
  }
`
