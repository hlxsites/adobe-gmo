import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
    const config = readBlockConfig(block);

    Array.from(block.children).forEach((child) => {
        child.classList.add("teaser");
        child.children[0]?.classList.add("title");
        child.children[1]?.classList.add("body");
    })
}