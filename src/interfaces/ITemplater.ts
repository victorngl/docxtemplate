export interface ITemplater {
    render(data: Record<string, any>): Promise<Buffer>;
}