import { sub } from 'date-fns';
//
import { role } from './role';

// ----------------------------------------------------------------------

const mockData = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  role: (index) => role[index]
};

export default mockData;
