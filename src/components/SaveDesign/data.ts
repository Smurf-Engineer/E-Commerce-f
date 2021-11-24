import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const saveDesignName = graphql(
  gql`
    mutation saveDesign($design: DesignInput!, $colors: [String]!) {
      savedDesign: saveDesign(design: $design, colors: $colors) {
        designId: id
        designName: name
        designImage: image
        proCertified: pro_certified
        proDesign: pro_design
        shortId: short_id
        svg: output_svg
        designCode: code
        shared
        createdAt: created_at
        colors {
          id
          color
          image
        }
        flatlockColor: flatlock
        flatlockCode: flatlock_code
        predyedName: predyed_name
        bindingColor: binding_color
        bibBraceColor: bib_brace_color
        zipperColor: zipper_color
        canvas
        product {
          id
          code
          yotpoId: yotpo_id
          name
          type: name
          active
          onlyProDesign: only_pro_design
          description: short_description
          shortDescription: short_description
          collections
          hideFitStyles: hide_fit_styles
          youthCombined: youth_combined
          isTopProduct
          weight
          priceRange {
            quantity
            price
            abbreviation
            shortName: short_name
          }
          genders {
            id
            name: gender
          }
          fitStyles {
            id
            info
            name: description
          }
          sizeRange: size_range {
            id
            name
            isYouth: is_youth
          }
          images: pictures {
            front: front_image
            back: back_image
            left: left_image
            right: right_image
          }
        }
      }
    }
  `,
  {
    name: 'saveDesign',
    withRef: true
  }
)

export const compileSVGMutation = graphql(
  gql`
    mutation compileSVG($design: DesignInput!, $colors: [String]!) {
      design: compileSVG(design: $design, colors: $colors) {
        outputSvg: output_svg
      }
    }
  `,
  {
    name: 'compileSVG',
    withRef: true
  }
)

export const saveDesignChanges = graphql(
  gql`
    mutation saveDesignAs(
      $designId: String!
      $designObj: DesignInput!
      $colors: [String]!
    ) {
      savedDesign: saveDesignAs(
        designId: $designId
        designObj: $designObj
        colors: $colors
      ) {
        designId: id
        designName: name
        designImage: image
        proCertified: pro_certified
        proDesign: pro_design
        svg: output_svg
        designCode: code
        shared
        shortId: short_id
        createdAt: created_at
        colors {
          id
          color
          image
        }
        flatlockColor: flatlock
        flatlockCode: flatlock_code
        predyedName: predyed_name
        bindingColor: binding_color
        bibBraceColor: bib_brace_color
        zipperColor: zipper_color
        canvas
        product {
          id
          code
          yotpoId: yotpo_id
          name
          type: name
          hideFitStyles: hide_fit_styles
          youthCombined: youth_combined
          description: short_description
          shortDescription: short_description
          collections
          isTopProduct
          weight
          mpn
          priceRange {
            quantity
            price
            abbreviation
            shortName: short_name
          }
          genders {
            id
            name: gender
          }
          fitStyles {
            id
            info
            name: description
          }
          sizeRange: size_range {
            id
            name
            isYouth: is_youth
          }
          images: pictures {
            front: front_image
            back: back_image
            left: left_image
            right: right_image
          }
        }
      }
    }
  `,
  {
    name: 'saveDesignAs',
    withRef: true
  }
)

export const userfilesQuery = gql`
  query GetUserFiles {
    userFiles: getUserFiles {
      id
      type
      lowQuality: low_quality
    }
  }
`
