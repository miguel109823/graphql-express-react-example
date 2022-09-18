import api from "./api";
import { gql } from "graphql-request";

const getPostQuery = gql`
  query Post($id: ID!) {
    data: post(id: $id) {
      message
    }
  }
`;

const getPostsQuery = gql`
  query Posts($offset: Int, $limit: Int) {
    data: posts(offset: $offset, limit: $limit) {
      items {
        id
        message
      }
    }
  }
`;

const createPostQuery = gql`
  mutation CreatePost($input: PostInput!) {
    data: createPost(input: $input) {
      message
    }
  }
`;

const deletePostQuery = gql`
  mutation DeletePost($id: ID!) {
    data: deletePost(id: $id)
  }
`;

const createTag = ({ id }) => ({ id, type: "Post" });
const partialPostListTag = createTag("PARTIAL-LIST");

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (variables) => ({ query: getPostsQuery, variables }),
      providesTags: (result, error, arg) => [
        ...result.items.map(createTag),
        partialPostListTag,
      ],
    }),
    getPost: builder.query({
      query: (variables) => ({ query: getPostQuery, variables }),
      providesTags: (result, error, arg) => [createTag(arg)],
    }),
    createPost: builder.mutation({
      query: (variables) => ({ query: createPostQuery, variables }),
      invalidatesTags: (result, error, arg) => [createTag(arg)],
    }),
    deletePost: builder.mutation({
      query: (variables) => ({ query: deletePostQuery, variables }),
      invalidatesTags: (result, error, arg) => [
        createTag(arg),
        partialPostListTag,
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi;
