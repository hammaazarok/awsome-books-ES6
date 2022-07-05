import { DateTime } from './luxon.js';

const dt = DateTime.now().setLocale('en').toFormat('MMMM dd, yyyy hh:mm:ss');
const newDatetime = dt;
export default newDatetime;
export { newDatetime };