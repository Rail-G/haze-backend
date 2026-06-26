import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
	ValidationPipe,
	ValidationError,
	BadRequestException
} from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory(errors: ValidationError[]) {
				const formattedErrors = {}
				errors.forEach(err => {
					if (err.constraints) {
						formattedErrors[err.property] = Object.values(
							err.constraints
						)
					}
				})

				return new BadRequestException(formattedErrors)
			}
		})
	)

	await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
