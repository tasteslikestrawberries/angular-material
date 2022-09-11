

//https://www.typescriptlang.org/docs/handbook/decorators.html
/**Decorators are called when the class is declared—not when it is instantiated -> 
 * the following code will be executed only once*/

//METHOD DECORATOR
export function Logger() {
  return function (targetClass: Object, functionName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    // initial value of the decorated variable/method
    const originalMethod = descriptor.value;

    // decorator pattern (wrapping the original method - decorating it with custom functionality)
    // if arrow f was used here, it would take the outer function's this and we need the caller's this
    const newMethod = function (...args: any[]) {
      console.log('logger: ', functionName);

      /*have to call it (not just bind it) because when the decorated method is called it is 
      expected to behave the same as the original method but with the added functionality*/
      return originalMethod.apply(this, args);
    }
    descriptor.value = newMethod;

    //decorators expect descriptor (if they have it) or void as return value
    return descriptor
  }
}