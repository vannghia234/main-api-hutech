import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { render } from 'mustache';
import * as _ from 'lodash';

@Injectable()
export class AssetsProvider {
  private basePath: string;

  constructor() {
    this.basePath = path.join(__dirname, '../../../assets');
  }

  public getSqlFile(fileName: string) {
    return fs
      .readFileSync(path.join(this.basePath, 'sql', fileName))
      .toString();
  }

  public getSqlFileAsync(fileName: string, templateOptions?: any) {
    return new Promise<string>((res, rej) => {
      fs.readFile(path.join(this.basePath, 'sql', fileName), (error, data) => {
        if (error) {
          return rej(error);
        }

        if (templateOptions) {
          return res(
            render(
              data.toString('utf8'),
              _.isEmpty(templateOptions) ? { default: true } : templateOptions,
            ),
          );
        }

        return res(data.toString('utf8'));
      });
    });
  }

  public getHtmlFile(fileName: string) {
    return fs
      .readFileSync(path.join(this.basePath, 'html', fileName))
      .toString();
  }

  public getJsonFile(fileName: string) {
    return fs
      .readFileSync(path.join(this.basePath, 'json', fileName))
      .toString();
  }

  public getJsonFileAsync(fileName: string) {
    return new Promise<any>((res, rej) => {
      fs.readFile(path.join(this.basePath, 'json', fileName), (error, data) => {
        if (error) {
          return rej(error);
        }

        return res(JSON.parse(data.toString('utf8')));
      });
    });
  }
}
