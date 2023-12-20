import { LoadClient, type LoadSrc } from "@fepack/image";
import {
  type FunctionComponent,
  createElement,
  useSyncExternalStore,
} from "react";

const loadClient = new LoadClient();

type UseLoadOptions<TLoadSrc extends LoadSrc> = {
  src: TLoadSrc;
};
export const useLoad = <TLoadSrc extends LoadSrc>(
  options: UseLoadOptions<TLoadSrc>,
) =>
  useSyncExternalStore(
    (onStoreChange) => loadClient.attach(options.src, onStoreChange).detach,
    () => loadClient.load<TLoadSrc>(options.src),
    () => loadClient.load<TLoadSrc>(options.src),
  );

type LoadProps<TLoadSrc extends LoadSrc> = {
  src: TLoadSrc;
  children: FunctionComponent<HTMLImageElement>;
};
export const Load = <TLoadSrc extends LoadSrc>({
  src,
  children,
}: LoadProps<TLoadSrc>) => createElement(children, useLoad({ src }));
