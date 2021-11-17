/**
 * ProDesignProjects Queries
 */

import gql from 'graphql-tag'

export const getProDesignProjects = gql`
  query getProDesignProjects(
      $limit: Int,
      $offset: Int,
      $order: String,
      $orderAs: String
    ) {
      projectsResult: getProDesignProjects(
        limit: $limit,
        offset: $offset,
        order: $order,
        orderAs: $orderAs
      ) {
      fullCount
      projects {
        id
        shortId: short_id
        createdAt: created_at
        name
        updatedAt: updated_at
        lastUpdated: last_updated
        status
        totalNotifications: total_notifications
        designs {
          shortId: short_id
          notifications
        }
      }
    }
  }
`

export const deleteProjectMutation = gql`
  mutation deleteProject($projectId: String!) {
    deleteProject(projectId: $projectId) {
      message
    }
  }
`

export const getHomepageInfo = gql`
  query getHomepageContent($sportRoute: String) {
    getHomepageContent(sportRoute: $sportRoute) {
      mainHeaderImages {
        id
        desktopImage: image
        mobileImage: image_mobile
        url: link
        assetType: type
      }
      carouselSettings {
        slideTransition: slide_transition
        slideDuration: slide_duration
        secondarySlideTransition: secondary_slide_transition
        secondarySlideDuration: secondary_slide_duration
      }
    }
  }
`