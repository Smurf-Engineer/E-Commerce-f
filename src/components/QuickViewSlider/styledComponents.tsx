/**
 * Styled Components - Created by cazarez on 12/02/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { RED } from '../../theme/colors'

export const Container = styled.div`
  margin-bottom: 10px;
`

export const Text = styled.div`
  color: #fff;
`

export const StyledButton = styled(Button)`
  background-color: #fff;
  border: 2px solid #f5222d;
  width: 220px;
  height: 50px;
  margin-top: 14px;
  transition: all 0.2s ease;
  &:hover {
    span {
      color: #ffff;
    }
    background-color: #f5222d;
  }

  span {
    color: ${RED};
  }
`
export const ButtonRow = styled.div`
  text-align: center;

  .ant-btn {
    color: ${RED};
  }
`

export const Available = styled.div`
  margin-top: 10px;
`

export const SliderPage = styled.div``
export const StyledImage = styled.img`
  width: 95%;
`
export const Arrows = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 210px;
  width: 96%;
  padding: 0 15px 0 10px;
`
export const ArrowRight = styled.img`
  &:hover {
    cursor: pointer;
  }
`
export const ArrowLeft = styled.img`
  &:hover {
    cursor: pointer;
  }
`
