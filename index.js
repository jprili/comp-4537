const loadCoursework = async () => {
    try {
        const response = await fetch("./coursework.json");
        if (!response.ok) {
            throw new Error("HTTP error" + response.status);
        }
        const coursework = await response.json();
        return coursework;
    } catch (e) {
        console.error(e.message);
        return null
    }
}

const displayCourseWork = async () => {
    let coursework = await loadCoursework();
    document.getElementById("main").textContent = 
        JSON.stringify(coursework);
}

displayCourseWork();