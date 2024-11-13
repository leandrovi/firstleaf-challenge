import { Actions } from "gatsby";
import * as path from "path";

export const onCreateWebpackConfig = ({ actions }: { actions: Actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/images": path.resolve(__dirname, "src/images"),
      },
    },
  });
};
