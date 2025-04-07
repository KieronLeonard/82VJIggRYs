export interface Item {
    id: number;
    deleted: boolean | undefined;
    type: string | undefined;
    by: string | undefined;
    time: number | undefined;
    text: string | undefined;
    dead: boolean | undefined;
    parent: number | undefined;
    poll: number | undefined;
    kids: number[] | undefined;
    url: string | undefined;
    score: number | undefined;
    title: string | undefined;
    parts: number[] | undefined;
    descendants: number | undefined;
}
