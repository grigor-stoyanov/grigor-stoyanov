export function renderTemplate(templateAsString) {
    const pattern = /{{(.+?)}}/gm;
    return (data) => {
        templateAsString.replace(pattern, (match, propName) => {
            return data[propName];
        });
    }
}