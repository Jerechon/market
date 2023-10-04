export declare global {
  namespace config {
    const app: {
      isDev: boolean;
      isProd: boolean;
      isTest: boolean;

      port: number;

      closeGraceDelay: number;

      instance: string;
    };

    const coolkie: {
      path: string;
      httpOnly: boolean;
      secure: boolean;
      sameSite: boolean;
    };

    const logger: {
      transport: {
        target: string;
        options: {
          translateTime: string;
          ignore: string;
        };
      };

      level: info | fatal | debug;
    };
  }
}
