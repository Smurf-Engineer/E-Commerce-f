/**
 * FitAndSizing Screen - Created by jorge on 01/08/18.
 */
import * as React from 'react'
import {
  FormattedMessage,
  injectIntl,
  InjectedIntl,
  FormattedHTMLMessage
} from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import zenscroll from 'zenscroll'
import * as fitAndSizeActions from './actions'
import messages from './messages'
import { boxHeaders, charts } from './staticData'
import {
  Container,
  TitleSectionRow,
  Title,
  AnchorsRow,
  AnchorButton,
  Divider,
  ContentSection,
  SectionTitle,
  SectionDescription,
  SizingOptionsRow,
  RadioGroup,
  RadioButton,
  SizingCharts,
  FitStylesContainer,
  FitStyle,
  FitStyleTitle,
  FitStyleImage,
  FitStyleDescription
} from './styledComponents'
import Layout from '../../components/MainLayout'
import SizingChart from '../../components/SizingChart'
import slimFit from '../../assets/slim_fit.svg'
import standardFit from '../../assets/standard_fit.svg'
import relaxedFit from '../../assets/relaxed_fit.svg'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  msrmntSystemSelected: string
  setMsrmntSystemAction: (system: string) => void
}

const sectionTitles = ['Body Size Chart', 'Fit Styles']

export class FitAndSizing extends React.Component<Props, {}> {
  private bodySize: any
  private fitStyles: any

  componentWillMount() {
    zenscroll.toY(0, 0)
  }

  render() {
    const { intl, history, msrmntSystemSelected } = this.props

    const { formatMessage } = intl
    const buttons = sectionTitles.map((title, key) => (
      <AnchorButton
        id={key.toString()}
        {...{ key }}
        onClick={this.handleOnButtonClick}
      >
        {title}
      </AnchorButton>
    ))

    const sizingChartList = charts.map((chart, index) => (
      <SizingChart
        id={`${chart.title}-table`}
        key={index}
        units={msrmntSystemSelected}
        onBoxHeaderClick={this.handleHeaderClick}
        {...{ boxHeaders, chart, formatMessage, history }}
      />
    ))

    return (
      <Layout {...{ intl, history }}>
        <Container>
          <TitleSectionRow>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <AnchorsRow>{buttons}</AnchorsRow>
          </TitleSectionRow>
          <Divider />
          <ContentSection>
            <SectionTitle>
              <div ref={section => (this.bodySize = section)}>
                <FormattedMessage {...messages.bodySizeTitle} />
              </div>
            </SectionTitle>
            <SectionDescription>
              <FormattedHTMLMessage {...messages.bodySizeDescription} />
            </SectionDescription>
            <SectionTitle>
              <FormattedMessage {...messages.sizingChart} />
            </SectionTitle>
            <SizingOptionsRow>
              <RadioGroup
                value={msrmntSystemSelected || 'in'}
                onChange={this.handleOnMsrmntSystemChange}
              >
                <RadioButton value="in">
                  {formatMessage(messages.in)}
                </RadioButton>
                <RadioButton value="cm">
                  {formatMessage(messages.cm)}
                </RadioButton>
              </RadioGroup>
            </SizingOptionsRow>
            <SizingCharts>{sizingChartList}</SizingCharts>
          </ContentSection>
          <Divider />
          <ContentSection>
            <SectionTitle>
              <div ref={section => (this.fitStyles = section)}>
                <FormattedMessage {...messages.fitStylesTitle} />
              </div>
            </SectionTitle>
            <FitStylesContainer>
              <FitStyle>
                <FitStyleTitle>
                  <FormattedMessage {...messages.slimFit} />
                </FitStyleTitle>
                <FitStyleImage src={slimFit} />
                <FitStyleDescription>
                  <FormattedMessage {...messages.slimFitDescription} />
                </FitStyleDescription>
              </FitStyle>
              <FitStyle>
                <FitStyleTitle>
                  <FormattedMessage {...messages.standardFit} />
                </FitStyleTitle>
                <FitStyleImage src={standardFit} />
                <FitStyleDescription>
                  <FormattedMessage {...messages.standardFitDescription} />
                </FitStyleDescription>
              </FitStyle>
              <FitStyle>
                <FitStyleTitle>
                  <FormattedMessage {...messages.relaxedFit} />
                </FitStyleTitle>
                <FitStyleImage src={relaxedFit} />
                <FitStyleDescription>
                  <FormattedMessage {...messages.relaxedFitDescription} />
                </FitStyleDescription>
              </FitStyle>
            </FitStylesContainer>
          </ContentSection>
        </Container>
      </Layout>
    )
  }

  handleHeaderClick = ({
    currentTarget: { id }
  }: React.MouseEvent<HTMLDivElement>) => {
    const element = document.getElementById(`${id}-table`) as HTMLElement
    zenscroll.to(element)
  }

  handleOnButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { id }
    } = event

    switch (id) {
      case '0':
        zenscroll.to(this.bodySize)
        break
      case '1':
        zenscroll.to(this.fitStyles)
        break
      default:
        break
    }
  }

  handleOnMsrmntSystemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: units }
    } = event

    const { setMsrmntSystemAction } = this.props

    setMsrmntSystemAction(units)
  }
}

const mapStateToProps = (state: any) => state.get('fitAndSizing').toJS()

const FitAndSizingEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    { ...fitAndSizeActions }
  )
)(FitAndSizing)

export default FitAndSizingEnhance
