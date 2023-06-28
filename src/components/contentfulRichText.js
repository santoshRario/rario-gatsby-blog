import React from 'react'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ContentfulRichText = ({ richText }) => {
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
              allowFullScreen={1}
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
        const { title, gatsbyImage } = node.data.target
        return (
          <GatsbyImage
              image={getImage(gatsbyImage)}
              alt={title}
          />
        )
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        if(node?.data?.target?.fields) {
          const { gatsbyImage, title } = node.data?.target?.fields?.media['en-US']
          const href = node.data?.target?.fields?.targetLink['en-US']
          const openInNewTab = node.data?.target?.fields?.openInNewTab['en-US']
          return (
            <a href={href} target={openInNewTab ? "_blank" : "_self"} rel="noreferrer">
              <GatsbyImage
                  image={getImage(gatsbyImage)}
                  alt={title}
              />
            </a>
          )
        } else {
          return null
        }
      }
    },
  };

  return (
    <>
      {renderRichText(richText, options)}
    </>
  )
}

export default ContentfulRichText
