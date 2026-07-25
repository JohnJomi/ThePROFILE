"use client";

/**
 * providers/ReactQueryProvider.tsx
 *
 * TanStack Query (React Query) provider — stubbed for Phase 2.
 *
 * This provider is intentionally a no-op wrapper right now.
 * It will be activated in Phase 4 when AI features require
 * client-side data fetching (chat, semantic search).
 *
 * To activate:
 *   1. npm install @tanstack/react-query
 *   2. Uncomment the import and QueryClientProvider below.
 *   3. Remove the passthrough implementation.
 *
 * "use client" is required because QueryClient uses browser-side caching.
 *
 * Used by: src/providers/Providers.tsx
 */

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useState } from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  // Phase 4 activation:
  // const [queryClient] = useState(() => new QueryClient({
  //   defaultOptions: { queries: { staleTime: 60 * 1000 } },
  // }));
  // return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  return <>{children}</>;
}
