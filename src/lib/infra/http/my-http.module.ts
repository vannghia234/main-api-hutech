import { DynamicModule, Module, Provider } from '@nestjs/common';
import axios from 'axios';
import { MyHttpService } from './my-http.service';

export interface MyHttpConfig {
  headerAppKey?: string;
}

const myHttpServiceProvider = (config: MyHttpConfig = {}): Provider => {
  return {
    provide: MyHttpService,
    useFactory: () => {
      const instance = axios.create();
      return new MyHttpService(instance);
    },
  };
};

@Module({
  providers: [myHttpServiceProvider()],
  exports: [myHttpServiceProvider()],
})
export class MyHttpModule {
  public static register(config?: MyHttpConfig): DynamicModule {
    return {
      module: MyHttpModule,
      providers: [myHttpServiceProvider(config)],
      exports: [myHttpServiceProvider(config)],
    };
  }
}
