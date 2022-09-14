//https://www.typescriptlang.org/docs/handbook/decorators.html
/**Decorators are called when the class is declared—not when it is instantiated -> 
 * the following code will be executed only once*/

//METHOD DECORATOR
export function Logger(eventType: string, action: string, data = {}) {
  return function <T extends Object>(targetClass: T, functionName: keyof T, descriptor: PropertyDescriptor): PropertyDescriptor {
    // initial value of the decorated variable/method
    const originalMethod = descriptor.value;

    // decorator pattern (wrapping the original method - decorating it with custom functionality)
    // if arrow f was used here, it would take the outer function's this and we need the caller's this
    /* It's better to modify the original descriptor than overwriting the current one by returning a new descriptor. 
    This allows you to use multiple decorators that edit the descriptor without overwriting what another decorator did.*/

    descriptor.value = function (...args: any[]) {
      console.log('logger: ', eventType, action, data);

      /*have to call it (not just bind it) because when the decorated method is called it is 
      expected to behave the same as the original method but with the added functionality*/
      return originalMethod.apply(this, args);
    }

    //decorators expect descriptor (if they have it) or void as return value
    return descriptor
  }
}