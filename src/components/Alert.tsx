type AlertProps = {
  message: string;
  type?: "success" | "error" | "warning";
};

export function Alert({ message, type = "warning" }: AlertProps) {
  if (!message) return null;

  return (
    <div className={`alert ${type}`}>
      {message}
    </div>
  );
}
