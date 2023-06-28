import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import readingTime from 'reading-time'

import SEOHead from '../components/seo-head'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')

    const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))
    const { minutes: timeToRead } = readingTime(plainTextBody)
    
    const options = {
      renderNode: {
        [INLINES.HYPERLINK]: (node) => {
          const url = node?.data?.uri
          if(url && url.includes('youtube')) {
            return (
              <iframe
                title={'video'}
                src={url}
                width='400px'
                height={'300px'}
                frameBorder={0}
                allowfullscreen={1}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            )
          } else {
            return (
              <a href={node?.data.uri}>{node.content?.[0].value}</a>
            )
          }
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, description } = node.data.target
        return (
           <GatsbyImage
              image={getImage(gatsbyImage)}
              alt={description}
           />
         )
        },
      },
    };

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
              {post.body?.raw && renderRichText(post.body, options)}
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
      tags
      description {
        raw
      }
    }
  }
`
