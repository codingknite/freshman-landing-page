export const DESKTOP_RELEASES_PAGE =
  'https://github.com/codingknite/freshman-releases/releases/latest';

export type DesktopRelease = {
  version: string | null;
  appleSiliconUrl: string;
  intelUrl: string;
  windowsUrl: string;
};

type GitHubAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubRelease = {
  tag_name?: string;
  name?: string;
  assets?: GitHubAsset[];
};

function fallbackRelease(): DesktopRelease {
  return {
    version: null,
    appleSiliconUrl: DESKTOP_RELEASES_PAGE,
    intelUrl: DESKTOP_RELEASES_PAGE,
    windowsUrl: DESKTOP_RELEASES_PAGE,
  };
}

function isDmgInstaller(name: string): boolean {
  return name.endsWith('.dmg') && !name.endsWith('.blockmap');
}

function isNsisInstaller(name: string): boolean {
  return (
    name.endsWith('.exe') &&
    !name.endsWith('.blockmap') &&
    /setup/i.test(name)
  );
}

export async function getLatestDesktopRelease(): Promise<DesktopRelease> {
  try {
    const response = await fetch(
      'https://api.github.com/repos/codingknite/freshman-releases/releases/latest',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'freshman-landing-page',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      return fallbackRelease();
    }

    const data = (await response.json()) as GitHubRelease;
    const assets = data.assets ?? [];
    const dmgs = assets.filter((asset) => isDmgInstaller(asset.name));
    const appleSilicon = dmgs.find((asset) => asset.name.includes('arm64'));
    const intel = dmgs.find((asset) => !asset.name.includes('arm64'));
    const windows = assets.find((asset) => isNsisInstaller(asset.name));

    return {
      version: data.tag_name?.replace(/^v/, '') ?? data.name ?? null,
      appleSiliconUrl: appleSilicon?.browser_download_url ?? DESKTOP_RELEASES_PAGE,
      intelUrl: intel?.browser_download_url ?? DESKTOP_RELEASES_PAGE,
      windowsUrl: windows?.browser_download_url ?? DESKTOP_RELEASES_PAGE,
    };
  } catch {
    return fallbackRelease();
  }
}
