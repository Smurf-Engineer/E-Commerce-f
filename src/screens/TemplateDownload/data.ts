/**
 * TemplateDownload Queries
 */
import gql from 'graphql-tag'

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
