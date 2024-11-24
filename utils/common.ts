
export const bytesToMegaBytes = (bytes: number, digits: number = 1): number =>
    parseFloat((bytes / (1024 * 1024)).toFixed(digits));