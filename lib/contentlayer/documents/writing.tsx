import { defineDocumentType } from "contentlayer/source-files";

export const Writing = defineDocumentType(() => ({
  name: "Writing",
  contentType: "mdx",
  filePathPattern: "writings/**/*.md",
  fields: {
    title: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        const cleanPath = chopOffWord("writings", false);
        return cleanPath(doc._raw.flattenedPath).slice(1);
      },
    },
  },
}));

const chopOffWord = (word: string, suffix: boolean) => (s: string) =>
  suffix ? s.slice(0, word.length * -1) : s.slice(word.length);
