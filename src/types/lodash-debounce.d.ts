declare module 'lodash.debounce' {
  type DebounceSettings = {
    leading?: boolean;
    maxWait?: number;
    trailing?: boolean;
  };
  
  function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait?: number,
    options?: DebounceSettings
  ): T & { cancel(): void; flush(): void };

  export default debounce;
}
