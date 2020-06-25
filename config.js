var lang = 'en'
var _config = {}
_config.baseUrl = `/${lang}/signup`
_config.data = {
  isRTL: false,
  lang: lang,
  all_langs: ['en', 'he', 'ru']
}

_config.onboarding_pages = [
  {
    name: 'appointments',
    icon: 'ill_appointments.svg',
    path: '/onboarding'
  },
  {
    name: 'clients',
    icon: 'ill_clients.svg',
    path: '/onboarding1'
  },
  {
    name: 'money',
    icon: 'ill_money.svg',
    path: '/onboarding2'
  }
]

_config.other_business_type_id = -1

// _config.data.all_langs = ['en', 'he', 'ru']
_config.urls = {
  business_type: '/business-type',
  privacy_policy: '/privacy-policy',
  static: './media/',
  business_types_icons: './media/business_types_icons/',
  // api
  base: 'https://api.bewebmaster.co.il/', // domain name
  business_types_get: 'business_types?lang={lang}',
  countries_get: 'countries',
  // redirect_after_success_sign_up: 'https://atzma.im/en/calendar',

  error_page: 'https://api.bewebmaster.co.il/error_page',
  recaptcha_post: '/recaptcha?token={token}',
  signup_post: 'signup',
  login: '/login'
}

_config.translations = {
  en: {
    all_set: {
      we_all_set: "We're all set!",
      enjoy_your_choice: 'Thanks for being awesome, we hope you enjoy your choice',
      you_can_continue: 'Now you can continue working in the application.',
      send_important_information: 'We are going to send important information and some tips for running your app better. Are you ok with it?',
      agree_to_all_the_Terms: 'I have read and agree to the all Atzmaim App',
      lets_start: 'Lets Start!',
      privacy_policy: 'Terms and Conditions of Use'
    },
    sign_up: {
      main_title: 'Sign up',
      have_acc_alredy: 'Already have an account?',
      login_in: ' Log In',
      fill_dateils_create: 'Fill your dateils to create account:',
      continue: 'Continue',
      logo_animation: {
        top_text: 'Appointment Scheduling',
        bottom_text: 'CRM App for your Business'
      }
    },
    onboarding_pages: {
      start_btn_label: 'Lets Start!',
      appointments: { text: 'Create appointments quickly & stay organized' },
      clients: { text: 'Keep everything you need to know about each client' },
      money: { text: 'Increase your profit with your personal assistant' },
    },
    sign_in: {
      title: 'Atzmaim',
      login_google: 'Log in with google',
      login_or: 'or',
      enter_email: 'enter your email',
      enter_password: 'enter your password',
      login: 'Login',
      sign_up: 'Sign Up',
      enter_phone: 'Enter your phone number',
      missing_email: 'Missing email',
      missing_password: 'Missing password',
      wrong_email: 'Wrong email try again!',
      enter_email_pass: 'Enter email and password',
      password_short: 'password is too short',
      // new
      error_incorrect: 'Your e-mail or password is incorrect'
    },
    business_type: {
      title: 'Select Business Type or Several',
      subtitle: 'We\'ll adjust an app for you',
      skip_here: 'Skip',
      type_business_name: 'Your business type',
      enter_different_type: 'Enter a different type of business',
      ok: 'Ok',
      no_thanks: 'No, thanks'
    },
    done_btn: 'Done'
  },
  he: {
    all_set: {
      we_all_set: "We're all set!",
      enjoy_your_choice: 'Thanks for being awesome, we hope you enjoy your choice',
      you_can_continue: 'Now you can continue working in the application.',
      send_important_information: 'We are going to send important information and some tips for running your app better. Are you ok with it?',
      agree_to_all_the_Terms: 'I agree to all the Terms of Use of the Atzmaim app and the legal',
      lets_start: 'Lets Start!'
    },
    sign_up: {
      fill_dateils_create: 'ЧћЧњЧђ Ч¤ЧЁЧЧ™Чќ Ч›Ч“Ч™ ЧњЧ¦Ч•ЧЁ Ч—Ч©Ч‘Ч•Чџ:',
      continue: 'Continue'
    },
    sign_in: {
      title: 'Atzmaim',
      login_google: 'Log in with google',
      login_or: 'or',
      enter_email: 'enter your email',
      enter_password: 'enter your password',
      login: 'Login',
      sign_up: 'Sign Up',
      enter_phone: 'Enter your phone number',
      missing_email: 'Missing email',
      missing_password: 'Missing password',
      wrong_email: 'Wrong email try again!',
      enter_email_pass: 'Enter email and password',
      password_short: 'password is too short',
      // new
      error_incorrect: 'Your e-mail or password is incorrect'
    },
    business_type: {
      title: 'Please select business type',
      subtitle: 'WeвЂ™ll adjuas the app to your needs',
      can_choose_more: 'You can choose more the one or',
      skip_here: 'skip here',
      your_choose: 'Your choose:',
      type_business_name: 'Your business type',
      enter_different_type: 'Enter a different type of business',
      ok: 'Ok',
      no_thanks: 'No, thanks'
    },
    done_btn: 'Done'
  },
  ru: {
    all_set: {
      we_all_set: "ru ruru We're all set!",
      enjoy_your_choice: 'Thanks for being awesome, we hope you enjoy your choice',
      you_can_continue: 'Now you can continue working in the application.',
      send_important_information: 'We are going to send important information and some tips for running your app better. Are you ok with it?',
      agree_to_all_the_Terms: 'I agree to all the Terms of Use of the Atzmaim app and the legal',
      lets_start: 'Lets Start!'
    },
    sign_up: {
      fill_dateils_create: ' rur urururFill your dateils to create account:',
      continue: 'Continue'
    },
    sign_in: {
      title: 'ru Atzmaim',
      login_google: 'Log in with google',
      login_or: 'or',
      enter_email: 'enter your email',
      enter_phone: 'Enter your phone number',
      enter_password: 'enter your password',
      login: 'Login',
      sign_up: 'Sign Up',
      missing_email: 'Missing email',
      missing_password: 'Missing password',
      wrong_email: 'ru Wrong email try again!',
      enter_email_pass: 'Enter email and password',
      password_short: 'password is too short',
      error_incorrect: 'Your e-mail or password is incorrect'
    },
    business_type: {
      title: 'Please select business type',
      subtitle: 'WeвЂ™ll adjuas the app to your needs',
      can_choose_more: 'You can choose more the one or',
      skip_here: 'skip here',
      your_choose: 'Your choose:',
      type_business_name: 'Your business type',
      enter_different_type: 'Enter a different type of business',
      ok: 'Ok',
      no_thanks: 'No, thanks'
    },
    done_btn: 'Done'
  }
}

_config.routing = {
  // calendar: '/calendar',
  // ?error=incorrect
  url_params: {
    error: 'error',
    values: {
      incorrect: 'incorrect'
    }
  },
  // sign_up_path: '/',
  all_set_path: '/all-set',
  business_type_path: '/business-type'
}