'use strict';

export function pThread_create(): void {
  const pThreadCreateAddr = Module.getExportByName('libc.so', 'pthread_create');
  console.log('pthread_create_addr: ', pThreadCreateAddr);

  Interceptor.attach(pThreadCreateAddr, {
    onEnter(args) {
      console.log(args.toString());
    },

    onLeave(retval) {
      console.log('retval is =>', retval);
    },
  });
}

export function assistedExplorationPthread(targetELF: string): void {
  const libcModule = Process.getModuleByName('libc.so');
  const pthread_create = new NativeFunction(
    libcModule.getExportByName('pthread_create'),
    'int',
    ['pointer', 'pointer', 'pointer', 'pointer'],
  );

  Interceptor.attach(pthread_create, {
      onEnter: function (args) {
        const libmsaoaidsecModule = Process.getModuleByName(targetELF);
        console.log('pthread_create called with arguments:');
        console.log('attr:', args[0]);
        console.log('attr:', (args[0].sub(libmsaoaidsecModule.base)).toString(16));
        console.log('start_routine:', args[1]);
        console.log('arg:', args[2]);
        console.log('function at=>0x' + (args[2].sub(libmsaoaidsecModule.base)).toString(16));
        console.log('pid:', args[3]);
      },
      onLeave: function (retval) {
        console.log('pthread_create returned:', retval);
        retval.toInt32() === 0
          ? console.log('Thread created successfully!')
          : console.log('Thread creation failed!');
      },

    },
  );
}