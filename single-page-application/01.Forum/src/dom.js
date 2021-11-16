import { postView } from "./app.js"

// create generic html element
function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}

// post structure at home view
export function createPost(data) {
    const element =
        e('div', { className: 'topic-container', id: data._id },
            e('div', { className: "topic-name-wrapper" }, [e('div', { className: 'topic-name' },
                [
                    e('a', { href: '#', className: "normal" }, e('h2', {}, data.topicName)),
                    e('div', { className: 'columns' },
                        [
                            e('div', {},
                                [
                                    e('p', {}, ['Date: ', e('time', {}, data.date)]),
                                    e('div', { className: 'nick-name' },
                                        [
                                            e('p', {}, ['Username: ', e('span', {}, data.userName)])
                                        ])
                                ])
                        ])
                ])
            ])
        )
    // attach post view redirect to each element
    element.addEventListener('click',postView )
    return element
}

// post structure for post View
export function createThread(data) {
    return e('div', { className: 'header' }, [
        e('img', { src: './static/profile.png', alt: 'avatar' }),
        e('p', {}, [e('span', {}, 'posted on '), e('time', {}, data.date)]),
        e('p', { className: 'post-content' }, data.postText)
    ])

}

// comment structure for post view
export function createComment(data) {
    return e('div', { id: 'user-comment' },
        e('div', { className: 'topic-name-wrapper' },
            e('div', { className: 'topic-name' }, [
                e('p', {}, [e('strong', {}, data.userName), ' commented on ', e('time', {}, data.date)]),
                e('div', { className: 'post-content' }, e('p', {}, data.commentText))
            ])
        )
    )
}