import React from "react";
import { toast } from "react-toastify";
import {
  useDeletePostMutation,
  useCreatePostMutation,
  useGetPostsQuery,
} from "services/posts";

export default () => {
  const [message, setMessage] = React.useState("");
  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const { data, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (!data?.items) {
    return <div>There aren't any posts</div>;
  }

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await toast.promise(createPost({ input: { message } }).unwrap(), {
            success: "Post added",
          });
          setMessage("");
        }}
      >
        <input
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>+</button>
      </form>
      {data?.items?.map(({ id, message }) => (
        <div key={id} className="d-flex items-center justity-content-between">
          {message}
          <button
            onClick={async () => {
              await toast.promise(deletePost({ id }).unwrap(), {
                success: "Post deleted",
              });
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};
