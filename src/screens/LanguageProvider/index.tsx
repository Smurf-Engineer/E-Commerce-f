/**
 * LanguageProvider Screen - Created by david on 20/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import * as languageProviderActions from './actions'

interface Props {
  locale: string
  currentLanguage: string
  messages: any
}

export class LanguageProvider extends React.Component<Props, {}> {
  render() {
    const { currentLanguage, messages } = this.props
    return (
      <IntlProvider
        locale="en"
        key={currentLanguage}
        messages={messages[currentLanguage]}
        textComponent="div"
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state: any) => state.get('languageProvider').toJS()

const LanguageProviderEnhance = compose(
  connect(mapStateToProps, { ...languageProviderActions })
)(LanguageProvider)

export default LanguageProviderEnhance
