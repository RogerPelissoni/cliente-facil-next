"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  page: number;
  totalPages: number;

  onPageChange(page: number): void;
}

export function DataTablePagination({ page, totalPages, onPageChange }: Props) {
  function getPages(): (number | "ellipsis")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index);
    }

    const pages: (number | "ellipsis")[] = [];

    const firstPage = 0;
    const lastPage = totalPages - 1;

    pages.push(firstPage);

    if (page <= 3) {
      pages.push(1, 2, 3, 4);
      pages.push("ellipsis");
      pages.push(lastPage);

      return pages;
    }

    if (page >= totalPages - 4) {
      pages.push("ellipsis");

      for (let i = totalPages - 5; i < totalPages - 1; i++) {
        pages.push(i);
      }

      pages.push(lastPage);

      return pages;
    }

    pages.push("ellipsis");

    pages.push(page - 1);
    pages.push(page);
    pages.push(page + 1);

    pages.push("ellipsis");

    pages.push(lastPage);

    return pages;
  }

  const pages = getPages();

  return (
    <div className="mt-4 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (page > 0) {
                  onPageChange(page - 1);
                }
              }}
              aria-disabled={page === 0}
              className={page === 0 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pages.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={page === item}
                  onClick={(event) => {
                    event.preventDefault();
                    onPageChange(item);
                  }}
                >
                  {item + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (page < totalPages - 1) {
                  onPageChange(page + 1);
                }
              }}
              aria-disabled={page >= totalPages - 1}
              className={
                page >= totalPages - 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
