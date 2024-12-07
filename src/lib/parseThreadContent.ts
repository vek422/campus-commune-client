export const parseContent = (content: string) => {
    content.replace('/r/n', '<br/>');
    content.replace('/n', '<br/>');
    return content;
}