export const BASE_URL = "http://localhost:5000";

export const FILE_URL = "http://localhost:5000/app/";

export const herokuURL = "https://ttodorov.herokuapp.com/";

export interface Themes {
  lightTheme: "lightTheme";
  darkTheme: "darkTheme";
  sunSetTheme: "sunSetTheme";
}
export const themes: Themes = {
  lightTheme: "lightTheme",
  darkTheme: "darkTheme",
  sunSetTheme: "sunSetTheme",
};

export interface States {
  idle: "idle";
  loading: "loading";
  failed: "failed";
}
export const states: States = {
  idle: "idle",
  loading: "loading",
  failed: "failed",
};

export interface DefaultTheme {
  idle: "idle";
  loading: "loading";
  failed: "failed";
}
export const defaultTheme: keyof Themes = themes.darkTheme;
