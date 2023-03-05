export enum Mask {
    Transparent,
    Fill,
    Flag,
    Question,
    MineActivated,
    FailFlag,
}

export const mapMaskToImageName: Record<Mask, string> = {
    [Mask.Transparent]: 'fill',
    [Mask.Fill]: 'fill',
    [Mask.Flag]: 'flag',
    [Mask.Question]: 'question',
    [Mask.MineActivated]: 'mineActive',
    [Mask.FailFlag]: 'failFlag',
};
