export function mountRoot(element: HTMLElement) {
    const root = document.getElementById("root");

    if (!root) {
        throw new Error('No root element');
    }
    
    root.appendChild(element);
}
