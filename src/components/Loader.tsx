export function Loader({ label }: { label: string }) {
  return (
    <p className="loader" role="status">
      {label}
    </p>
  );
}
