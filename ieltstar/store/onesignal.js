import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: process.env.ONE_SIGNAL,
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.showSlidedownPrompt();
}
