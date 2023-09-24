import { load } from "@fepack/image";
import type { FunctionComponent } from "react";
import { createElement, useSyncExternalStore } from "react";

type Src = Parameters<typeof load>[0];
type LoadOptions<TSrc extends Src> = { src: TSrc };
type Notify = (...args: unknown[]) => unknown;

const loadCache = new Map<Src, LoadState>();
const loadClient = new (class LoadClient {
  private notifiesMap = new Map<Src, Notify[]>();

  public attach<TSrc extends Src>(src: TSrc, onNotify: Notify) {
    const srcNotifies = this.notifiesMap.get(src);
    this.notifiesMap.set(src, [...(srcNotifies ?? []), onNotify]);

    const attached = {
      detach: () => this.detach(src, onNotify),
    };

    return attached;
  }

  public detach<TSrc extends Src>(src: TSrc, onNotify: Notify) {
    const srcNotifies = this.notifiesMap.get(src);

    if (srcNotifies) {
      this.notifiesMap.set(
        src,
        srcNotifies.filter((notify) => notify !== onNotify),
      );
    }
  }

  public _load = <TSrc extends Src>(src: TSrc): { src: TSrc } => {
    const loadStateGot = loadCache.get(src);
    if (loadStateGot?.error) {
      throw loadStateGot.error;
    }
    if (loadStateGot?.src) {
      return loadStateGot as LoadState<TSrc>;
    }
    if (loadStateGot?.promise) {
      throw loadStateGot.promise;
    }

    const newLoadState: LoadState<TSrc> = {
      src,
      promise: load(src)
        .then((image) => (newLoadState.src = image.src as TSrc))
        .catch(() => (newLoadState.error = `${src}: load error`)),
    };
    loadCache.set(src, newLoadState);
    throw newLoadState.promise;
  };
})();

type UseLoadOptions<TSrc extends Src> = {
  src: TSrc;
};

type LoadState<TSrc extends Src = Src> = UseLoadOptions<TSrc> & {
  promise?: Promise<unknown>;
  error?: unknown;
};

export const useLoad = <TSrc extends Src>(
  options: UseLoadOptions<TSrc>,
): LoadState<TSrc> =>
  useSyncExternalStore(
    (onStoreChange) => loadClient.attach(options.src, onStoreChange).detach,
    () => loadClient._load<TSrc>(options.src),
    () => loadClient._load<TSrc>(options.src),
  );

type LoadProps<TSrc extends Src> = LoadOptions<TSrc> & {
  children: FunctionComponent<LoadState<TSrc>>;
};
export const Load = <TSrc extends Src>({ src, children }: LoadProps<TSrc>) =>
  createElement(children, useLoad({ src }));
