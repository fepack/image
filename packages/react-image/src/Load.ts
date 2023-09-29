import { LoadClient, type LoadSrc, type LoadState } from "@fepack/image";
import { type FunctionComponent, createElement } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";

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
  children: FunctionComponent<LoadState<TLoadSrc>>;
};
export const Load = <TLoadSrc extends LoadSrc>({
  src,
  children,
}: LoadProps<TLoadSrc>) => createElement(children, useLoad({ src }));
