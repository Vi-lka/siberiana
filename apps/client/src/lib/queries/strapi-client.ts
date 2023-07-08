import type { QuestionsType } from "@siberiana/schemas";
import { GraphQLClient, gql } from "graphql-request";

const query = gql`
  query Questions {
    questions {
      data {
        attributes {
          Title
          Image {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          Tip
          Variant {
            Title
            Index
          }
          AnswerIndex
          url
          urlName
        }
      }
    }
  }
`;

const graphQLClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`);

export const fetchQuestions = async (): Promise<QuestionsType> => {
  return await graphQLClient.request(query);
};