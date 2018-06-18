/**
 * TemplateDownload Queries
 */
import gql from 'graphql-tag'

// TODO: add query
export const templatesQuery = gql`
  query getTemplates {
    templates: getProductsWithTemplate {
      name
      description: short_description
      pictures {
        imageSource: front_image
      }
      fileUrl: template
    }
  }
`
