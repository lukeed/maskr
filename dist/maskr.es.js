export default function (mask, input) {
	var val='', idx=0, pos=0, i=0;
	for (; i < mask.length; i++) {
		if (mask[i] === '_') {
			if (input[idx] !== void 0) {
				val += input[idx];
				idx += 1; // move 1
			} else {
				pos = pos || i;
				val += '_';
			}
		} else {
			val += mask[i];
		}
	}
	return { value:val, cursor:pos };
}
