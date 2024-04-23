import { IAdminRepository } from "@/domain/repositories/admin.repository";

class AdminRepository implements IAdminRepository {}

const adminRepository = new AdminRepository();
export default adminRepository;
