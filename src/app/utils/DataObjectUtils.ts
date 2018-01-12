import { OnInit } from '@angular/core';

export class DataObjectUtils {

	/**
	 * strip white space from start and end of the string
	 */
	public static stripWhiteSpace(value: any) {
		let hasEmpty = false;
		for (const i in value) {
			if (typeof (value[i]) === 'string') {
				value[i] = String(value[i]).trim();
				if (value[i] === '') {
					hasEmpty = true;
				}
			}
		}
		return hasEmpty;
	}

	/**
	 * validate User name input
	 * As by default input type text will not validate all types of text error
	*/
	public static validateUserName(userName) {
		const regExp = /^[0-9a-zA-Z]+$/;
		return regExp.test(userName);
	}

}
