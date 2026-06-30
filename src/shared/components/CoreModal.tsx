"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CSSProperties, ReactNode } from "react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  loading?: boolean;
  size?: ModalSize;
  children: ReactNode;
  onOpenChange(open: boolean): void;
}

const modalSizes: Record<ModalSize, CSSProperties> = {
  sm: { maxWidth: "28rem" },
  md: { maxWidth: "42rem" },
  lg: { maxWidth: "56rem" },
  xl: { maxWidth: "72rem" },
  full: { maxWidth: "95vw" },
};

export function CoreModal({ open, title, description, loading = false, size = "md", children, onOpenChange }: Props) {
  function handleOpenChange(value: boolean) {
    if (loading) {
      return;
    }

    onOpenChange(value);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        style={modalSizes[size]}
        onPointerDownOutside={(e) => {
          if (loading) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (loading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
