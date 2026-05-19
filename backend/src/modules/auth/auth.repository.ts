import { UserModel } from '../../models/user.model.js';
import { UserRole } from '../../types/enums.js';

export const authRepository = {
  createUser: async (data: {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
  }) => {
    return UserModel.create(data);
  },
  findByEmail: async (email: string, includePassword = false) => {
    const query = UserModel.findOne({ email });
    if (includePassword) {
      query.select('+passwordHash');
    }
    return query.exec();
  },
  findById: async (id: string) => {
    return UserModel.findById(id).exec();
  }
};
