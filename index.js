/*
 * autor: @zyxiao
 */
const install = () => {
	const regEx = /(?=(?!(\b))(\d{3})+$)/g;

	const numberToString = (number: Number): String => {
		// 数字转字符串是否存在精度丢失？
		return number.toString();
	};

	const roundDown = (number: Number, scale: Number): String => {
		// 先乘再除精度可能丢失？
		return numberToString(Math.floor(number * Math.pow(10, scale)) / Math.pow(10, scale));
	};

	const roundPlain = (number: Number, scale: Number): String => {
		// toFixed四舍五入是否精确？
		// toFixed返回的字符串小数点后固定保留scale位；
		return number.toFixed(scale);
	};

	const additionOfZero = (length: Number): String => {
		let temp = ['', '0', '00', '000', '0000']; // 目前最多小数点后保留4位，这里直接枚举
		if (length < 0 || length > 4) {
			return '';
		}
		return temp[length];
	};

	String.prototype.toThousands = function(): string {
		if (!this.length) {
			return null;
		}
		let slices = this.split('.');
		if (slices.length == 1) {
			return slices[0].toString().replace(regEx, '$1,');
		} else if (slices.length == 2) {
			return `${slices[0].toString().replace(regEx, '$1,')}.${slices[1]}`;
		} else {
			return null;
		}
	};

	// 移除数字末尾的0
	String.prototype.wipeOffZero = function(): String {
		if (!this.length) {
			return null;
		}
		return this.replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
	};

	Number.prototype.toThousands = function(): string {
		let numberText = numberToString(this);
		if (!numberText.length) {
			return null;
		}
		let slices = numberText.split('.');
		if (slices.length == 1) {
			return slices[0].toString().replace(regEx, '$1,');
		} else if (slices.length == 2) {
			return `${slices[0].toString().replace(regEx, '$1,')}.${slices[1]}`;
		} else {
			return null;
		}
	};

	Number.prototype.roundPlain = function(roundConfig: Object): String {
		let { scale, ifKeep, ifThousands, prefix, suffix } = roundConfig;
		scale = scale === undefined ? 2 : scale;
		ifKeep = ifKeep === undefined ? false : true;
		ifThousands = ifThousands === undefined ? false : true;
		prefix = prefix === undefined ? '' : prefix;
		suffix = suffix === undefined ? '' : suffix;
		let number = roundPlain(this, scale);
		if (ifThousands) {
			number = number.toThousands();
		}
		let slices = number.split('.');
		if (slices.length == 2) {
			return ifKeep ? `${prefix}${number}${suffix}` : `${prefix}${number.wipeOffZero()}${suffix}`;
		} else {
			return null;
		}
	};

	Number.prototype.roundPlainAndKeepFeature = function(roundConfig: Object): String {
		let { scale, ifThousands, prefix, suffix } = roundConfig;
		scale = scale === undefined ? 2 : scale;
		ifThousands = ifThousands === undefined ? false : true;
		prefix = prefix === undefined ? '' : prefix;
		suffix = suffix === undefined ? '' : suffix;
		let number = roundPlain(this, scale);
		if (ifThousands) {
			number = number.toThousands();
		}
		let slices = number.split('.');
		if (slices.length == 2) {
			if (slices[1] === additionOfZero(scale)) {
				return `${prefix}${slices[0]}${suffix}`;
			} else {
				return `${prefix}${number}${suffix}`;
			}
		} else {
			return null;
		}
	};

	Number.prototype.roundDown = function(roundConfig: Object): String {
		let { scale, ifKeep, ifThousands, prefix, suffix } = roundConfig;
		scale = scale === undefined ? 2 : scale;
		ifKeep = ifKeep === undefined ? false : true;
		ifThousands = ifThousands === undefined ? false : true;
		prefix = prefix === undefined ? '' : prefix;
		suffix = suffix === undefined ? '' : suffix;
		let number = roundDown(this, scale);
		if (ifThousands) {
			number = number.toThousands();
		}
		let slices = number.split('.');
		if (slices.length == 1) {
			return ifKeep ? `${prefix}${number}${additionOfZero(scale)}${suffix}` : `${prefix}${number}${suffix}`;
		} else if (slices.length == 2) {
			return ifKeep
				? `${prefix}${number}${additionOfZero(scale - slices[1].length)}${suffix}`
				: `${prefix}${number}${suffix}`;
		} else {
			return null;
		}
	};

	Number.prototype.roundDownAndKeepFeature = function(roundConfig: Object): String {
		let { scale, ifThousands, prefix, suffix } = roundConfig;
		scale = scale === undefined ? 2 : scale;
		ifThousands = ifThousands === undefined ? false : true;
		prefix = prefix === undefined ? '' : prefix;
		suffix = suffix === undefined ? '' : suffix;
		let number = roundDown(this, scale);
		if (ifThousands) {
			number = number.toThousands();
		}
		let slices = number.split('.');
		if (slices.length == 1) {
			return `${prefix}${number}${suffix}`;
		} else if (slices.length == 2) {
			return `${prefix}${number}${additionOfZero(scale - slices[1].length)}${suffix}`;
		} else {
			return null;
		}
	};
};

export default {
	install,
};
