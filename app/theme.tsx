import { ThemeOptions, createTheme } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
        divider: "rgba(53,45,45,0.12)",
    },
    props: {
        MuiList: {
            dense: true,
        },
        MuiMenuItem: {
            dense: true,
        },
        MuiTable: {
            size: "small",
        },
    },
};

export const theme = createTheme(themeOptions);
