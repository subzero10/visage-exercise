import FingerprintJS from "@fingerprintjs/fingerprintjs";

export async function generateSource() {
  const fingerPrint = await FingerprintJS.load();
  const result = await fingerPrint.get();
  const visitorId = result.visitorId;
  console.log(visitorId);
  return visitorId;
}
