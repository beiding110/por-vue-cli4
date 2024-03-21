/**
 * 控制主题色
 */

const version = require("element-ui/package.json").version; // element-ui version from node_modules
const ORIGINAL_THEME = "#3D7EFF"; // default color
const DEFAULT_ELEMENT_UI_THEME = "#409EFF"; // element-ui原本的主题色，也应该被替换

export const state = () => ({
    chalk: "", // content of theme-chalk css
    theme: "",
});

export const mutations = {
    updateTheme(state, { key, value }) {
        state[key] = value;
    },
};

export const getters = {
    defaultTheme(state) {
        return state.theme;
    },
};

export const actions = {
    /**
     * 修改主题颜色
     * @param {Object} param0 Store实例
     * @param {String} val 色值
     * @returns
     */
    async setTheme({ state, commit }, val) {
        if (typeof window === "undefined") {
            return;
        }

        const oldVal = state.chalk ? state.theme : ORIGINAL_THEME;

        if (typeof val !== "string") return;

        const themeCluster = getThemeCluster(val.replace("#", ""));
        const originalCluster = getThemeCluster(oldVal.replace("#", ""));
        const defaultCluster = getThemeCluster(
            DEFAULT_ELEMENT_UI_THEME.replace("#", "")
        );

        const getHandler = (variable, id) => {
            return () => {
                const originalCluster = getThemeCluster(
                    ORIGINAL_THEME.replace("#", "")
                );

                const defaultCluster = getThemeCluster(
                    DEFAULT_ELEMENT_UI_THEME.replace("#", "")
                );

                const newStyle = updateStyle(
                    state[variable],
                    [originalCluster, defaultCluster],
                    themeCluster
                );

                let styleTag = document.getElementById(id);

                if (!styleTag) {
                    styleTag = document.createElement("style");

                    styleTag.setAttribute("id", id);
                    styleTag.setAttribute("type", "text/css");

                    document.head.appendChild(styleTag);
                }

                styleTag.innerText = newStyle;
            };
        };

        if (!state.chalk) {
            const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;

            const newChalk = await getCSSString(url);

            commit("updateTheme", {
                key: "chalk",
                value: newChalk,
            });
        }

        const chalkHandler = getHandler("chalk", "chalk-style");

        chalkHandler();

        const styles = [].slice
            .call(document.querySelectorAll("style"))
            .filter((style) => {
                const text = style.innerText;
                return (
                    new RegExp(oldVal, "i").test(text) &&
                    !/Chalk Variables/.test(text)
                );
            });

        styles.forEach((style) => {
            const { innerText } = style;

            if (typeof innerText !== "string") return;

            const newStyle = updateStyle(
                innerText,
                [originalCluster, defaultCluster],
                themeCluster
            );

            style.innerText = newStyle;
        });

        commit("updateTheme", {
            key: "theme",
            value: val,
        });
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};

function updateStyle(style, oldCluster, newCluster) {
    if (!typeof window) {
        return;
    }

    let newStyle = style;

    if (Array.isArray(oldCluster[0])) {
        // 多个要替换的组

        oldCluster.forEach((cluster) => {
            cluster.forEach((color, index) => {
                newStyle = newStyle.replace(
                    new RegExp(color, "ig"),
                    newCluster[index]
                );
            });
        });
    } else {
        // 单个要替换的组
        oldCluster.forEach((color, index) => {
            newStyle = newStyle.replace(
                new RegExp(color, "ig"),
                newCluster[index]
            );
        });
    }

    return newStyle;
}

function getCSSString(url) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = xhr.responseText.replace(/@font-face{[^}]+}/, "");
                resolve(res);
            }
        };

        xhr.open("GET", url);
        xhr.send();
    });
}

function getThemeCluster(theme) {
    const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
            // when primary color is in its rgb space
            return [red, green, blue].join(",");
        } else {
            red += Math.round(tint * (255 - red));
            green += Math.round(tint * (255 - green));
            blue += Math.round(tint * (255 - blue));

            red = red.toString(16);
            green = green.toString(16);
            blue = blue.toString(16);

            return `#${red}${green}${blue}`;
        }
    };

    const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
    };

    const clusters = [theme];

    for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }

    clusters.push(shadeColor(theme, 0.1));

    return clusters;
}
