import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";

const TagTemplate = ({ data, pageContext }) => (
  <Layout>
    <main>
      <Helmet
        title={`Channels tagged as "${pageContext.tag}" | ${config.siteTitle}`}
      />
      <h1>Tag: {pageContext.tag.toUpperCase()}</h1>
      <PostListing postEdges={data.allMarkdownRemark.edges} />
    </main>
  </Layout>
);
export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: ASC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            categories
          }
        }
      }
    }
  }
`;
