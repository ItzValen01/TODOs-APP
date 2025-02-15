export const getConfig = () => {
    const config = localStorage.getItem("User_Config");
    return config ? JSON.parse(config) : [];
}

export const saveConfig = (config) => {
    localStorage.setItem("User_Config", JSON.stringify(config));
}