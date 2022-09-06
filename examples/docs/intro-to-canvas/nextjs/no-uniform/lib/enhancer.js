import { enhance, compose, EnhancerBuilder } from "@uniformdev/canvas";
import {
  createContentstackEnhancer,
  CANVAS_CONTENTSTACK_PARAMETER_TYPES,
} from "@uniformdev/canvas-contentstack";
import contentstack from "contentstack";
import contentStackModelConverter from "./contentstackModelConverter";

export default function doEnhanceCS(composition) {
  const client = contentstack.Stack({
    api_key: process.env.CONTENTSTACK_API_KEY,
    delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    region: contentstack.Region.US,
  });

  return enhance({
    composition,
    enhancers: new EnhancerBuilder().parameterType(
      CANVAS_CONTENTSTACK_PARAMETER_TYPES,
      compose(
        createContentstackEnhancer({ client }),
        contentStackModelConverter
      )
    ),
    context: {},
  });
}
