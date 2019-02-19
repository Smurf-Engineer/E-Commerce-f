/**
 * Styled Components - Created by david on 20/07/18.
 */
import styled from 'styled-components'
import AntdIcon from 'antd/lib/icon'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

export const Text = styled.div`
  color: #fff;
`

export const ButtonUpload = styled.div`
  color: #5f6062;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  padding: 8px;
`

type IconProps = {
  color?: string
}

export const Icon = styled(AntdIcon)`
  color: ${({ color = '#5F6062' }: IconProps) => color};
  cursor: 'pointer';
`
