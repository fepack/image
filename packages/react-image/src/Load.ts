import { FunctionComponent, createElement, useSyncExternalStore } from "react";

type ImageSrc = HTMLImageElement["src"];

type LoadOptions<TSrc extends ImageSrc> = { src: TSrc };
type LoadResult<TSrc extends ImageSrc> = {
  event: Event;
  src: TSrc;
};

export const load = <TSrc extends ImageSrc>(
  options: LoadOptions<TSrc>,
): Promise<LoadResult<TSrc>> => {
  const image = new Image();

  return new Promise((resolve, reject) => {
    image.onload = (event) => resolve({ event, src: options.src });
    image.onerror = (event) => reject(event);

    image.src = options.src;
  });
};

type Notify = (...args: unknown[]) => unknown;

const loadCache = new Map<ImageSrc, LoadState>();
const loadClient = new (class LoadClient {
  private notifiesMap = new Map<ImageSrc, Notify[]>();

  public attach<TSrc extends ImageSrc>(src: TSrc, onNotify: Notify) {
    const srcNotifies = this.notifiesMap.get(src);
    this.notifiesMap.set(src, [...(srcNotifies ?? []), onNotify]);

    const attached = {
      detach: () => this.detach(src, onNotify),
    };
    return attached;
  }

  public detach<TSrc extends ImageSrc>(src: TSrc, onNotify: Notify) {
    const srcNotifies = this.notifiesMap.get(src);

    if (srcNotifies) {
      this.notifiesMap.set(
        src,
        srcNotifies.filter((notify) => notify !== onNotify),
      );
    }
  }

  public _load = <TSrc extends ImageSrc>(src: TSrc): { src: TSrc } => {
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
      promise: load({ src })
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

type UseLoadOptions<TSrc extends ImageSrc> = {
  src: TSrc;
};

type LoadState<TSrc extends ImageSrc = ImageSrc> = UseLoadOptions<TSrc> & {
  promise?: Promise<unknown>;
  error?: unknown;
};

export const useLoad = <TSrc extends ImageSrc>(
  options: UseLoadOptions<TSrc>,
): LoadState<TSrc> =>
  useSyncExternalStore(
    (onStoreChange) => loadClient.attach(options.src, onStoreChange).detach,
    () => loadClient._load<TSrc>(options.src),
    () => loadClient._load<TSrc>(options.src),
  );

type LoadProps<TSrc extends ImageSrc> = LoadOptions<TSrc> & {
  children: FunctionComponent<LoadState>;
};
export const Load = <TSrc extends ImageSrc>({
  src,
  children,
}: LoadProps<TSrc>) => createElement(children, useLoad({ src }));
