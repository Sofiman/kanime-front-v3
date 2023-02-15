import { getBlurHashAverageColor } from 'fast-blurhash'

export function getBlurHashCssGradient(blurHash, baseColor) {
    let base = baseColor.join(',');
    let vals = getBlurHashAverageColor(blurHash).map(v => Math.round(v * 0.6)).join(',');
    return `linear-gradient(0deg, rgba(${base},1) 0%, rgba(${vals},1) 100%)`
}
