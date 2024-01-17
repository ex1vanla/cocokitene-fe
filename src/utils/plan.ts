/* eslint-disable */
export const getNumberLimitedPlan = (
    quantity: number,
    t: (value: string) => string,
): string => {
    return quantity === -1 ? t('UNLIMITED') : String(quantity)
}

export const getArrSlider = (start:number, end:number, number:number) => {
	const limit = start > end ? number : end;
	let output = [];
	for (let i = start; i <= limit; i++) {
		output.push(i);
	}
	if (start > end) {
		for (let i = 0; i <= end; i++) {
			output.push(i);
		}
	}
	return output;
};
