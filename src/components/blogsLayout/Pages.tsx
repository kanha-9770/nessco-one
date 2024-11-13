import React from "react";
import Page1 from "./Header";
import { BlogsLayoutItem } from "./types/constant";

interface BlogsLayoutProps {
  blogsLayoutData: BlogsLayoutItem;
}

const Pages: React.FC<BlogsLayoutProps> = ({ blogsLayoutData }) => {
  return (
    <>
      <div className="lg:p-4 p-2 overflow-hidden">
        <Page1 blogsLayoutData={blogsLayoutData} />
      </div>
    </>
  );
};

export default Pages;
