import dynamic from "next/dynamic";
import React, { FC } from "react";

const NoSSRWrapper: FC<{
  children: React.ReactNode;
}> = (props) => <React.Fragment>{props.children}</React.Fragment>;

export const NoSSR = dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
