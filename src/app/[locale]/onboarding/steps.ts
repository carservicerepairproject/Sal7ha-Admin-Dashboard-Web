export const STEPS = [
  {
    key: "create",
    label: "Create Account",
    href: "/en/onboarding/create-account",
  },
  {
    key: "owner",
    label: "Owner Overview",
    href: "/en/onboarding/owner-overview",
  },
  {
    key: "business",
    label: "Business Overview",
    href: "/en/onboarding/business-overview",
  },
  { key: "profile", label: "Build Profile", href: "/onboarding/build-profile" },
  { key: "bank", label: "Bank Details", href: "/onboarding/bank-details" },
  { key: "tax", label: "Tax Information", href: "/onboarding/tax-information" },
  {
    key: "2fa",
    label: "Two Factor Authentication",
    href: "/en/onboarding/two-factor",
  },
  { key: "review", label: "Review & Submit", href: "/onboarding/review" },
] as const;

export function getStepIndex(pathname: string) {
  const stripped = pathname.replace(/^\/[a-z]{2}/, "");
  const idx = STEPS.findIndex((s) =>
    stripped.startsWith(s.href.replace(/^\/[a-z]{2}/, ""))
  );
  return idx === -1 ? 1 : idx;
}

export function getNextHref(pathname: string) {
  const idx = getStepIndex(pathname);
  const next = Math.min(idx + 1, STEPS.length - 1);
  for (let i = next; i < STEPS.length; i++) {
    if (STEPS[i].href) return STEPS[i].href!;
  }
  return STEPS[STEPS.length - 1].href!;
}
export function getPrevHref(pathname: string) {
  const idx = getStepIndex(pathname);
  return STEPS[Math.max(idx - 1, 0)].href;
}
