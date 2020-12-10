/**
 * Colors Component - Created by eduardoquintero on 02/12/20.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import ColorBar from '../../../components/ColorBar'
import { GetColorPalettes } from './data'
import rightArrow from '../../../assets/arrow.svg'
import { RouteComponentProps } from 'react-router-dom'
import {
  Container,
  Title,
  InfoText,
  SelectPaletteContainer,
  PaletteTitle,
  PaletteColumns,
  Palettes,
  CreatePalette,
  PaletteContainer,
  Body,
  Header
} from './styledComponents'
import messages from './messages'
import { Message, ProDesignPalette, QueryProps } from '../../../types/common'

interface Data extends QueryProps {
  rows: ProDesignPalette[]
}

interface Props extends RouteComponentProps<any> {
  data: Data
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

export class Colors extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      data
    } = this.props
    return (
      <Container>
        <Title>
          {formatMessage(messages.currentPalette)}
        </Title>
        <ColorBar
          {...{formatMessage}}
          primary={'#e3e3e3'}
          accent={['lightgreen', 'lightblue', '#fff']}
          withLegend={true}
        />
        <InfoText>
          {formatMessage(messages.colorsInfo)}
        </InfoText>
        <SelectPaletteContainer>
          <PaletteTitle>
            {formatMessage(messages.selectPalette)}
          </PaletteTitle>
          <PaletteColumns>
            <Palettes>
              {!data.loading && data.rows.map((palette) => {
                const { accent1, accent2, accent3 } = palette
                return (
                <>
                  <PaletteContainer key={palette.id}>
                    <Header>
                      {palette.name}
                       <img src={rightArrow} />
                    </Header>
                    <Body>
                      <ColorBar
                        {...{formatMessage}}
                        primary={palette.primary}
                        accent={[accent1, accent2, accent3]}
                      />
                    </Body>
                  </PaletteContainer>
                </>)
              })}
            </Palettes>
            <CreatePalette />
          </PaletteColumns>
        </SelectPaletteContainer>
      </Container>
    )
  }
}

const ColorsEnhance = compose(
  graphql<Data>(GetColorPalettes, {}),
)(Colors)

export default ColorsEnhance
