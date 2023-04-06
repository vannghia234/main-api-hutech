import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AppConfig } from '../../../lib/config/app.config';
import { MyHttpService } from '../../../lib/infra/http/my-http.service';

@Injectable()
export class TodoProxy {
  constructor(
    private readonly httpService: MyHttpService,
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>,
  ) { }

  // public async clearTokenDangNhap(tai_khoan: any[], app_key) {
  //   return this.httpService
  //     .post(this.appConfig.apiXoaTokenDangNhap, {
  //       tai_khoan: tai_khoan,
  //     }, {
  //       headers: {
  //         'app-key': app_key,
  //       }
  //     })
  //     .toPromise()
  //     .then((response) => {
  //       console.log(response.data["result"])
  //       return response.data["result"]
  //     })
  //     .catch(error => {
  //       return Promise.reject({ message: "get contacts that bai", error: error.response.data });
  //     })
  // }
}
