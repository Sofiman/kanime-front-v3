const digit =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~';
const decode83 = (str, start, end) => {
    let value = 0;
    while (start < end) {
        value *= 83;
        value += digit.indexOf(str[start++]);
    }
    return value;
};

export function getBlurHashAvgColor(blurHash) {
    const val = decode83(blurHash, 2, 6);
    return [val >> 16, (val >> 8) & 255, val & 255];
}

export function getBlurHashCssGradient(blurHash) {
    let vals = getBlurHashAvgColor(blurHash).map(v => Math.round(v * 0.6)).join(',');
    return `linear-gradient(0deg, rgba(24,24,32,1) 0%, rgba(${vals},1) 100%)`
}
