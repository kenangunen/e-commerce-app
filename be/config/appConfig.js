const appConfig = {
  exitProcess: () => {
    console.log('application is closing');

    // If necessary, you can close the application.
    process.exit(0);
  }
};

module.export = appConfig;
