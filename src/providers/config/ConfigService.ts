export interface IAppConfig {
  ENVIRONMENT_NAME: string;
}

export class ConfigService {
  private static _instance: ConfigService;

  private constructor() {}

  static get instance(): ConfigService {
    if (!ConfigService._instance) ConfigService._instance = new ConfigService();
    return ConfigService._instance;
  }

  get appConfig(): IAppConfig {
    return {
      ENVIRONMENT_NAME: import.meta.env.MODE,
    };
  }

  get apiURL(): string {
    return import.meta.env.VITE_BASE_URL;
  }

  get clientId(): string {
    return import.meta.env.VITE_MTMP_CLIENT_ID;
  }

  get flowIdPanama(): string {
    return import.meta.env.VITE_MTMP_FLOW_ID_PANAMA;
  }

  get flowIdExtPanama(): string {
    return import.meta.env.VITE_MTMP_FLOW_ID_EXT_PANAMA;
  }

  get flowIdExt(): string {
    return import.meta.env.VITE_MTMP_FLOW_ID_EXT;
  }

  get flowIdTest(): string {
    return import.meta.env.VITE_MTMP_FLOW_ID_TEST;
  }
}
