type Option = {
    text: string,
    votes: number,
    percentage: number,
    id: string
}
export type PollData = {
    title: string;
    description: string;
    options: Option[]
};