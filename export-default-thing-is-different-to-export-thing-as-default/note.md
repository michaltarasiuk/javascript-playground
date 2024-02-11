```js
// These give you a live reference to the exported thing(s):
import { thing } from './module.js';
import { thing as otherName } from './module.js';
import * as module from './module.js';
const module = await import('./module.js');
// This assigns the current value of the export to a new identifier:
let { thing } = await import('./module.js');

// These export a live reference:
export { thing };
export { thing as otherName };
export { thing as default };
// These export the current value:
export default thing;
export default 'hello!';
```
