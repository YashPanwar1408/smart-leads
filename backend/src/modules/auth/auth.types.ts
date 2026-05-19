import { UserRole } from '../../types/enums.js';

export interface UserLookup {
  id: string;
  email: string;
  role: UserRole;
}
