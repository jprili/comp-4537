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
    const coursework = await loadCoursework();
    const header = document.createElement("h1");
    header.textContent = "James' COMP 4537 Labs";

    const main = document.getElementById("main");
    main.appendChild(header);

    const list = document.createElement("ol");

    for (let { name, link } of coursework.labs) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link;
        a.textContent = name;
        list.appendChild(li).appendChild(a);
    }

    main.appendChild(list);
}

displayCourseWork();