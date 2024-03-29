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
_config.legalLinks = [{ text: 'תנאי השימוש של ליסטה', link: 'https://google.com' }, { text: 'פרטי ההצטרפות כמנוי', link: 'https://google.com' }, { text: 'ואת מדיניות הפרטיות שלנו', link: 'https://google.com' }]

// _config.data.all_langs = ['en', 'he', 'ru']
_config.urls = {
  contact_us: '/contact_us',
  business_type: '/business-type',
  privacy_policy: '/privacy-policy',
  static: './media/',
  business_types_icons: './media/business_types_icons/',
  // api
  base: 'https://api.bewebmaster.co.il/', // domain name
  api_check_email: 'check-credentials',
  business_types_get: 'business_types?lang={lang}',
  countries_get: 'countries',
  // redirect_after_success_sign_up: 'https://atzma.im/en/calendar',
  validate_api: 'https://api.bewebmaster.co.il/customers-list/clients/validate',
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
      agree_to_all_the_Terms_1: 'I agree to ',
      agree_to_all_the_Terms_2: ' of the Atzmaim app',
      lets_start: 'Lets Start!',
      privacy_policy: 'Terms and Conditions of Use'
    },
    sign_up: {
      main_title: 'Sign up',
      subtitle: 'Subtitle',
      have_acc_already: 'Already have an account?',
      login_in: ' Log In',
      continue: 'Continue',
      contact_us_link_label: 'Need a help?',
      existing_email_label: 'This email is already exist.\nMay be you’d like to log in?',
      logo_animation: {
        top_text: 'Appointment Scheduling',
        bottom_text: 'CRM App for your Business'
      }
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
      enter_business_name: 'Enter business name',
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
