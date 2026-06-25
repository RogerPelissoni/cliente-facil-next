import { useCallback, useState } from "react";

interface UseCrudFormReturn<T> {
  open: boolean;
  item: T | null;

  create(): void;
  edit(item: T): void;
  close(): void;
}

export function useCrudForm<T>(): UseCrudFormReturn<T> {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<T | null>(null);

  const create = useCallback(() => {
    setItem(null);
    setOpen(true);
  }, []);

  const edit = useCallback((item: T) => {
    setItem(item);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setItem(null);
    setOpen(false);
  }, []);

  return {
    open,
    item,
    create,
    edit,
    close,
  };
}
