import React from "react";
import { allWritings as pages, type Writing } from "contentlayer/generated";

export default function Page() {
  console.log({ pages });
  return (
    <>
      <div>Text nextjs</div>
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
