export const ConsoleLog = (prefix?: string, suffix?: string) =>
	(...args: any[]) => (console.log(prefix || '', ...args, suffix || ''))
