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
};

export default { COMMON_IMAGES, ICONS_SVG };
