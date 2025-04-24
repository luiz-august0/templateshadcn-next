export function debounce(fn: () => void, delay: number) {
  setTimeout(() => {
    fn();
  }, delay);
}
