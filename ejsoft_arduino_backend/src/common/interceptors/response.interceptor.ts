import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 응답이 이미 포맷되어 있는지 확인
        if (data && data.statusCode && data.message && data.data) {
          return data;
        }

        // 그렇지 않은 경우에만 포맷, axios not use
        // return {
        //   statusCode: context.switchToHttp().getResponse().statusCode,
        //   message: 'Request successful',
        //   data,
        // };

        // axios use
        return data;
      }),
    );
  }
}
