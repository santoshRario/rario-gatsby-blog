import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import readingTime from 'reading-time'

import SEOHead from '../components/seo-head'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'
import ContentfulRichText from '../components/contentfulRichText'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')

    const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))
    const { minutes: timeToRead } = readingTime(plainTextBody)

    console.log(post)
    return (
      <Layout location={this.props.location}>
        <Hero
          image={post.heroImage?.gatsbyImage}
          title={post.title}
          content={post.description}
        />
        <div className={styles.container}>
          <span className={styles.meta}>
            {post.author?.name} &middot;{' '}
            <time dateTime={post.rawDate}>{post.publishDate}</time> –{' '}
            {timeToRead} minute read
          </span>
          <div className={styles.article}>
            <div className={styles.body}>
              {post.body?.raw && <ContentfulRichText richText={post.body} />}
            </div>
            <Tags tags={post.tags} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const Head = (props) => {
  const post = get(props, 'data.contentfulBlogPost')
  const plainTextDescription = documentToPlainTextString(
    JSON.parse(post.description.raw)
  )
  return <SEOHead title={post.title} description={plainTextDescription} />
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImage(placeholder: BLURRED, width: 400)
        resize(height: 630, width: 400) {
          src
        }
      }
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            description
            gatsbyImage(width: 400)
            __typename
          }
        }
      }
      test {
        childMarkdownRemark {
          html
        }
      }
      tags
      description {
        raw
      }
    }
  }
`
