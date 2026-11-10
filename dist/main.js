import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { BigIntInterceptor } from './common/interceptors/bigint.interceptor.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new BigIntInterceptor());
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
//# sourceMappingURL=main.js.map