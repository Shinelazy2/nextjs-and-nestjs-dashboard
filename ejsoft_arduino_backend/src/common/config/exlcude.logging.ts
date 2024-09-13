import 'reflect-metadata';

// Symbol for metadata key
export const EXCLUDE_LOGGING_KEY = Symbol('excludeLogging');

// Create the ExcludeLogging decorator
export function ExcludeLogging(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata(EXCLUDE_LOGGING_KEY, true, target, propertyKey);
}
