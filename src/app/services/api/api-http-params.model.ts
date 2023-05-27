import { HttpParams } from "@angular/common/http";

export type ApiHttpParams = HttpParams | {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};
