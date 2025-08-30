export async function refreshAccessToken(token: string | undefined | null) {
  if (!token) {
    return false;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Cookie: `refresh_token=${token}`,
        },
      }
    );
    if (!res.ok) {
      return false;
    }

    const data = (await res.json());
    if (!data.success) {
      return false;
    }

    return true;
  } catch (error: unknown) {
    return false;
  }
}
