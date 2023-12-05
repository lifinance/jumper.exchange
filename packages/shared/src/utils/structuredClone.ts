// Attach the polyfill as a Global function
import structuredClone from '@ungap/structured-clone';

if (!('structuredClone' in globalThis)) {
  globalThis.structuredClone = structuredClone as any;
}
