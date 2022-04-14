/**
 * Styled Components - Created by cazarez on 27/02/18.
 */
import styled from 'styled-components'
import breadcrumb from 'antd/lib/breadcrumb'
import icon from 'antd/lib/icon'
import { BLACK, BLUE, GRAY_DISABLE, GRAY_SOFT, RED, WHITE } from '../../theme/colors'

interface StyleProps {
  showChildren?: boolean
  color?: string
  disabled?: boolean
}

export const Container = styled.div`
  display: flex;
  background-color: #fff;
  flex-wrap: no-wrap
`

export const Text = styled.div`
  color: #5f6062;
`
export const FiltersColumn = styled.div`
  flex: 0.5 1 auto;
  padding-left: 31px;
  padding-top: 34px;
  padding-right: 16px;
  box-shadow: 3px 1px 8px 0px #e3e3e3;
`

export const FiltersTitle = styled.div`
  display: inline-block;
  height: 36.95px;
  color: #5f6062;
  font-size: 17px;
  font-weight: bold;
  line-height: 27px;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
  padding-right: 18px;
  ${({ color }: StyleProps) => `color: ${color};`};
`

export const FilterIcon = styled(icon)`
  margin-right: 12px;
  color: ${BLUE};
`

export const ResultsColumn = styled.div`
  flex: 10;
  margin-top: 32px;
  padding: 0 22px;
  padding-bottom: 38px;
  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const StyledBreadcrumb = styled(breadcrumb)`
  background-color: #fff;
  padding: 10.5px 0 10.5px 48px;
  border: 1px solid #dcdcdc;
`

export const MainSection = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  padding: 31px 36px 32px 32px;
  background-color: #fff;

  @media (min-width: 320px) and (max-width: 768px) {
    padding: 31px 5px 32px 5px;
  }
`

export const SelectDiv = styled.div`
  text-align: center;
  margin-bottom: 35px;
  font-size: 18px;
  padding: 0 32px;
  position: relative;
`

export const TitleSelect = styled.div`
  font-weight: bold;
  font-family: Avenir;
`

export const SubtitleSelect = styled.div`
  font-size: 16px;
  margin-top: 16px;
`

export const SelectDesign = styled.div`
  position: absolute;
  right: 67px;
  top: 16px;
  font-size: 16px;
  background: ${({ disabled }: StyleProps) => disabled ? GRAY_DISABLE : BLUE};
  color: ${({ disabled }: StyleProps) => disabled ? GRAY_SOFT : WHITE};
  padding: 10px 17px;
  text-align: center;
  border-radius: 3px;
  box-shadow: ${({ disabled}: StyleProps) => disabled ? `1px 2px 3px -3px #000000` : `1px 2px 6px -2px ${BLACK}`};
  transition: all .25s;
  &:hover {
    cursor: ${({ disabled }: StyleProps) => disabled ? 'not-allowed' : 'pointer'};
    opacity: ${({ disabled }: StyleProps) => disabled ? '1' : '0.6'};
  }
  @media (max-width: 768px) {
    position: fixed;
    top: unset;
    right: unset;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    padding: 18px 17px;
    border-top: 1px solid #c2c2c2;
  }
`

export const DesignIcon = styled(icon)`
  margin-right: 12px;
`

export const MenuStyle = {
  width: '200px'
}

export const Icon = styled(icon)`
  color: ${RED};
`
