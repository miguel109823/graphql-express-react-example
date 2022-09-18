import React from "react";
import { Route, Routes } from "react-router-dom";
import PostsList from "features/posts/PostsList";

export default () => (
  <Routes>
    <Route path="*" element={<PostsList />} />
  </Routes>
);
