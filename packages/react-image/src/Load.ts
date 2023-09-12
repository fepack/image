import { FunctionComponent, createElement, useSyncExternalStore } from "react";
import { load as utilsLoad } from "./utils";

type UseLoadOptions = {
  src: HTMLImageElement["src"];
};

type LoadState = {
  promise?: Promise<unknown>;
  src: string;
  error?: unknown;
};

const loadCache = new Map<string, LoadState>();
const loadClient = new (class LoadClient {
  private notifiesMap = new Map<string, ((...args: unknown[]) => unknown)[]>();

  public attach(src: string, onNotify: (...args: unknown[]) => unknown) {
    const keyNotifies = this.notifiesMap.get(src);
    this.notifiesMap.set(src, [...(keyNotifies ?? []), onNotify]);

    const attached = {
      detach: () => this.detach(src, onNotify),
    };
    return attached;
  }

  public detach(src: string, onNotify: (...args: unknown[]) => unknown) {
    const keyNotifies = this.notifiesMap.get(src);

    if (keyNotifies) {
      this.notifiesMap.set(
        src,
        keyNotifies.filter((notify) => notify !== onNotify),
      );
    }
  }

  public load = (src: string): { src: string } => {
    const loadStateGot = loadCache.get(src);

    if (loadStateGot?.error) {
      throw loadStateGot.error;
    }
    if (loadStateGot?.src) {
      return loadStateGot;
    }

    if (loadStateGot?.promise) {
      throw loadStateGot.promise;
    }

    const newLoadState: LoadState = {
      src,
      promise: utilsLoad(src)
        .then(() => {
          newLoadState.src = src;
        })
        .catch((error) => {
          newLoadState.error = error;
        }),
    };

    loadCache.set(src, newLoadState);
    throw newLoadState.promise;
  };
})();

export const useLoad = (options: UseLoadOptions): { src: string } =>
  useSyncExternalStore(
    (onStoreChange) => loadClient.attach(options.src, onStoreChange).detach,
    () => loadClient.load(options.src),
    () => loadClient.load(options.src),
  );

type LoadProps = {
  src: HTMLImageElement["src"];
  children: FunctionComponent<LoadState>;
};
export const Load = ({ src, children }: LoadProps) => {
  const load = useLoad({ src });
  return createElement(children, load);
};
