import { SetupServer } from './server';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  console.log(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );
  // lets throw the error and let the uncaughtException handle below handle it
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.log(`App exiting due to an uncaught exception: ${error}`);
  process.exit(ExitStatus.Failure);
});

(async (): Promise<void> => {
  try {
    const server = new SetupServer(3000);
    await server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    /*for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          await server.close();
          console.log(`App exited with success`);
          process.exit(ExitStatus.Success);
        } catch (error) {
          console.log(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      });
    }*/
  } catch (error) {
    console.log(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();