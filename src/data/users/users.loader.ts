import { usersQuery } from '@/data/users/users.queries';

import { queryClientConfig } from '../query-client';

//loader for testing react router loader
export const usersLoader = async () => {
  await queryClientConfig.queryClient.ensureQueryData(usersQuery());
  return null;
};
