async function fetchProjects() {
    try {
        const response = await fetch("projects.json"); // Fetch local JSON file
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}
