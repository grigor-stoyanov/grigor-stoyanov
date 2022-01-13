import { classMap, html } from "../lib.js";

export const input = (label, type, name, value = '', hasError) => {
        if (type == 'textarea') {
                return html`<label class=${classMap({ error: hasError })}><span>${label} </span><textarea .value=${value}
                name=${name}></textarea></label>`
        } else {
                return html`
<label class=${classMap({ error: hasError })}><span>${label} </span><input type=${type} name=${name}
                .values=${value}></label>`
        }
}