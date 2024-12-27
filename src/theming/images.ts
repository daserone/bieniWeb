const COMMON_IMAGES = {
  logoLettersWhite: new URL("@assets/icons/bieni.png", import.meta.url).href,
};

const ICONS_SVG = {
  home: new URL("@assets/icons/home-icon.svg", import.meta.url).href,
  logo_letters: new URL("@assets/icons/bieni-logo.svg", import.meta.url).href,
  my_health: new URL("@assets/icons/my-health-icon.svg", import.meta.url).href,
  studies: new URL("@assets/icons/studies-icon.svg", import.meta.url).href,
  directory: new URL("@assets/icons/directory-icon.svg", import.meta.url).href,
  profile: new URL("@assets/icons/profile-icon.svg", import.meta.url).href,
  logo_color: new URL("@assets/icons/bieni-logo-color.svg", import.meta.url)
    .href,
  google_icon: new URL("@assets/icons/google-icon.png", import.meta.url).href,
  apple_icon: new URL("@assets/icons/apple-icon.svg", import.meta.url).href,
  success_icon: new URL("@assets/icons/succes-icon.svg", import.meta.url).href,
  image_icon: new URL("@assets/icons/icon-image.svg", import.meta.url).href,
  lab_icon: new URL("@assets/icons/icon-lab.svg", import.meta.url).href,
  point_white_icon: new URL(
    "@assets/icons/point-white-icon.svg",
    import.meta.url
  ).href,
  table_icon: new URL("@assets/icons/table-icon.svg", import.meta.url).href,
  table_icon_selected: new URL(
    "@assets/icons/table-icon-selected.svg",
    import.meta.url
  ).href,
  grid_icon: new URL("@assets/icons/grid-icon.svg", import.meta.url).href,
  grid_icon_selected: new URL(
    "@assets/icons/grid-icon-selected.svg",
    import.meta.url
  ).href,
  temperature_icon: new URL("@assets/icons/temp-icon.svg", import.meta.url)
    .href,
  oxygen_icon: new URL("@assets/icons/sat-ox-icon.svg", import.meta.url).href,
  pressure_icon: new URL("@assets/icons/presion-icon.svg", import.meta.url)
    .href,
  weight_icon: new URL("@assets/icons/peso-icon.svg", import.meta.url).href,
  imc_icon: new URL("@assets/icons/imc-icon.svg", import.meta.url).href,
  glucose_icon: new URL("@assets/icons/glucosa-icon.svg", import.meta.url).href,
  respiratory_icon: new URL("@assets/icons/frec-resp-icon.svg", import.meta.url)
    .href,
  cardiac_icon: new URL("@assets/icons/frec-card-icon.svg", import.meta.url)
    .href,
};

export default { COMMON_IMAGES, ICONS_SVG };
