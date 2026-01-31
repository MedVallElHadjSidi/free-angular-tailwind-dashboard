export interface User {
  id: number;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  groups: string[];
}
