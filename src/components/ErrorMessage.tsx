export function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="error-message" role="alert">
      Något gick fel: {message}
    </p>
  );
}
