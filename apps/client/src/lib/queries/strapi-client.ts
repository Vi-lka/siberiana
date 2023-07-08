import type { QuestionsType } from "@siberiana/schemas";
import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`);

export const fetchQuestions = async (locale: string): Promise<QuestionsType> => {
  return await graphQLClient.request(gql`
  query Questions {
    questions(locale: "${locale}") {
      data {
        attributes {
          title
          image {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          tip
          variants {
            title
            index
          }
          answerIndex
          url
          urlName
        }
      }
    }
  }
`);
};