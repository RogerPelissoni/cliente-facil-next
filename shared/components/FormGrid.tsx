export function FormGrid({ children }: React.PropsWithChildren) {
  return <div className="grid grid-cols-12 gap-4">{children}</div>;
}
