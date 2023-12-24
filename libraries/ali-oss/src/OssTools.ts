export class OssTools {
  public buildThumbnailOptions(width?: number, height?: number) {
    if (!width && !height) {
      return {}
    }
    const items = ['image/resize']
    if (width) {
      items.push(`w_${width}`)
    }
    if (height) {
      items.push(`h_${height}`)
    }
    return {
      process: items.join(','),
    }
  }
}
