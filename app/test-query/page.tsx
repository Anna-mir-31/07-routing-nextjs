"use client";
import { useQuery } from "@tanstack/react-query";

export default function TestQueryPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      console.log('Test query function called');
      return { message: 'Hello World' };
    },
  });

  console.log('TestQueryPage render:', { data, isLoading, error });

  return (
    <div>
      <h1>Test Query Page</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
}
