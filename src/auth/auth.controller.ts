import {
	Body,
	Controller,
	Post,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto/auth.dto'
import type { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() dto: RegisterDto, @Res() res: Response) {
		const { refreshToken, ...data } = await this.authService.register(dto)
		this.authService.addTokenToCookie(res, refreshToken)
		return data
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res() res: Response) {
		const { refreshToken, ...data } = await this.authService.login(dto)
		this.authService.addTokenToCookie(res, refreshToken)
		return data
	}

	@Post('logout')
	logout(@Res() res: Response) {
		this.authService.deleteTokenFromCookie(res)
		return { message: 'Вы успешно вышли из аккаунта' }
	}

	@Post('access-token')
	async getNewToken(@Res() res: Response, @Req() req: Request) {
		const isValidToken = req.cookies[this.authService.REFRESH_TOKEN]

		if (!isValidToken) {
			throw new UnauthorizedException('Вы не авторизованы')
		}

		const { accessToken, refreshToken } =
			await this.authService.getNewToken(isValidToken)

		this.authService.addTokenToCookie(res, refreshToken)

		return accessToken
	}
}
