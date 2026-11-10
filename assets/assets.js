import api_icon from "./api_icon.png";
import portfolioJson from "../data/portfolio-data.json";
import arrow_icon_dark from "./arrow-icon-dark.png";
import arrow_icon from "./arrow-icon.png";
import be_icon from "./be_icon.png";
import close_black from "./close-black.png";
import close_white from "./close-white.png";
import code_icon_dark from "./code-icon-dark.png";
import code_icon from "./code-icon.png";
import download_icon from "./download-icon.png";
import edu_icon_dark from "./edu-icon-dark.png";
import edu_icon from "./edu-icon.png";
import fe_icon from "./fe_icon.png";
import figma from "./figma.png";
import firebase from "./firebase.png";
import fs_icon from "./fs_icon.png";
import git from "./git.png";
import github from "./github.png";
import graphics_icon from "./graphics-icon.png";
import hand_icon from "./hand-icon.png";
import handsOn from "./handsOn.png";
import header_bg_color from "./header-bg-color.png";
import logo from "./logo.png";
import logoNiloy from "./logoNiloy.png";
import logo_dark from "./logo_dark.png";
import mail_icon from "./mail_icon.png";
import mail_icon_dark from "./mail_icon_dark.png";
import menu_black from "./menu-black.png";
import menu_white from "./menu-white.png";
import mobile_icon from "./mobile-icon.png";
import mongodb from "./mongodb.png";
import moon_icon from "./moon_icon.png";
import ndemy1 from "./ndemy1.png";
import newcare from "./newcare.png";
import niloyinventory from "./niloyinventory.png";
import nobot from "./nobot.png";
import nqr from "./nqr.png";
import nrl from "./nrl.png";
import profile_img from "./profile-img.png";
import profileNiloy from "./profileNiloy.png";
import profileNiloyTP from "./profileNiloyTP.png";
import project_icon_dark from "./project-icon-dark.png";
import project_icon from "./project-icon.png";
import right_arrow_bold_dark from "./right-arrow-bold-dark.png";
import right_arrow_bold from "./right-arrow-bold.png";
import right_arrow_white from "./right-arrow-white.png";
import right_arrow from "./right-arrow.png";
import send_icon from "./send-icon.png";
import sun_icon from "./sun_icon.png";
import ui_icon from "./ui-icon.png";
import user_image from "./user-image.png";
import userImageNiloyMD from "./userImageNiloyMD.png";
import userImageNiloySM from "./userImageNiloySM.png";
import vscode from "./vscode.png";
import web_icon from "./web-icon.png";

export const assets = {
  newcare,
  github,
  ndemy1,
  niloyinventory,
  nqr,
  nrl,
  nobot,
  fe_icon,
  be_icon,
  api_icon,
  fs_icon,
  user_image,
  userImageNiloySM,
  userImageNiloyMD,
  code_icon,
  code_icon_dark,
  edu_icon,
  edu_icon_dark,
  project_icon,
  project_icon_dark,
  vscode,
  firebase,
  figma,
  git,
  logoNiloy,
  profileNiloy,
  profileNiloyTP,
  mongodb,
  right_arrow_white,
  logo,
  logo_dark,
  mail_icon,
  mail_icon_dark,
  profile_img,
  download_icon,
  hand_icon,
  header_bg_color,
  moon_icon,
  sun_icon,
  arrow_icon,
  arrow_icon_dark,
  menu_black,
  menu_white,
  close_black,
  close_white,
  web_icon,
  mobile_icon,
  ui_icon,
  graphics_icon,
  right_arrow,
  send_icon,
  right_arrow_bold,
  right_arrow_bold_dark,
  handsOn,
};

export const workData = portfolioJson.workData;

export const serviceData = [
  {
    icon: assets.fe_icon,
    title: "Frontend Engineering",
    description:
      "React/Next.js interfaces: pixel-complete, accessible web applications with zero layout shift.",
    link: "",
  },
  {
    icon: assets.be_icon,
    title: "Backend Architecture",
    description:
      "NestJS/Node.js & Express services: modular, high-throughput APIs and microservices.",
    link: "",
  },
  {
    icon: assets.api_icon,
    title: "Database & API Systems",
    description:
      "PostgreSQL & MongoDB schemas: optimized queries, indexing, and secure JWT/OAuth RBAC.",
    link: "",
  },
  {
    icon: assets.fs_icon,
    title: "Full-Stack & DevOps",
    description:
      "End-to-end Next.js/NestJS products containerized with Docker and automated CI/CD pipelines.",
    link: "",
  },
];

export const infoList = [
  {
    icon: assets.code_icon,
    iconDark: assets.code_icon_dark,
    title: "Frontend",
    description: "React.js, Next.js, TypeScript, Tailwind CSS",
  },
  {
    icon: assets.be_icon,
    iconDark: assets.be_icon,
    title: "Backend",
    description: "Node.js, NestJS, Express.js, REST APIs",
  },
  {
    icon: assets.api_icon,
    iconDark: assets.api_icon,
    title: "Database & DevOps",
    description: "PostgreSQL, MongoDB, Docker, CI/CD",
  },
];

export const toolsData = [
  assets.vscode,
  assets.mongodb,
  assets.git,
  assets.github,
  assets.figma,
];

export const socialLinks = [
  { name: "github", url: "https://github.com/niloydiu" },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/niloykumarmohonta000/",
  },
  { name: "twitter", url: "https://x.com/niloykmohonta" },
  { name: "facebook", url: "https://www.facebook.com/niloykumarmohonta000" },
];
