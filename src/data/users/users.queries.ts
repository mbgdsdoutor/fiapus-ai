import { queryOptions } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

//query for testing react router loader
export const usersQuery = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });
