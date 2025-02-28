
import { Toaster } from "sonner";

export function CustomToastProvider() {
  return (
    <Toaster 
      position="top-right"
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
        className: 'border-border shadow-lg',
      }}
    />
  );
}
