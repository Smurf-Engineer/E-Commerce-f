/**
 * Styled Components - Created by eduardo on 20/12/18.
 */
import styled from 'styled-components'
import Tabs, { TabsProps } from 'antd/lib/tabs'
import React from 'react'

interface ColorSliderProps {
  totalColors: number
  currentSelected: number
}

interface OvalProps {
  currentColor?: string
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.07);
  flex-direction: column;
  & .ant-tabs-tab {
    margin: 0;
  }
`

export const Label = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.13px;
  margin: 0;
`

export const ShuffleButton = styled.div`
  padding: 5px;
  border: 1px solid gray;
  border-radius: 6px;
`

export const Icon = styled.img`
  width: 15px;
  object-fit: contain;
  opacity: 50%;
  margin-left: 5px;
`

export const ColorSlider = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
  &:after {
    height: 2px;
    width: calc(
      100% / ${({ totalColors }: ColorSliderProps) => totalColors} - 10px
    );
    content: '';
    position: absolute;
    left: calc(
      100% / ${({ totalColors }: ColorSliderProps) => totalColors} *
        ${({ currentSelected }: ColorSliderProps) => currentSelected} + (5px)
    );
    bottom: -7px;
    transition: all 0.3s ease;
  }
`

export const ColorOval = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid
    ${({ currentColor }: OvalProps) =>
    currentColor && currentColor.toLowerCase() !== '#ffffff'
      ? currentColor
      : '#bebebe'};
  background-color: ${({ currentColor }: OvalProps) => currentColor || '#fff'};
`

export const TabArea = styled.div`
  margin-left: 5px;
`

export const TabContainer = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dcdcdc;
  &:last-child {
    border-bottom: none;
  }
  margin-top: 4px;
`

export const Divider = styled.div`
  height: 1px;
  background-color: #dcdcdc;
`

export const StyledTabs = styled(Tabs as React.ComponentClass<TabsProps>)`
  & .ant-tabs-nav-scroll {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
  & .ant-tabs-tab-arrow-show  {
    display: none;
  }
  & .ant-tabs-nav-container {
    padding: 0;
  }
`
