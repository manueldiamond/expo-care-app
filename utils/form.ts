export function getFormErrorMessage(errorObj: any, defaultMsg: string): string {
  if (!errorObj || typeof errorObj !== 'object') return defaultMsg;
  for (const key of Object.keys(errorObj)) {
    const val = errorObj[key];
    if (val && typeof val === 'object' && 'message' in val && typeof val.message === 'string') {
      return val.message;
    }
    if (typeof val === 'string') {
      return val;
    }
  }
  return defaultMsg;
} 