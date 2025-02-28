
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
        success: {
          style: {
            background: '#10b981',
            color: 'white',
          },
        },
        error: {
          style: {
            background: '#ef4444',
            color: 'white',
          },
        },
        warning: {
          style: {
            background: '#f59e0b',
            color: 'white',
          },
        },
        info: {
          style: {
            background: '#3b82f6',
            color: 'white',
          },
        },
      }}
    />
  );
}
