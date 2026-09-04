import React from "react";

type P = React.SVGProps<SVGSVGElement>;

export const IconSearch = (p: P) => (
  <svg aria-hidden="true" focusable="false" fill="none" viewBox="0 0 18 19" {...p}>
    <path
      clipRule="evenodd"
      d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.7l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.4z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const IconClose = (p: P) => (
  <svg aria-hidden="true" focusable="false" fill="none" viewBox="0 0 18 17" {...p}>
    <path
      d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
      fill="currentColor"
    />
  </svg>
);

export const IconHamburger = (p: P) => (
  <svg aria-hidden="true" focusable="false" fill="none" viewBox="0 0 18 16" {...p}>
    <path
      d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
      fill="currentColor"
    />
  </svg>
);

export const IconAccount = (p: P) => (
  <svg aria-hidden="true" focusable="false" fill="none" viewBox="0 0 18 19" {...p}>
    <path
      clipRule="evenodd"
      d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const IconCart = (p: P) => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 35.53 44.83" {...p}>
    <path
      d="M12.36,10.93l29.38-.08q.72,16.41,1.45,32.8H10.66Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      transform="translate(-9.16 -0.32)"
    />
    <path
      d="M19.39,10.85V9.52a7.7,7.7,0,1,1,15.39,0v1.33"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      transform="translate(-9.16 -0.32)"
    />
    <path
      d="M19.12,15.46a7.7,7.7,0,0,0,15.08,0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      transform="translate(-9.16 -0.32)"
    />
  </svg>
);

export const IconCaret = (p: P) => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 10 6" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
      fill="currentColor"
    />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg viewBox="0 0 40 40" width="40" height="40" focusable="false" {...p}>
    <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z" fill="currentColor" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg viewBox="0 0 576 512" fill="currentColor" {...p}>
    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
  </svg>
);

export const IconQuote = (p: P) => (
  <svg viewBox="0 0 512 512" {...p}>
    <path
      fill="currentColor"
      d="M119.472 66.59C53.489 66.59 0 120.094 0 186.1c0 65.983 53.489 119.487 119.472 119.487c0 0-0.578 44.392-36.642 108.284c-4.006 12.802 3.135 26.435 15.945 30.418c9.089 2.859 18.653 0.08 24.829-6.389c82.925-90.7 115.385-197.448 115.385-251.8C238.989 120.094 185.501 66.59 119.472 66.59z"
    />
    <path
      fill="currentColor"
      d="M392.482 66.59c-65.983 0-119.472 53.505-119.472 119.51c0 65.983 53.489 119.487 119.472 119.487c0 0-0.578 44.392-36.642 108.284c-4.006 12.802 3.136 26.435 15.945 30.418c9.089 2.859 18.653 0.08 24.828-6.389C479.539 347.2 512 240.452 512 186.1C512 120.094 458.511 66.59 392.482 66.59z"
    />
  </svg>
);

export const IconVerified = (p: P) => (
  <svg viewBox="0 0 122.88 116.87" {...p}>
    <polygon
      fill="#ffcc00"
      fillRule="evenodd"
      points="61.37 8.24 80.43 0 90.88 17.79 111.15 22.32 109.15 42.85 122.88 58.43 109.2 73.87 111.15 94.55 91 99 80.43 116.87 61.51 108.62 42.45 116.87 32 99.08 11.73 94.55 13.73 74.01 0 58.43 13.68 42.99 11.73 22.32 31.88 17.87 42.45 0 61.37 8.24 61.37 8.24"
    />
    <path
      fill="#ffffff"
      d="M37.92,65c-6.07-6.53,3.25-16.26,10-10.1,2.38,2.17,5.84,5.34,8.24,7.49L74.66,39.66C81.1,33,91.27,42.78,84.91,49.48L61.67,77.2a7.13,7.13,0,0,1-9.9.44C47.83,73.89,42.05,68.5,37.92,65Z"
    />
  </svg>
);

export const IconDiscount = (p: P) => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 12 12" {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
      fill="currentColor"
    />
  </svg>
);

export const IconChevronUp = (p: P) => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 512 512" {...p}>
    <path
      fill="currentColor"
      d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
    />
  </svg>
);

/** Material "local_shipping" (outlined) */
export const IconShipping = (p: P) => (
  <svg viewBox="0 -960 960 960" fill="currentColor" {...p}>
    <path d="M224-161q-49 0-84.5-35.5T104-281H40v-357q0-24 18-42t42-18h579v168h104l137 182v187h-68q0 49-35.5 84.5T732-41q-49 0-84.5-35.5T612-161H344q0 49-35.5 84.5T224-161Zm0-60q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM100-341h22q17-27 43.5-43t58.5-16q31 0 58 15.5t44 43.5h293v-297H100v297Zm632 120q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm-53-209h186L754-530h-75v100ZM360-490Z" />
  </svg>
);

export const IconFilter = (p: P) => (
  <svg aria-hidden="true" focusable="false" fill="none" viewBox="0 0 20 20" {...p}>
    <path
      d="M4.833 6.5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333ZM4.833 16.833a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333ZM15.167 11.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4.833 6.5v6.667M15.167 3.167v5.166M15.167 11.667v5.166M18 4.833h-2.833M1.667 4.833h3.166M12.333 10h2.834M18 10h-2.833M1.667 15.167h3.166M18 15.167h-2.833M12.333 4.833H6.5M12.333 15.167H6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconRemove = (p: P) => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor" />
    <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor" />
  </svg>
);

/** "Most Popular" sticker used on the bundle tier */
export const MostPopularBadge = (p: P) => (
  <svg width="102" height="60" viewBox="0 0 102 60" fill="none" {...p}>
    <ellipse cx="47.9" cy="23.5" rx="47.9" ry="23.5" transform="matrix(.9929 .11897 -.14278 .98975 6.7 2)" fill="currentColor" />
    <ellipse cx="47.9" cy="23.5" rx="47.9" ry="23.5" transform="matrix(.9929 .11897 -.14278 .98975 6.7 2)" fill="#000" fillOpacity=".3" />
    <ellipse cx="47.9" cy="23.5" rx="47.9" ry="23.5" transform="matrix(.9929 .11897 -.14278 .98975 6.7 0)" fill="currentColor" />
    <path
      d="M28 15.4 25.4 24a.3.3 0 0 1 0 .1.2.2 0 0 1-.2.1c-.4.1-.7 0-.8-.4a1007.3 1007.3 0 0 1-3.9-9.2l-.8 7.6a.5.5 0 0 0 0 .2l.6.8a.7.7 0 0 1 0 .1.2.2 0 0 1 0 .1c0 .5-1.7.1-2 0-1 0 .1-1 .2-1.4l1.1-9c0-.4-.1-.7-.5-1a.4.4 0 0 1-.1-.2v-.2a.2.2 0 0 1 .1 0 15.2 15.2 0 0 1 3.1.2h.1c.1 0 0 0 0 .1.3.5-.5.7-.3 1.2a1361.6 1361.6 0 0 1 3.2 8.1l2.3-7.3a.7.7 0 0 0-.1-.6c-.3-.4-1-1 .1-1l2.7.4c.2 0 .3.2.2.4a.4.4 0 0 1-.1.2c-.3.3-.5.5-.4 1a771.7 771.7 0 0 0 2.5 10c.5.5.7 1-.3.8l-2.2-.3c-.5 0-.5-.4-.1-1a.7.7 0 0 0 .1-.6l-1.6-7.6c0-.2-.1-.2-.1 0zm24 4.7.1 4.5c0 1 .6 1.5 1.6 1.5.3 0 .5-.2.6-.5.1-.4.3-.5.5-.3h.1v.1c.1 1.1-.4 2-1.5 2-2.3.4-3.2-1.2-3.3-3.3l-.2-4.1c0-.4-.2-.5-.6-.5-.5 0-.8-.1-.7-.7a.2.2 0 0 1 .2-.1c1.3.2 2-.3 2-1.6a.2.2 0 0 1 .2-.1c1.1-.5.9 1.3.9 1.9a.1.1 0 0 0 .1.1l2.2.3.2.1c.1.3.1.5-.1.7a.2.2 0 0 1-.1 0 .4.4 0 0 1-.1 0l-2-.1a.1.1 0 0 0-.1 0zm-11.6 4.6c-.7.8-1.8 1.2-3 1.1-1.1 0-2.3-.5-3.3-1.4A5.7 5.7 0 0 1 33 23a5 5 0 0 1-.6-1.7 4 4 0 0 1 .1-1.7c.1-.5.4-1 .8-1.4.7-.7 1.7-1.2 2.9-1.1 1.2 0 2.4.6 3.3 1.4.5.4.9 1 1.2 1.5.3.5.5 1.1.5 1.7a4 4 0 0 1 0 1.6c-.2.6-.5 1-.8 1.4zm-2.4.4c.3 0 .5-.3.7-.5l.5-1v-1.4a6.4 6.4 0 0 0-.3-1.4 6.4 6.4 0 0 0-.6-1.4 4.7 4.7 0 0 0-.8-1 2.6 2.6 0 0 0-1-.6 1.5 1.5 0 0 0-.9 0c-.3 0-.5.3-.7.5l-.4 1a4.7 4.7 0 0 0 0 1.4 6.4 6.4 0 0 0 1.7 3.8c.3.3.6.5 1 .6.2 0 .5.1.8 0zm8-6c-1-.8-2.4-.4-2.3 1 0 .4.3.8.7 1l3 1.2c1.1.5 2.2 2.5 1.1 3.6-1.6 1.8-5.6.6-6.8-1.3-.2-.4-.1-.8.4-1 1.2-.5 1.5 1.5 2.3 2 1 .8 3 .6 2.4-1.1-.3-1-3.2-1.8-3.8-2.2-1.9-1.2-1.8-4 .8-4.3 1.6-.1 4.5.6 4.7 2.6a.3.3 0 0 1 0 .3c-1.1 1.3-1.9-1.3-2.5-1.8zM28.3 34.9c0 1.4 0 2 .8 3 .2.2.2.4 0 .6a.3.3 0 0 1-.2 0l-3.8-.3a.4.4 0 0 1-.3 0c-.3-.4-.3-.7 0-1a1 1 0 0 0 .4-.8L25 28c0-.4-.3-.9-.8-1.4a.3.3 0 0 1 0-.1.2.2 0 0 1 0-.1c0-.3.2-.4.6-.3 3.4.2 9.4.1 9.7 4.8.3 3.8-3 4.1-6 3.9zm-.2-6.7c0 1.4 0 3 .2 4.6 0 .3.2.5.5.6 3.4 1 2.5-3.2 1.6-4.6-.3-.5-.8-.9-1.5-1.1-.5-.2-.8 0-.8.5zM59.5 41c-1.7 1.3-4.3.4-5.2-1.4-1-1.8 0-4.1-1.3-5.8a.4.4 0 0 1 0-.2c0-.6.4-.5.8-.5a19.9 19.9 0 0 1 2.5 0 .4.4 0 0 1 .4.3l.2 5.3c0 .8.3 1.8 1.1 1.8 1.7.2 1-4.2 1-5.3a.5.5 0 0 0-.2-.2l-.5-.8c-.3-.3-.2-.5.3-.6h2.9c.3 0 .4 0 .4.4l.3 6c0 1.6 1.4 1.6 1.3-.2l-.3-7c0-.8-.3-1.2-.8-1.8a.3.3 0 0 1 0-.2.3.3 0 0 1 0-.2.3.3 0 0 1 .2 0l2.8-1.2c.5-.2.8 0 .8.6l.5 10.4c0 .5.2.8.6 1.2.3.4.4 1-.4.8-.9 0-3.1 0-3.9-.4a.4.4 0 0 0-.2 0c-.9 0-2.7.1-3.1-1a.1.1 0 0 0-.2 0zm-16.4-3c-.5 1-1.5 1.6-2.7 1.8-1.2.2-2.5 0-3.6-.7a5.7 5.7 0 0 1-1.5-1.2 5 5 0 0 1-.9-1.6 4.2 4.2 0 0 1-.2-1.7 3.5 3.5 0 0 1 .5-1.6c.5-.9 1.5-1.5 2.7-1.7 1.2-.2 2.5 0 3.6.7a5.7 5.7 0 0 1 1.4 1.2c.5.5.8 1 1 1.6.2.5.2 1.1.2 1.7a3.5 3.5 0 0 1-.5 1.5zm-3.3 1c.2 0 .3-.1.4-.4l.3-.8v-1.3a8.8 8.8 0 0 0-.3-1.3 8.8 8.8 0 0 0-.5-1.3 5.9 5.9 0 0 0-.6-1.1l-.6-.6c-.2-.2-.4-.2-.6-.2-.2 0-.3.2-.4.4l-.3 1v1.1a8.8 8.8 0 0 0 1.4 3.8l.6.6c.2.1.4.2.6.1z"
      fill="#FEFDFD"
    />
    <path
      d="M46.9 32.7a3 3 0 0 1 2.8-.3c2.5.8 3.6 2.5 3.5 5-.2 2.9-3.2 4.2-5.5 2.9-.2-.1-.2 0-.2 0 .1 1-.2 2.2.7 3 .3.2.4.5.1.7a.3.3 0 0 1-.2.1 401 401 0 0 0-3.5-.3c-.4 0-.6-.3-.7-.6a.3.3 0 0 1 0-.1.5.5 0 0 1 .1-.1l.5-.7a.4.4 0 0 0 0-.2l-.2-7.3c0-.6-1.1-.9-.9-1.6a.3.3 0 0 1 .2-.2l2.6-1a.2.2 0 0 1 .2 0c.2.1.4.4.4.7zM49 40c2.2 0 .5-5.5-.1-6.4-.7-.8-1.5-.7-1.7.4v3.4c.2.9.6 2.6 1.8 2.6zm24.5 2.7c-2.7 1.4-5.7-1-6.1-3.7-.7-3.5 2.8-5.8 5.8-3.8a.1.1 0 0 0 .1 0c.3-.7 2.3 0 2.9.2.4 0 .6.3.5.7a.3.3 0 0 1 0 .1.3.3 0 0 1-.1 0c-.4.4-.6.8-.6 1.2 0 2.3.2 3.7.2 4.2s1 1.2.7 1.7a.2.2 0 0 1-.1 0 .3.3 0 0 1-.2.1l-2.6-.3a.3.3 0 0 1-.2 0l-.2-.4a.1.1 0 0 0-.1 0zm-.4-5.2c-.2-1.8-2.7-3.4-2.8-.7-.1 1.5.3 4.6 1.9 5.5a.4.4 0 0 0 .2 0c1.4-.3.8-3.5.7-4.8zM80.5 36.5c.3-.3.5-.7 1-.9 3.8-1.6 3.6 4.9.9 2.9-.5-.4-.5-1.7-1.2-1.5a.3.3 0 0 0-.1 0 .3.3 0 0 0 0 .2c-.4.7-.4 4.6.1 5.2.2.3 1.5 1.2.2 1.2a52 52 0 0 1-3.5-.3c-.3 0-.5-.2-.5-.5a.4.4 0 0 1 0-.2c.4-.4.6-.7.6-1.2l-.2-3.5a.4.4 0 0 0 0-.2l-.9-1c-.2-.2 0-.4.3-.6l2.6-1c.3 0 .5 0 .5.4v1h.2z"
      fill="#FEFDFD"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m82.2 24.2-.7-6.2-.7 6.2-2.7-2.1 2 2.7-6.1.7 6.2.7L78 29l2.8-2.1.7 6.1.7-6.1L85 29l-2.2-2.8 6.2-.7-6.1-.7 2-2.7-2.7 2.1z"
      fill="#fff"
    />
    <path
      d="M45 4v1a2 2 0 0 0 2 2h1-1a2 2 0 0 0-2 2v1-1a2 2 0 0 0-2-2h-1 1a2 2 0 0 0 2-2V4zm12 41v1a2 2 0 0 0 2 2h1-1a2 2 0 0 0-2 2v1-1a2 2 0 0 0-2-2h-1 1a2 2 0 0 0 2-2v-1zM13 22v3a4 4 0 0 0 4 4h3-3a4 4 0 0 0-4 4v3-3a4 4 0 0 0-4-4H6h3a4 4 0 0 0 4-4v-3zM67 4v3a4 4 0 0 0 4 4h3-3a4 4 0 0 0-4 4v3-3a4 4 0 0 0-4-4h-3 3a4 4 0 0 0 4-4V4z"
      fill="#fff"
    />
  </svg>
);

/* ───────────── Cat Punch brand icons (filled, single colour) ───────────── */

export const IconPaw = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <ellipse cx="6" cy="9.5" rx="2.2" ry="3" />
    <ellipse cx="18" cy="9.5" rx="2.2" ry="3" />
    <ellipse cx="9.5" cy="5.5" rx="2.2" ry="3" />
    <ellipse cx="14.5" cy="5.5" rx="2.2" ry="3" />
    <path d="M12 10.5c-3.4 0-6.5 3.1-6.5 6.2 0 1.9 1.4 3.3 3.2 3.3 1.1 0 2-.5 3.3-.5s2.2.5 3.3.5c1.8 0 3.2-1.4 3.2-3.3 0-3.1-3.1-6.2-6.5-6.2z" />
  </svg>
);

export const IconBolt = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13.5 2 4.5 13.5h6L9.5 22l9-11.5h-6z" />
  </svg>
);

export const IconHeart = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 21s-7.5-4.6-9.3-9.4C1.4 8.2 3.4 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.6 0 5.6 3.7 4.3 7.1C19.5 16.4 12 21 12 21z" />
  </svg>
);

export const IconTruck = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M2 7h11v9H2zM13 10h4.5l3.5 3v3h-8z" />
    <circle cx="6" cy="17.5" r="1.8" fill="currentColor" />
    <circle cx="17" cy="17.5" r="1.8" fill="currentColor" />
  </svg>
);

export const IconShieldCheck = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 2.5 4.5 5.5v6c0 4.6 3.2 8.2 7.5 9.9 4.3-1.7 7.5-5.3 7.5-9.9v-6z" />
    <path d="m8.5 12 2.3 2.3L15.5 9.5" />
  </svg>
);

export const IconLock = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15.5" r="1.3" fill="currentColor" />
  </svg>
);

export const IconBrain = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9.5 3.5a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1.5 5.2A3 3 0 0 0 11 19V6a2.5 2.5 0 0 0-1.5-2.5z" />
    <path d="M14.5 3.5a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1.5 5.2A3 3 0 0 1 13 19V6a2.5 2.5 0 0 1 1.5-2.5z" />
    <path d="M11 10H8.5M13 13h2.5" />
  </svg>
);

export const IconHome = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3.5 11.5 12 4l8.5 7.5" />
    <path d="M6 10v10h12V10" />
    <path d="M10 20v-6h4v6" />
  </svg>
);

export const IconCheckCircle = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="12" r="11" />
    <path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="#151515" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCatFace = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4 4.5 8 8.5h8l4-4v9.5c0 4.4-3.6 7.5-8 7.5s-8-3.1-8-7.5z" />
    <circle cx="9" cy="13" r="1.2" fill="#fff" />
    <circle cx="15" cy="13" r="1.2" fill="#fff" />
    <path d="M12 15.2l-1 1h2z" fill="#fff" />
  </svg>
);

export const IconArrowRight = (p: P) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

/** Look-up used by config-driven icon rows (hero badges, trust bar, benefits) */
export const ICONS = {
  paw: IconPaw,
  bolt: IconBolt,
  heart: IconHeart,
  truck: IconTruck,
  shield: IconShieldCheck,
  lock: IconLock,
  brain: IconBrain,
  home: IconHome,
  check: IconCheckCircle,
  cat: IconCatFace,
} as const;

export type IconKey = keyof typeof ICONS;

export function Icon({ name, ...p }: { name: IconKey } & P) {
  const C = ICONS[name];
  return <C {...p} />;
}
