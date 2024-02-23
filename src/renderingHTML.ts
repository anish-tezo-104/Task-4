export class RenderingHTML {
    constructor() {
    }

    async includeHTML(url: string, containerId: string = "displayWindow"): Promise<void> {
        try {
            const response = await fetch(url);
            const data = await response.text();
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = "";
                container.innerHTML += data;
            }
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
        }
    }
}