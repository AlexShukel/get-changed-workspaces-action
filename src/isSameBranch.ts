export const isSameBranch = (ref1: string, ref2: string): boolean => {
    const ref1Segs = ref1.split("/");
    const ref2Segs = ref2.split("/");

    return ref1Segs[ref1Segs.length - 1] === ref2Segs[ref2Segs.length - 1];
};
