import type { Preview } from "@storybook/nextjs-vite";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

console.log(MINIMAL_VIEWPORTS);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "error",
    },

    options: {
      // @ts-expect-error Explicit types cannot be used here, Storybook needs to serialize this function
      storySort: (a, b) => {
        // a.title and b.title are slash-separated paths
        const aSegments = a.title.split("/");
        const bSegments = b.title.split("/");
        const parentCount = Math.min(
          aSegments.length - 1,
          bSegments.length - 1,
        );

        // step through each parent path segment, sorting alphabetically
        for (let i = 0; i < parentCount; ++i) {
          const aSegment = aSegments[i] ?? "";
          const bSegment = bSegments[i] ?? "";

          if (aSegment !== bSegment) return aSegment.localeCompare(bSegment);
        }

        const aIsDocs = a.type === "docs";
        const bIsDocs = b.type === "docs";

        // sort docs above stories
        if (aIsDocs !== bIsDocs) {
          if (aIsDocs) return -1;
          if (bIsDocs) return 1;
        }

        const aName = aSegments.pop();
        const bName = bSegments.pop();

        // finally sort by name
        return aName.localeCompare(bName);
      },
    },

    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        tailwindSm: {
          name: "Tailwind (sm)",
          type: "tablet",
          styles: {
            width: "640px",
            height: "1024px",
          },
        },
        tailwindMd: {
          name: "Tailwind (md)",
          type: "tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        tailwindLg: {
          name: "Tailwind (lg)",
          type: "tablet",
          styles: {
            width: "1024px",
            height: "768px",
          },
        },
        tailwindXl: {
          name: "Tailwind (xl)",
          type: "desktop",
          styles: {
            width: "1280px",
            height: "800px",
          },
        },
        tailwind2xl: {
          name: "Tailwind (2xl)",
          type: "desktop",
          styles: {
            width: "1536px",
            height: "960px",
          },
        },
      },
    },

    chromatic: {
      modes: {
        mobile: {
          viewport: "iPhoneSE",
        },
        desktop: {
          viewport: "tailwindXl",
        },
      },
    },
  },
};

export default preview;
