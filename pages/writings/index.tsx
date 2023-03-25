import React from "react";
import { allWritings as pages } from "contentlayer/generated";

export default function Page() {
  return (
    <>
      <h1>Text nextjs</h1>
      <ul>
        {pages.map((page) => {
          return (
            <li key={page._id}>
              <a href={`/writings/${page.slug}`}>{page.title}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
