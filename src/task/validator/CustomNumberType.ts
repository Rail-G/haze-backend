import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments
} from 'class-validator'

@ValidatorConstraint({ name: 'customNumber', async: false })
export class CustomNumberType implements ValidatorConstraintInterface {
	validate(text: string) {
		return 1 <= Number(text) && !/^0\d+$/.test(text.toString())
	}
}
