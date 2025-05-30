import Vue from 'vue';

export interface Match {
    indices: Array<[number, number]>;
    value: string;
    key: string;
    arrayIndex: number;
}

const HighlightMatch = Vue.extend({
    functional: true,
    props: {
        match: {
            type: Object,
            required: true,
        },
        highlight: {
            type: [String, Object],
            default: 'background-color: yellow;',
        },
    },
    render(h, context) {
        const match: Match = context.props.match;
        if (!match) {
            // match.indices
            return h('span', { ...context.data }, '');
        }
        const highlightStyle = context.props.highlight;
        const chunks: Array<{ highlight: boolean; text: string }> = [];
        const text = match.value;
        let lastStart = 0;
        for (const [start, end] of match.indices) {
            if (end < start) continue;
            if (lastStart < start) {
                chunks.push({
                    highlight: false,
                    text: text.substr(lastStart, start - lastStart),
                });
            }
            const realEnd = Math.min(text.length, end + 1);
            chunks.push({ highlight: true, text: text.substr(start, realEnd - start) });
            lastStart = realEnd;
        }
        if (lastStart < text.length - 1) {
            chunks.push({ highlight: false, text: text.substr(lastStart, text.length - lastStart) });
        }
        // match.indices
        return h(
            'span',
            { ...context.data },
            chunks.map(({ highlight, text }) => {
                return h('span', { style: highlight ? highlightStyle : '' }, text);
            })
        );
    },
});

export default HighlightMatch;
export { HighlightMatch };
