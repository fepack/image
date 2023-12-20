import { LoadClient, type LoadSrc } from "@fepack/image";
import { ReactNode, useSyncExternalStore } from "react";

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
  children: (loadedImage: HTMLImageElement) => ReactNode;
};
export const Load = <TLoadSrc extends LoadSrc>({
  src,
  children,
}: LoadProps<TLoadSrc>) => children(useLoad({ src }));
