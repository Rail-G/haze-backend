import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'customPassword', async: false })
export class CustomPasswordType implements ValidatorConstraintInterface {
	validate(value: any): boolean {
		return (
			/[A-Za-z]/.test(value) &&
			/[A-Z]/.test(value) &&
			/\d/.test(value) &&
			/[^A-Za-z0-9]/.test(value)
		)
	}
}
