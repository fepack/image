import { load } from "./load";

export type LoadSrc = Parameters<typeof load>[0];

export type LoadState<TLoadSrc extends LoadSrc> = {
  src: TLoadSrc;
  promise?: Promise<unknown>;
  error?: unknown;
};

type Notify = (...args: unknown[]) => unknown;
export class LoadClient {
  private loadCache = new Map<LoadSrc, LoadState<LoadSrc>>();
  private notifiesMap = new Map<LoadSrc, Notify[]>();

  attach(src: LoadSrc, notify: Notify) {
    const notifies = this.notifiesMap.get(src);
    this.notifiesMap.set(src, [...(notifies ?? []), notify]);

    return {
      detach: () => this.detach(src, notify),
    };
  }

  detach(src: LoadSrc, notify: Notify) {
    const notifies = this.notifiesMap.get(src);
    if (notifies) {
      this.notifiesMap.set(
        src,
        notifies.filter((item) => item !== notify),
      );
    }
  }

  load<TLoadSrc extends LoadSrc>(src: TLoadSrc) {
    const loadState = this.loadCache.get(src);

    if (loadState?.error) {
      throw loadState.error;
    }
    if (loadState?.src) {
      return loadState as LoadState<TLoadSrc>;
    }
    if (loadState?.promise) {
      throw loadState.promise;
    }

    const newLoadState: LoadState<TLoadSrc> = {
      src,
      promise: load(src)
        .then((image) => (newLoadState.src = image.src as TLoadSrc))
        .catch(() => (newLoadState.error = `${src}: load error`)),
    };

    this.loadCache.set(src, newLoadState);
    throw newLoadState.promise;
  }

  private notify(src: LoadSrc) {
    const notifies = this.notifiesMap.get(src);
    if (notifies) {
      for (const notify of notifies) notify();
    }
  }
}
