const showRegisterForm = () => {
  const form = document.querySelector('.reg-form');
  const regModal = document.querySelector('.reg-modal');

  document.querySelector('.close-reg').onclick = () => {
    regModal.style.visibility = 'hidden';
    form.style.transform = 'translateY(-100%)';
  };
  window.onclick = e => {
    const modals = document.querySelectorAll('.modal');
    const forms = document.querySelectorAll('.form');
    modals.forEach(el => {
      if (e.target === el) {
        const elem = el;
        elem.style.visibility = 'hidden';
        forms.forEach(fr => {
          const form = fr;
          form.style.transform = 'translateY(-100%)';
          form.style.opacity = 0;
          return '';
        });
      }
    });
  };
};

const showSigninForm = () => {
  const form = document.querySelector('.signin-form');
  const signModal = document.querySelector('.signin-modal');

  document.querySelector('.close-sign').onclick = () => {
    signModal.style.visibility = 'hidden';
    form.style.transform = 'translateY(-100%)';
    form.style.opacity = 0;
  };
};

const showRegister = () => {
  const form = document.querySelector('.reg-form');
  const signModal = document.querySelector('.reg-modal');
  showRegisterForm();
  signModal.style.visibility = 'visible';
  form.style.transform = 'translateY(30px)';
  form.style.opacity = 1;
};

const showSignin = () => {
  const form = document.querySelector('.signin-form');
  const regModal = document.querySelector('.signin-modal');
  showRegisterForm();
  showSigninForm();
  regModal.style.visibility = 'visible';
  form.style.transform = 'translateY(30px)';
  form.style.opacity = 1;
};

const slideHeight = () => {
  document.querySelector('.mainContainer').style = 'position: fixed; height: 100%; top: 0; left: 0; background-color: #FFB400;';
  document.querySelector('.slideContainer').style = 'height: 100%';
  document.querySelector('.slidesHolder').style = 'height: 100%';
  document.querySelectorAll('.but').forEach(el => {
    const elem = el;
    elem.type = 'submit';
    return '';
  });
};

const setText = () => {
  document.querySelector('.alice-carousel__prev-btn-item').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24" height="24"
        viewBox="0 0 172 172"
        style={{ fill: "#000000;" }}><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><path d="M0,172v-172h172v172z" fill="none"></path><g id="original-icon" fill="#ffffff"><path d="M86,39.1085l55.255,89.8915h-110.51l55.255,-89.8915M86,21.5c-3.54033,0 -7.08783,1.77017 -9.25933,5.30333l-60.62283,98.61333c-4.74433,7.72567 0.52317,17.91667 9.2665,17.91667h121.2385c8.74333,0 14.01083,-10.191 9.25933,-17.91667l-60.62283,-98.61333c-2.1715,-3.53317 -5.719,-5.30333 -9.25933,-5.30333z"></path></g></g></svg>`;
  document.querySelector('.alice-carousel__next-btn-item').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24" height="24"
        viewBox="0 0 172 172"
        style={{ fill: "#000000;" }}><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><path d="M0,172v-172h172v172z" fill="none"></path><g id="original-icon" fill="#ffffff"><path d="M86,39.1085l55.255,89.8915h-110.51l55.255,-89.8915M86,21.5c-3.54033,0 -7.08783,1.77017 -9.25933,5.30333l-60.62283,98.61333c-4.74433,7.72567 0.52317,17.91667 9.2665,17.91667h121.2385c8.74333,0 14.01083,-10.191 9.25933,-17.91667l-60.62283,-98.61333c-2.1715,-3.53317 -5.719,-5.30333 -9.25933,-5.30333z"></path></g></g></svg>`;
};

const handleOpenMenu = () => {
  const sideBar = document.querySelector('.sideBar');
  sideBar.style.display = 'flex';
};

const handleCloseMenu = () => {
  document.querySelector('.sideBar').style.display = 'none';
};


const resizer = () => {
  window.addEventListener('resize', () => {
    if (document.querySelector('.sideBar')) {
      if (window.innerWidth >= 710) {
        document.querySelector('.sideBar').style.display = 'flex';
      } else {
        document.querySelector('.sideBar').style.display = 'none';
      }
    }
  });
};

export {
  showRegister, showSignin, slideHeight, setText, handleOpenMenu, handleCloseMenu, resizer,
};
