// import { z } from 'zod';

// export const FormDataSchema = z.object({
//   username: z.string().min(1, 'Username is required'),
//   password: z.string().min(1, 'Password is required'),
//   email: z.string().min(1, 'Email is required').email('Invalid email address'),
//   name: z.string().min(1, 'Name is required'),
//   phone: z.string().min(1, 'Phone is required'),
//   role: z.enum(['seeker', 'investor'], { required_error: 'Role is required' }),
//   companyname: z.string().min(1, 'Company Name is required'),
//   companyowner: z.string().min(1, 'Owner is required'),
//   duration: z.number().min(1, 'Duration is required and must be a number'),
//   report: z.instanceof(File, { message: 'Report must be a file' }), 
// });
