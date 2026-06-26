import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { hash, verify } from 'argon2'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { IJwtPayload } from './interface/jwt.interface'
import { LoginDto } from './dto/auth.dto'
import { Response } from 'express'
import { isDev } from '../shared/utils/isdev'

@Injectable()
export class AuthService {
	public readonly REFRESH_TOKEN_DAY: number
	public readonly REFRESH_TOKEN: string

	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwt: JwtService,
		private readonly configService: ConfigService
	) {
		this.REFRESH_TOKEN_DAY = 5
		this.REFRESH_TOKEN = 'refreshToken'
	}

	async register(dto) {
		const isExist = await this.prismaService.user.findFirst({
			where: {
				firstName: dto.firstName,
				lastName: dto.lastName
			}
		})

		if (isExist) {
			throw new ConflictException(
				'Пользователь с таким именем и фамилией сушествует'
			)
		}

		const { password, ...user } = await this.prismaService.user.create({
			data: {
				...dto,
				password: await hash(dto.password)
			}
		})

		const tokens = this.issueToken(user.id)

		return { user, ...tokens }
	}

	async login(dto: LoginDto) {
		const user = await this.validate(dto)

		const tokens = this.issueToken(user.id)

		return {
			user,
			...tokens
		}
	}

	async getUserById(id: number) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		})

		if (!user) {
			throw new NotFoundException(
				'Пользователь с такими данными не найден'
			)
		}

		return user
	}

	async validate(dto: LoginDto) {
		const user = await this.prismaService.user.findFirst({
			where: {
				firstName: dto.firstName,
				lastName: dto.lastName
			}
		})

		if (!user) {
			throw new NotFoundException(
				'Пользователь с такими данными не найден'
			)
		}

		const isValid = verify(user.password, dto.password)

		if (!isValid) {
			throw new UnauthorizedException('Неверные данные или пароль')
		}

		return user
	}

	issueToken(id: number) {
		const data: IJwtPayload = { id }

		const accessToken = this.jwt.sign(data, {
			expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_TTL')
		} as JwtSignOptions)

		const refreshToken = this.jwt.sign(data, {
			expiresIn: this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL')
		} as JwtSignOptions)

		return { accessToken, refreshToken }
	}

	async getNewToken(refreshToken) {
		const data: IJwtPayload = await this.jwt.verifyAsync(refreshToken)

		if (!data) {
			throw new UnauthorizedException('Токен не валидный')
		}

		const user = await this.getUserById(data.id)

		const tokens = this.issueToken(user.id)

		return tokens
	}

	addTokenToCookie(res: Response, token: string) {
		const date = new Date()

		date.setDate(date.getDate() + this.REFRESH_TOKEN_DAY)

		res.cookie(this.REFRESH_TOKEN, token, {
			expires: date,
			httpOnly: true,
			secure: !isDev,
			sameSite: 'lax'
		})
	}

	deleteTokenFromCookie(res: Response) {
		const date = new Date(0)

		res.cookie(this.REFRESH_TOKEN, '', {
			expires: date,
			httpOnly: true,
			secure: !isDev,
			sameSite: 'lax'
		})
	}
}
