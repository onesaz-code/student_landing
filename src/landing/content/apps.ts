/**
 * ONESAZ Mobile Apps page (/apps). App names, links and icons are taken from the
 * onesaz developer pages on Google Play and the App Store (checked 1 Oct 2026).
 * When an app is added or removed on a store, update this list.
 */

const PLAY = (id: string) => `https://play.google.com/store/apps/details?id=${id}`
/** Store icon images (Google Play CDN, from each app's store page), requested at 128 px. */
const ICON = (path: string) => `https://play-lh.googleusercontent.com/${path}=w128-h128`

export interface MobileApp {
  name: string
  /** Store package / app id, used as the React key. */
  id: string
  icon: string
  googlePlay: string
  appStore?: string
}

export interface CoreApp extends MobileApp {
  audience: string
  description: string
}

export const APPS_HERO = {
  eyebrow: 'Mobile apps',
  title: 'ONESAZ in your pocket.',
  lead: 'Students, parents, teachers and management use ONESAZ on their phones. Get the official ONESAZ apps, or your institution’s own branded app, from Google Play and the App Store.',
}

/** The ONESAZ apps every institution can use. Descriptions follow each app's store listing. */
export const CORE_APPS: CoreApp[] = [
  {
    name: 'Onesaz',
    id: 'com.onesaz.studentapp',
    audience: 'Students & parents',
    description:
      'The ONESAZ app that helps schools connect better with their students: lessons, homework, results and updates in one place.',
    icon: ICON('Ia3jVGz0MpIGWvqNwLYJ8KpWauxfoaNTyu_6u3wxlPx49RIk1ps9eAgIMO-Q_IQDcH05Ub-7lQMPJRoDxC-RERI'),
    googlePlay: PLAY('com.onesaz.studentapp'),
  },
  {
    name: 'Onesaz admin',
    id: 'com.onesaz.admin',
    audience: 'Management & staff',
    description: 'Makes management’s day easier: keep an eye on the institution and act on the go.',
    icon: ICON('Mg0dXwgMbRU16jRmaFtmJ7Ufw6bn6YQppdUH6SNO4p7bs883NjOWMtzkp0RFFGVx_SAngjeolKKIdbit4uY1XA'),
    googlePlay: PLAY('com.onesaz.admin'),
    appStore: 'https://apps.apple.com/us/app/onesaz-admin/id6470154453',
  },
  {
    name: 'Onesaz Exams',
    id: 'com.onesaz.exams',
    audience: 'Students',
    description: 'The official ONESAZ app for exams: prepare and take tests, online or offline.',
    icon: ICON('g2ZqY8fY3Do2faGmDN1-p_jUUPXMJJfHCfqGPfYrR2kgCQA-GE1maKlRP0wEKbI2GKE_zNZXk1sUuDy5JcdGpq4'),
    googlePlay: PLAY('com.onesaz.exams'),
  },
  {
    name: 'Acadhub MDM',
    id: 'com.acadhub.mdm',
    audience: 'Institution tablets',
    description: 'Android kiosk and device management for educational institutions. Installed on institution-owned tablets.',
    icon: ICON('Rs-jKWiRizx22sTQtQ1RfJL_yTjr3BpskcL5JBcr-gpo8-CC1-kG_B2PGkRVB7IhWXvmX_PxSedGHxLVc15SEog'),
    googlePlay: PLAY('com.acadhub.mdm'),
  },
]

/** Institution-branded apps built on ONESAZ, in the order Google Play lists them. */
export const INSTITUTION_APPS: MobileApp[] = [
  {
    name: 'Bhashyam',
    id: 'com.onesaz.student.bhashyam',
    icon: ICON('7aP8L7U2qB2T-84KoyPybddpDL7h_pVtcDMtt1yQOHs2fETbzEULdB0e3W6K_y8vB9YhaZ05VYKbyxm_2dId'),
    googlePlay: PLAY('com.onesaz.student.bhashyam'),
  },
  {
    name: 'MIITYEDU',
    id: 'com.onesaz.student.miity',
    icon: ICON('j3aa2-d2Qh7JIg3MbRg95k595LXUHK93uw93Pfyr0CMwRFnXNmhwPBURmsUi7EO08CkCpA-bv8wT9hv5UvuqVg'),
    googlePlay: PLAY('com.onesaz.student.miity'),
  },
  {
    name: 'Tirumala Edu',
    id: 'com.onesaz.student.tirumala',
    icon: ICON('kz7uYoqERNDmlpb3HGGlJgWkOocZTqnn-YkEc7O5eDqiWAPRUNib1guSC7N2Gq6IDj12ShFTV54SwxrI_XfI1g'),
    googlePlay: PLAY('com.onesaz.student.tirumala'),
    appStore: 'https://apps.apple.com/us/app/tirumala-edu/id6786543781',
  },
  {
    name: 'Ignite School Khammam',
    id: 'com.onesaz.student.igniteschool',
    icon: ICON('FZkMNpxQALLEN7YMFk3iWeEkQDmkIy-QMxESRfYXnrd25kj5l9bkueRSTNod___9EtQbCs1Wr27Ak1OfV3gqWZY'),
    googlePlay: PLAY('com.onesaz.student.igniteschool'),
  },
  {
    name: 'SREDU',
    id: 'com.onesaz.student.sr',
    icon: ICON('VaSFNrBPpj6M20WmH3C2apQfyZc6teDV8psyeUZIWXi68rm8oj6M_DqMXa2JBRlZOCdRvUn-Hroi_GJMQqDOgw'),
    googlePlay: PLAY('com.onesaz.student.sr'),
  },
  {
    name: 'COGNIZANT Institute NEET & JEE',
    id: 'com.onesaz.student.cognizant',
    icon: ICON('4zK8yvGuE_6FPSgM3Qps_BdFXljPP8Oqd9P1_agVLSe4An-IHGu_uTLChoMLoxIrHOf6yY0ccsXGPpUQWt2V'),
    googlePlay: PLAY('com.onesaz.student.cognizant'),
  },
  {
    name: 'Adhyapak',
    id: 'com.onesaz.student.adhyapak',
    icon: ICON('hOQjC2-H72_F9T3Trn93_ColnwSiUreA-6KXVF0Ag-f9_jnPilFGQYhSff3OC9AzF-CLWpBSXPfprhh_-IDy'),
    googlePlay: PLAY('com.onesaz.student.adhyapak'),
  },
  {
    name: 'Vision IIT Olympiad School',
    id: 'com.onesaz.student.vision',
    icon: ICON('23LXvbCZ34ViYBd6NXimM2rnss3TONpVF39I7jRKoF138EjT56szUlrJwzPxXwcy4n0dL3_hwBDWCjLHpsS2Gw'),
    googlePlay: PLAY('com.onesaz.student.vision'),
    appStore: 'https://apps.apple.com/us/app/vision-iit-olympiad-school/id6769321963',
  },
  {
    name: 'Oxford',
    id: 'com.onesaz.studentapp.oxfordjc',
    icon: ICON('7MsQDGYlLYstOx_tQynPuMoy9UjSiZi4H0tFbOX6y84cHdQ16MouFoqyXZ77Wo9B3oAMp5XjlgPmYskb-aLG_g'),
    googlePlay: PLAY('com.onesaz.studentapp.oxfordjc'),
  },
  {
    name: 'SUNDAR ACADEMY',
    id: 'com.onesaz.student.sundar',
    icon: ICON('AusxTdKLLRejYS3JQAUbaEq0Jw3aVKTy48TUzSpLpEdE9MHbWPN99Jel6JW1LfM9rVnnhlS6R3SXZ-NxAqqZaw'),
    googlePlay: PLAY('com.onesaz.student.sundar'),
  },
  {
    name: 'ROOTS Adoni',
    id: 'com.onesaz.studentapp.rootsglobal',
    icon: ICON('n90QWtdqlyPhTx-5ZpR3s7Wfb-lw2ORa94ddIi8ZYJC8lAzLSo-1Ls4iwUEEfB-q4LqLOd0WLXnblbI35ar60w'),
    googlePlay: PLAY('com.onesaz.studentapp.rootsglobal'),
  },
  {
    name: 'METAMIND ACADEMY',
    id: 'com.onesaz.student.metamind',
    icon: ICON('Z25ImMPpGlkY216i2EMIArQQnRfw_bjks3Niz04vk1OBdjPRZgVlXUAw7fnd_FfpUwBl_n98Wxy4x53OQx6ELQ'),
    googlePlay: PLAY('com.onesaz.student.metamind'),
  },
  {
    name: 'Sri Chaitanya Video Calling',
    id: 'com.onesaz.studentapp.srichaitanya',
    icon: ICON('_h4CdRtmPfIHW83KPQ-mBZMHT1Mevcd-JWBBPs4-bjBttL7ejlxx0lFDbmZRUcCsWACU3VZjUk7t_iCV7nTQ_w'),
    googlePlay: PLAY('com.onesaz.studentapp.srichaitanya'),
  },
  {
    name: 'Motion Hyderabad',
    id: 'com.onesaz.student.motion',
    icon: ICON('4oNF7q1Sn5D8GwO1n5TKrn3oXWz5syAPpIxcWrf7HWBd7jVpYvwpJTet5qMFc8ikFv64NA4AtISwV3K-v_0yMQ'),
    googlePlay: PLAY('com.onesaz.student.motion'),
  },
]
